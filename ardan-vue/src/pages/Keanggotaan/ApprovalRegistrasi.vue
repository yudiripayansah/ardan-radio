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
                  <b-input-group size="sm" prepend="Cabang">
                    <b-form-select id="cabang" v-model="$v.form.data.cabang.$model" :options="opt.cabang" />
                  </b-input-group>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12">
            <b-table responsive bordered outlined small striped hover :fields="table.fields" :items="table.items"
              show-empty :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'">
              <template #cell(no)="item">
                {{item.index + 1}}
              </template>
              <template #cell(action)="item">
                <b-button variant="success" size="xs" class="mx-1" @click="doUpdate(item)" v-b-tooltip.hover title="Regis">
                  Regis
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
      <b-modal title="Form Registrasi Anggota Rembug" id="modal-form" hide-footer size="lg" centered>
        <b-form @submit="doSave()">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nama" label-for="nama">
                <b-form-input id="nama" v-model="$v.form.data.nama.$model" :state="validateState('nama')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Jenis Kelamin" label-for="jeni_kelamin">
                <input class="form-check-input ml-2" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label ml-7" for="flexRadioDefault1">
                    Perempuan
                  </label>
                <input class="form-check-input ml-7" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                  <label class="form-check-label ml-12" for="flexRadioDefault2">
                    Laki-Laki
                  </label>
              </b-form-group>
            </b-col>
            <b-col cols="8">
              <b-form-group label="Tempat" label-for="tempat">
                <b-form-input id="tempat" v-model="$v.form.data.tempat.$model"
                  :state="validateState('tempat')" />
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="Tanggal Lahir" label-for="tgl_lahir">
                <b-form-input type="date" id="tgl_lahir" v-model="$v.form.data.tgl_lahir.$model"
                  :state="validateState('tgl_lahir')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nama Ibu Kandung" label-for="nama_ibu_kdg">
                <b-form-input id="nama_ibu_kdg" v-model="$v.form.data.nama_ibu_kdg.$model"
                  :state="validateState('nama_ibu_kdg')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nik" label-for="nik">
                <b-form-input id="nik" v-model="$v.form.data.nik.$model"
                  :state="validateState('nik')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Alamat" label-for="alamat">
                <b-form-select class="mb-3" id="kota_kab" v-model="$v.form.data.kota_kab.$model" :options="opt.kota_kab"
                  :state="validateState('kota_kab')" />
                  <b-form-select class="mb-3" id="kecamatan" v-model="$v.form.data.kecamatan.$model" :options="opt.kecamatan"
                  :state="validateState('desa')" />
                  <b-form-select class="mb-3" id="desa" v-model="$v.form.data.desa.$model" :options="opt.desa"
                  :state="validateState('desa')" />
                  <b-form-input id="jl_no_rt_rw" v-model="$v.form.data.jl_no_rt_rw.$model" placeholder="Jl:.....,No......Rt...,Rw..."
                  :state="validateState('jl_no_rt_rw')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="No HP" label-for="no_hp">
                <b-form-input id="no_hp" v-model="$v.form.data.no_hp.$model" placeholder="0858-XXXX-XXXX"
                  :state="validateState('no_hp')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Pendidikan Terakhir" label-for="pendidikan_tkr">
                <b-form-select id="pendidikan_tkr" v-model="$v.form.data.pendidikan_tkr.$model" :options="opt.pendidikan_tkr"
                  :state="validateState('pendidikan_tkr')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Pekerjaan" label-for="pekerjaan">
                <b-form-select id="pekerjaan" v-model="$v.form.data.pekerjaan.$model" :options="opt.pekerjaan"
                  :state="validateState('pekerjaan')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Keterangan Pekerjaan" label-for="ket_pekerjaan">
                <b-form-input id="ket_pekerjaan" v-model="$v.form.data.ket_pekerjaan.$model"
                  :state="validateState('ket_pekerjaan')" />
              </b-form-group>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-end border-top pt-5"></b-col>
            <b-col cols="12">
              <b-form-group label="Rembug" label-for="rembug">
                <b-form-select id="rembug" v-model="$v.form.data.rembug.$model" :options="opt.rembug"
                  :state="validateState('rembug')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Simpanan Pokok" label-for="simpok">
                <b-form-input id="simpok" v-model="$v.form.data.simpok.$model"
                  :state="validateState('simpok')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Simpanan Wajib" label-for="simwa">
                <b-form-input id="simwa" v-model="$v.form.data.simwa.$model"
                  :state="validateState('simwa')" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Kas Petugas" label-for="kas_petugas">
                <b-form-select id="kas_petugas" v-model="$v.form.data.kas_petugas.$model" :options="opt.kas_petugas"
                  :state="validateState('kas_petugas')" />
              </b-form-group>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-end border-top pt-5">
              <b-button variant="secondary" @click="$bvModal.hide('modal-form')" :disabled="form.loading">Kembali
              </b-button>
              <b-button variant="danger" @click="$bvModal.hide('modal-form')" :disabled="form.loading" class="ml-3" >Tolak
              </b-button>
              <b-button variant="primary" type="submit" :disabled="form.loading" class="ml-3">
                {{form.loading ? 'Memproses...' : 'Registrasi' }}
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
  import { validationMixin } from "vuelidate";
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: "Pengguna",
    components: {},
    data() {
      return {
        form: {
          data: {
            id: null,
            nama: null,
            jenis_kelamin: null,
            tempat: null,
            tgl_lahir: null,
            nama_ibu_kdg: null,
            nik: null,
            alamat: null,
            kota_kab: null,
            kecamatan: null,
            desa: null,
            jl_no_rt_rw: null,
            no_hp: null,
            pendidikan_tkr: null,
            pekerjaan: null,
            ket_pekerjaan: null,
            rembug: null,
            simpok: null,
            simwa: null,
            kas_petugas: null,
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
              key: 'cabang',
              sortable: true,
              label: 'Cabang',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'nama',
              sortable: true,
              label: 'Nama',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'nik',
              sortable: true,
              label: 'Nik',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'desa',
              sortable: true,
              label: 'Desa',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'created_at',
              sortable: true,
              label: 'Dibuat Tanggal',
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
        },
        paging: {
          page: 1,
          perPage: 10
        },
        remove: {
          data: {
  
          },
          loading: false
        },
        opt: {
          kota_kab: ['Kota / Kabupaten :','kota bogor','kabupaten bogor'],
          kecamatan: ['Kecamatan :','kecamatan Cibinong','Kecamatan Ciawi'],
          desa: ['Desa :','sukahati','karadenan'],
          cabang: ['Enter Text','Cimauk','Cabang 1'],
          pendidikan_tkr: ['SLTA','SD','SMP','SMA/SMK','Sarjana'],
          pekerjaan: ['Buruh Lepas','Karyawan Swasta','Dokter','Atlet'],
          rembug: ['Melati','Mawar'],
          kas_petugas: ['Ujang','Udin'],
        }
      }
    },
    mixins: [validationMixin],
    validations: {
      form: {
        data: {
          cabang: {
            required
          },
          nama: {
            required
          },
          kota_kab: {
            required
          },
          kecamatan: {
            required
          },
          desa: {
            required
          },
          jl_no_rt_rw: {
            required
          },
          jenis_kelamin: {
            required
          },
          tempat: {
            required
          },
          tgl_lahir: {
            required
          },
          nama_ibu_kdg: {
            required
          },
          nik: {
            required
          },
          no_hp: {
            required
          },
          pendidikan_tkr: {
            required
          },
          pekerjaan: {
            required
          },
          ket_pekerjaan: {
            required
          },
          rembug: {
            required
          },
          simpok: {
            required
          },
          simwa: {
            required
          },
          kas_petugas: {
            required
          },
        }
      }
    },
    mounted() {
      this.doGet()
    },
    methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.form.data[name];
        return $dirty ? !$error : null;
      },
      async doGet() {
        this.table.loading = true
        setTimeout(() => {
          this.table.loading = false
          this.table.items = [
            {
              kode: '123456789',
              cabang: 'Cimauk',
              nama: 'Nama User',
              desa: 'Sukadiri,Cimauk Tangerang selatan',
              jenis_kelamin: 'Laki-laki',
              tempat_tgl_lahir: 'Bogor, 1 Januari 2001',
              nama_ibu_kdg: 'Nama Ibu Kandung User',
              nik: '3201234',
              no_hp: '0856123',
              pendidikan_tkr: 'SMA',
              pekerjaan: 'Buruh',
              ket_pekerjaan: 'Buruh Cuci Di Perumahan',
              rembug: 'Melati',
              simpok: '30.000',
              simwa: '30.000',
              kas_petugas: 'Budi',
              created_at: 'Tanggal Dibuat',
            },
          ]
          this.doInfo('Data berhasil diambil','Berhasil','success')
        },5000)
      },
      async doSave() {
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.form.loading = true
          setTimeout(() => {
            this.form.loading = false
            this.$bvModal.hide('modal-form')
            let newItems = {...this.form.data}
            let date = new Date()
            newItems.created_at = date.toLocaleDateString() 
            newItems.id = this.table.items.length + 1
            this.table.items.push(newItems)
            this.doClearForm()
            this.doInfo('Data berhasil disimpan','Berhasil','success')
          }, 5000);
        }
      },
      async doUpdate(item) {
        console.log(item)
        this.form.data = {...item.item}
        this.$bvModal.show('modal-form')
      },
      async doDelete(item,prompt) {
        if(prompt){
          this.remove.data = item
          this.$bvModal.show('modal-delete')
        } else {
          this.remove.loading = true
          setTimeout(() => {
            this.remove.loading = false
            this.$bvModal.hide('modal-delete')
            this.doInfo('Data berhasil dihapus','Berhasil','success')
          }, 5000);
        }
      },
      doClearForm() {
        this.form.data = {
          id: null,
          cabang: null,
          nama: null,
          jenis_kelamin: null,
          tempat: null,
          tgl_lahir: null,
          nama_ibu_kdg: null,
          nik: null,
          kota_kab: null,
          kecamatan: null,
          desa: null,
          jl_no_rt_rw: null,
          no_hp: null,
          pendidikan_tkr: null,
          pekerjaan: null,
          ket_pekerjaan: null,
          rembug: null,
          simpok: null,
          simwa: null,
          kas_petugas: null,
        }
        this.$v.form.$reset()
      },
      doInfo(msg,title,variant) {
        this.$bvToast.toast(msg, {
          title: title,
          variant: variant,
          solid: true,
          toaster: 'b-toaster-bottom-right'
        })
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
    