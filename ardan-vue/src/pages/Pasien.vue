<template>
<div>
  <b-card title="Pasien">
    <b-row>
      <b-col sm=2>
        <b-input v-model="paging.search" placeholder="Search..." />
      </b-col>
      <b-col sm=10 class="d-flex justify-content-end">
        <b-button-group>
          <b-button variant="primary" v-b-modal.modal-form>
            <b-icon icon="plus" /> Add New</b-button>
        </b-button-group>
      </b-col>
      <b-col sm=12 class="py-5">
          <b-table sticky-header responsive striped hover bordered :items="table.items" :busy="table.loading" :fields="table.fields" class="m-0" :sort-by.sync="paging.sortBy" :sort-desc.sync="paging.sortDesc">
            <template #cell(id)="data">
              <b-form-checkbox v-model="table.selected" :value="data.index" />
            </template>
            <template #cell(action)="data">
              <b-button size="sm" variant="danger" @click="doDelete(data.item,false)" class="mx-1 mb-1 mb-md-1" title="Delete">
                <b-icon icon="trash" />
              </b-button>
              <b-button size="sm" variant="info" @click="doUpdate(data.item)" class="mx-1 mb-1 mb-md-1" title="Update">
                <b-icon icon="pencil" />
              </b-button>
            </template>
            <template #cell(no)="data">
              {{ paging.perPage * (paging.page-1) + data.index + 1 }}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>
      </b-col>
      <b-col xs=12 sm=6 class="d-flex align-items-center">
        <b-form-group label="Show" label-cols-sm="4" class="mb-0 mr-3">
          <b-select :options="opt.perPage" v-model="paging.perPage" />
        </b-form-group>
        Total <b class="mx-2">{{table.totalRows}}</b> data
      </b-col>
      <b-col xs=12 sm=6 class="mt-xs-2 d-flex justify-content-end align-items-end">
        <b-pagination v-model="paging.page" :total-rows="table.totalRows" :per-page="paging.perPage" class="m-0"></b-pagination>
      </b-col>
    </b-row>
  </b-card>
  <b-modal hide-header hide-footer variant="warning" centered id="modal-delete" bodyBgVariant="warning">
    <b-row>
      <b-col sm=12 class="text-center py-5">
        <h3 class="text-light">Yakin ingin menghapus data ini ?</h3>
        <p class="text-light">
          <b>Nik :</b> {{formDelete.data.nik}} <br>
          <b>Nama Pasien :</b> {{formDelete.data.nama}} <br>
        </p>
      </b-col>
      <b-col sm=12 class="text-center">
        <b-button variant="light" @click="$bvModal.hide('modal-delete')" class="mx-1">Batal</b-button>
        <b-button variant="danger" @click="doDelete(formDelete.data,true)" class="mx-1" :disable="formDelete.loading">
          <b-spinner small label="Small Spinner" variant="light" v-show="formDelete.loading"></b-spinner>
          Hapus!!
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
  <b-modal size="xl" title="Form" id="modal-form" hide-footer>
    <b-form @submit.prevent="doSave()">
      <b-row>
        <b-col sm=3>
          <b-form-group label="Nik">
            <b-input v-model="form.data.nik"/>
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="Nama">
            <b-input v-model="form.data.nama"/>
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="Tanggal Lahir">
            <b-form-datepicker v-model="form.data.tgl_lahir" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id" />
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="Jenis Kelamin">
            <b-input v-model="form.data.jenis_kelamin" />
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="Alamat">
            <b-input v-model="form.data.alamat" rows=5 no-resize />
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="No Telp">
            <b-input v-model="form.data.no_telp" />
          </b-form-group>
        </b-col>
        <b-col sm=3>
          <b-form-group label="Email">
            <b-input v-model="form.data.email" />
          </b-form-group>
        </b-col>
        <b-col sm=12 class="pt-3 mt-3 border-top d-flex justify-content-end align-items-end">
          <b-button variant="light" type="button" @click="$bvModal.hide('modal-form')" class="mr-3">Tutup</b-button>
          <b-button variant="primary" type="submit" :disable="form.loading">
            <b-spinner small label="Small Spinner" variant="light" v-show="form.loading"></b-spinner>
            Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import axios from '@/core/plugins/axios'
