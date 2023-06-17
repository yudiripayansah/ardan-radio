<template>
  <div>
    <h1 class="mb-5">{{$route.name}}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="12" class="d-flex justify-content-end mb-5 pb-5 border-bottom">
          <b-button variant="success" @click="$bvModal.show('modal-form');doClearForm()" v-b-tooltip.hover
            title="Tambah Data Baru">
            <b-icon icon="plus" />
            Tambah Baru
          </b-button>
        </b-col>
        <b-col cols="12" class="mb-5">
          <b-row no-gutters>
            <b-col cols="6">
              <div class="w-100 max-200 pr-5">
                <b-input-group size="sm" prepend="Per Halaman">
                  <b-form-select v-model="paging.perPage" :options="opt.perPage" />
                </b-input-group>
              </div>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-end">
              <div class="w-100 max-300">
                <b-input-group size="sm">
                  <b-form-input />
                  <b-input-group-append>
                    <b-button size="sm" text="Button" variant="primary">
                      <b-icon icon="search" />
                      Cari
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12">
          <b-table responsive bordered outlined small striped hover :fields="table.fields" :items="table.items"
            show-empty :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'">
            <template #cell(no)="data">
              {{data.index + 1}}
            </template>
            <template #cell(kode_kota)="data">
              {{ getKodeKota(data.item.kode_kota) }}
            </template>
            <template #cell(action)="data">
              <b-button variant="danger" size="xs" class="mx-1" @click="doDelete(data.item,true)" v-b-tooltip.hover
                title="Hapus">
                <b-icon icon="trash" />
              </b-button>
              <b-button variant="success" size="xs" class="mx-1" @click="doUpdate(data.item)" v-b-tooltip.hover title="Ubah">
                <b-icon icon="pencil" />
              </b-button>
            </template>
          </b-table>
        </b-col>
        <b-col cols="12" class="justify-content-end d-flex">
          <b-pagination v-model="paging.page" :total-rows="table.totalRows" :per-page="paging.perPage">
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal title="Form Kecamatan" id="modal-form" hide-footer size="lg" centered>
      <b-form @submit="doSave()">
        <b-row>
          <b-col cols="6">
            <b-form-group label="Kode Kota" label-for="kode_kota">
              <b-form-select id="kode_kota" :options="opt.kode_kota" v-model="$v.form.data.kode_kota.$model"
                :state="validateState('kode_kota')" @change="doGenerateKodeKecamatan()"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Kode Kecamatan" label-for="kode_kecamatan">
              <b-form-input id="kode_kecamatan" v-model="$v.form.data.kode_kecamatan.$model"
                :state="validateState('kode_kecamatan')" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Nama Kecamatan" label-for="nama_kecamatan">
              <b-form-input id="nama_kecamatan" v-model="$v.form.data.nama_kecamatan.$model"
                :state="validateState('nama_kecamatan')" />
            </b-form-group>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-end border-top pt-5">
            <b-button variant="secondary" @click="$bvModal.hide('modal-form')" :disabled="form.loading">Cancel
            </b-button>
            <b-button variant="primary" type="submit" :disabled="form.loading" class="ml-3">
              {{form.loading ? 'Memproses...' : 'Simpan' }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal title="Delete" id="modal-delete" hide-footer size="sm" header-bg-variant="warning"
      body-bg-variant="warning" centered>
      <p class="text-center py-3">Anda yakin ingin menghapus data ini?</p>
      <div class="d-flex justify-content-end">
        <b-button variant="light" type="button" :disabled="remove.loading" @click="$bvModal.hide('modal-delete')">Tidak
        </b-button>
        <b-button variant="danger" class="ml-3" type="button" :disabled="remove.loading"
          @click="doDelete(remove.data,false)">
          {{remove.loading ? 'Memproses...' : 'Ya' }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import easycoApi from '@/core/services/easyco.service';
export default {
  name: "kecamatan",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
          kode_kota: 0,
          kode_kecamatan: null,
          nama_kecamatan: null,
          created_by: null,
        },
        loading: false,
      },
      table: {
        fields: [
          {
            key: 'no',
            sortable: false,
            label: 'No',
            thClass: 'text-center w-5p',
            tdClass: 'text-center'
          },
          {
            key: 'kode_kota',
            sortable: true,
            label: 'Kode Kota',
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'kode_kecamatan',
            sortable: true,
            label: 'Kode Kecamatan',
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'nama_kecamatan',
            sortable: true,
            label: 'Nama Kecamatan',
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'action',
            sortable: false,
            label: 'Action',
            thClass: 'text-center w-10p',
            tdClass: 'text-center'
          },
        ],
        items: [],
        loading: false,
        totalRows: 0
      },
      paging: {
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: 'id',
        search: ''
      },
      remove: {
        data: Object,
        loading: false
      },
      opt: {
        perPage: [10,25,50,100],
        kode_kota: []
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      data: {
        kode_kota: {
          required
        },
        kode_kecamatan: {
          required
        },
        nama_kecamatan: {
          required
        },
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    paging: {
      handler(val) {
        this.doGet()
      },
      deep: true
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form.data[name];
      return $dirty ? !$error : null;
    },
    async doGenerateKodeKecamatan() {
      let payload = {
        kode_kota: this.form.data.kode_kota
      };
      try {
        let req = await easycoApi.kecamatanGenerate(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.form.data.kode_kecamatan = data.kode_kecamatan
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGetKotakab() {
      let payload = {...this.paging}
      payload.sortDir = payload.sortDesc ? 'DESC' : 'ASC'
      payload.perPage = '~'
      try {
        let req = await easycoApi.kotakabRead(payload, this.user.token)
        let { data, status, msg, total } = req.data
        if (status) {
          this.opt.kode_kota = [
            {
              value: 0,
              text: 'kota'
            }
          ]
          data.map((item) => {
            this.opt.kode_kota.push({
              value: item.kode_kota,
              text: item.nama_kota
            })
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async doGet() {
      let payload = this.paging
      payload.sortDir = payload.sortDesc ? 'DESC' : 'ASC'
      this.table.loading = true
      try {
        let req = await easycoApi.kecamatanRead(payload, this.user.token)
        let { data, status, msg, total } = req.data
        if (status) {
          this.table.items = data
          this.table.totalRows = total
        }
        this.table.loading = false
      } catch (error) {
        this.table.loading = false
        console.error(error)
      }
    },
    async doSave(e) {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.form.loading = true
        try {
          let payload = this.form.data
          payload.created_by = this.user.id
          let req = false
          if(payload.id) {
            req = await easycoApi.kecamatanUpdate(payload,this.user.token)
          } else {
            req = await easycoApi.kecamatanCreate(payload,this.user.token)
          }
          let { status } = req.data
          if(status) {
            this.notify('success','Success','Data berhasil disimpan')
            this.doGet()
            this.doGetKotakab()
            this.$bvModal.hide('modal-form')
          } else {
            this.notify('danger','Error','Data gagal disimpan')
          }
          this.form.loading = false
        } catch (error) {
          this.notify('danger','Error',error)
          this.form.loading = false
        }
      } else {
        e.preventDefault()
      }
    },
    async doUpdate(item) {
      try {
        let req = await easycoApi.kecamatanDetail(`id=${item.id}`,this.user.token)
        let { data, status, msg } = req.data
        if(status) {
          this.form.data = data
          this.$bvModal.show('modal-form')
        }
      } catch (error) {
        console.log(error)
        this.notify('danger','Error','Gagal mengambil data')
      }
    },
    async doDelete(item,prompt) {
      if(prompt){
        this.remove.data = item
        this.$bvModal.show('modal-delete')
      } else {
        this.remove.loading = true
        try {
          let req = await easycoApi.kecamatanDelete(`id=${this.remove.data.id}`,this.user.token)
          let { status } = req.data
          if(status) {
            this.remove.loading = false
            this.$bvModal.hide('modal-delete')
            this.notify('success','Success','Data berhasil dihapus')
            this.doGet()
            this.doGetKotakab()
          } else {
            this.notify('danger','Error','Data gagal dihapus')
          }
        } catch (error) {
          this.notify('danger','Error',error)
        }
      }
    },
    getKodeKota(val) {
      let res = this.opt.kode_kota.find((i) => i.value == val)
      if(res){
        return res.text
      }
      return '-'
    },
    doClearForm() {
      this.form.data = {
        id: null,
        kode_kecamatan: null,
        kode_kota: 0,
        nama_kecamatan: null,
        created_by: null
      }
      this.$v.form.$reset()
    },
    notify(type, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 5000,
        variant: type,
        toaster: 'b-toaster-bottom-right',
        appendToast: true
      })
    }
  },
  mounted() {
    this.doGet()
    this.doGetKotakab()
  },
};
</script>
  