export default {
  name: "dashboard",
  components: {

  },
  data() {
    return {
      formDelete: {
        data: {
          name: null,
          nik: null
        },
        loading: false
      },
      form: {
        data: {
          id: null,
          nik: null,
          nama: null,
          tgl_lahir: null,
          jenis_kelamin: null,
          alamat: null,
          no_telp: null,
          email: null,
        },
        loading: false
      },
      table: {
        items: [],
        fields: [
          {
            key: 'action',
            label: 'Action',
            sortable: false,
            thClass: 'text-center w-10',
            tdClass: 'text-center'
          },
          {
            key: 'no',
            label: 'No',
            sortable: false,
            thClass: 'text-center w-5',
            tdClass: 'text-center'
          },
          {
            key: 'nik',
            label: 'Nik',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'nama',
            label: 'Nama',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'jenis_kelamin',
            label: 'Jenis Kelamin',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'tgl_lahir',
            label: 'Tanggal Lahir',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'no_telp',
            label: 'No Telp',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
          {
            key: 'alamat',
            label: 'Alamat',
            sortable: true,
            thClass: 'text-center',
            tdClass: ''
          },
        ],
        loading: false,
        totalRows: 0,
        selected: [],
      },
      paging: {
        page: 1,
        rows: 100,
        perPage: 10,
        search: null,
        sortBy: 'id',
        sortDesc: true,
        sortDir: 'desc',
        totalPage: 1,
      },
      opt: {
        perPage: [10, 20, 50, 100]
      }
    }
  },
  watch: {
    paging: {
      handler() {
        this.doGet()
      },
      deep: true
    },
  },
  mounted() {
    this.doGet()
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (modalId == 'modal-form')
        this.clearForm()
    })
  },
  methods: {
    doGet() {
      this.table.loading = true
      let url = '/pasien'
      this.paging.sortDir = (this.paging.sortDesc) ? 'desc' : 'asc'
      let payload = this.paging
      axios
        .post(url, payload)
        .then((res) => {
          if (res.status === 200) {
            this.table.items = res.data.data
            this.table.totalRows = res.data.paging.rows
          } else {
            this.notify('danger', 'Error', res.data.msg)
          }
          this.table.loading = false
        })
        .catch(() => {
          this.notify('danger', 'Error', 'Internal Server Error')
          this.table.loading = false
        })
    },
    doUpdate(item) {
      let url = '/pasien/get'
      let payload = {
        id: item.id
      }
      axios
        .post(url, payload)
        .then((res) => {
          if (res.status === 200) {
            this.form.data = res.data.data
            this.$bvModal.show('modal-form')
          } else {
            this.notify('danger', 'Error', 'Faled to get data, Internal server error')
          }
          this.form.loading = false
        })
        .catch((e) => {
          this.notify('danger', 'Error', 'Internal server error')
          this.form.loading = false
        })
    },
    doDelete(item, promt) {
      if (!promt) {
        this.formDelete.data = item
        this.$bvModal.show('modal-delete')
      } else {
        this.formDelete.loading = true
        let url = '/pasien/delete'
        let payload = {
          id: item.id
        }
        axios
          .post(url, payload)
          .then((res) => {
            if (res.status === 200) {
              this.notify('success', 'Success', res.data.msg)
              this.$bvModal.hide('modal-delete')
              this.doGet()
            } else {
              this.notify('danger', 'Error', res.data.msg)
            }
            this.formDelete.loading = false
          })
          .catch(() => {
            this.notify('danger', 'Error', 'Internal Server Error')
            this.formDelete.loading = false
          })
      }
    },
    doDeleteBatch() {

    },
    doSave() {
      let url = '/pasien/create'
      let payload = this.form.data
      if (this.form.data.id)
        url = '/pasien/update'
      this.form.loading = true
      axios
        .post(url, payload)
        .then((res) => {
          if (res.status === 200 && res.data.status) {
            this.notify('success', 'Success', res.data.msg)
            this.$bvModal.hide('modal-form')
            this.doGet()
          } else {
            this.notify('danger', 'Error', res.data.msg)
            if (res.data.validation.length > 0) {
              res.data.validation.map((v) => {
                if (!v.status) {
                  v.error.map((x) => {
                    this.notify('danger', 'Error', x)
                  })
                }
              })
            }
          }
          this.form.loading = false
        })
        .catch(() => {
          this.notify('danger', 'Error', 'Internal Server Error')
          this.form.loading = false
        })
    },
    clearForm() {
      this.form.data = {
        id: null,
        nik: null,
        nama: null,
        tgl_lahir: null,
        jenis_kelamin: null,
        alamat: null,
        no_telp: null,
        email: null,
      }
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
  }
};
</script>

<style lang="scss">
.w-5 {
  width: 5%;
}

.w-10 {
  width: 10%;
}
</style>
