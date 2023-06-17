<template>
  <div>
    <h1 class="mb-5">{{$route.name}}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="12" class="mb-5">
          <b-row no-gutters>
            <b-col cols="6">
              <div class="w-100 max-200 pr-5">
                <b-input-group size="sm" prepend="Per Halaman">
                  <b-form-select v-model="paging.perPage" :options="opt.perPage" @change="doGet()"/>
                </b-input-group>
              </div>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-end">
              <div class="w-100 max-300">
                <b-input-group size="sm">
                  <b-form-input v-model="paging.search"/>
                  <b-input-group-append>
                    <b-button size="sm" text="Button" variant="primary" @click="doGet()">
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
          <b-table 
            responsive bordered outlined small striped hover 
            :fields="table.fields" 
            :items="table.items"
            :sort-by.sync="paging.sortBy"
            :sort-desc.sync="paging.sortDesc"
            show-empty 
            @filtered="onTableUpdate"
            :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'">
            <template #cell(no)="item">
              {{item.index + 1}}
            </template>
            <template #cell(action)="item">
              <!-- <b-button variant="danger" size="xs" class="mx-1" @click="doDelete(item,true)">
                <b-icon icon="trash" />
              </b-button> -->
              <b-button variant="success" size="xs" class="mx-1" @click="doUpdate(item,false)">
                <b-icon icon="pencil" />
              </b-button>
              <!-- <b-button variant="info" size="xs" class="mx-1" @click="doUpdate(item,true)">
                <b-icon icon="check" />
              </b-button> -->
            </template>
          </b-table>
        </b-col>
        <b-col cols="12" class="justify-content-end d-flex">
          <b-pagination v-model="paging.page" :total-rows="table.totalRows" :per-page="paging.perPage">
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal title="Form Registrasi Anggota Majelis" id="modal-form" hide-footer size="xl" centered>
      <b-form @submit="doSave()">
        <b-row>
          <b-col cols="12" sm="12" class="mb-3">
            <h4 class="mb-3">Data Anggota</h4>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Nama">
              <b-input v-model="form.data.nama_anggota" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Jenis Kelamin">
              <b-input :value="form.data.jenis_kelamin == 'P' ? 'Pria' : 'Wanita'" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Tempat / Tanggal Lahir">
              <b-row>
                <b-col cols="12" sm="6">
                  <b-input v-model="form.data.tempat_lahir" disabled/>
                </b-col>
                <b-col cols="12" sm="6">
                  <b-input-group class="mb-3">
                    <b-form-input
                      v-model="form.data.tgl_lahir"
                      type="text"
                      autocomplete="off"
                      disabled
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        disabled
                        button-only
                        right
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id" v-model="form.data.tgl_lahir"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                  <!-- <b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id" v-model="form.data.tgl_lahir"/> -->
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="2">
            <b-form-group label="Nama Ibu Kandung">
              <b-input v-model="form.data.ibu_kandung" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="2">
            <b-form-group label="NIK">
              <b-input v-model="form.data.no_ktp" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="2">
            <b-form-group label="NPWP">
              <b-input v-model="form.data.no_npwp" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12">
            <b-form-group label="Alamat">
              <b-textarea v-model="form.data.alamat" disabled/>
              <b-row class="mt-3">
                <b-col cols="12" sm="3">
                  <b-form-group label="Desa">
                    <b-input v-model="form.data.desa" disabled/>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="3">
                  <b-form-group label="Kecamatan">
                    <b-input v-model="form.data.kecamatan" disabled/>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="3">
                  <b-form-group label="Kabupaten">
                    <b-input v-model="form.data.kabupaten" disabled/>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="3">
                  <b-form-group label="Kode Pos">
                    <b-input v-model="form.data.kodepos" disabled/>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="No.Telp / HP">
              <b-input placeholder="0858123456" v-model="form.data.no_telp" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Pendidikan Terakhir">
              <b-select :options="opt.pendidikan" v-model="form.data.pendidikan" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Pekerjaan">
              <b-select :options="opt.pekerjaan" v-model="form.data.pekerjaan" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Keterangan Pekerjaan">
              <b-input v-model="form.data.ket_pekerjaan" disabled/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" class="mb-3">
            <hr>
            <h4 class="my-3">Cabang & Majelis</h4>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Cabang">
              <b-select v-model="form.data.kode_cabang" :options="opt.cabang" @change="doGetRembug()" disabled/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Majelis">
              <b-select v-model="form.data.kode_rembug" :options="opt.rembug"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Simpok">
              <!-- <b-input v-model="form.data.simpok"/> -->
              <vue-numeric currency="Rp " separator="." v-model="form.data.simpok" class="form-control"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="Simwa">
              <!-- <b-input v-model="form.data.simwa"/> -->
              <vue-numeric currency="Rp " separator="." v-model="form.data.simwa" class="form-control"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="12" class="d-flex justify-content-end border-top pt-5">
            <b-button 
              variant="secondary" 
              @click="$bvModal.hide('modal-form')" :disabled="form.loading">
              Cancel
            </b-button>
            <b-button 
              variant="primary" 
              type="button"
              :disabled="form.loading" 
              class="ml-3" 
              @click="doSave()">
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
  import easycoApi from '@/core/services/easyco.service'
  export default {
    name: "RegistrasiAnggota",
    components: {
  
    },
    data() {
      return {
        form: {
          data: {
            id: null,
            kode_cabang: null,
            kode_rembug: null,
            nama_anggota: null,
            jenis_kelamin: 'W',
            ibu_kandung: null,
            tempat_lahir: null,
            tgl_lahir: null,
            alamat: null,
            desa: null,
            kecamatan: null,
            kabupaten: null,
            kodepos: null,
            no_ktp: null,
            no_npwp: null,
            no_telp: null,
            pendidikan: null,
            status_perkawinan: null,
            nama_pasangan: null,
            pekerjaan: null,
            ket_pekerjaan: null,
            pendapatan_perbulan: 0,
            tgl_gabung: null,
            created_by: null,
            p_nama: null,
            p_tmplahir: null,
            p_tglahir: null,
            usia: null,
            p_noktp: null,
            p_nohp: null,
            p_pendidikan: null,
            p_pekerjaan: null,
            p_ketpekerjaan: null,
            p_pendapatan: 0,
            jml_anak: null,
            jml_tanggungan: null,
            rumah_status: null,
            rumah_ukuran: null,
            rumah_atap: null,
            rumah_dinding: null,
            rumah_lantai: null,
            rumah_jamban: null,
            rumah_air: null,
            lahan_sawah: null,
            lahan_kebun: null,
            lahan_pekarangan: null,
            ternak_sapi: null,
            ternak_domba: null,
            ternak_unggas: null,
            elc_kulkas: null,
            elc_tv: null,
            elc_hp: null,
            kend_sepeda: null,
            kend_motor: null,
            ush_rumahtangga: 0,
            ush_komoditi: 0,
            ush_lokasi: 0,
            ush_omset: 0,
            by_beras: 0,
            by_dapur: 0,
            by_listrik: 0,
            by_telpon: 0,
            by_sekolah: 0,
            by_lain: 0,
            simpok: 0,
            simwa: 0,
            status: 0
          },
          steps: 4,
          activeStep: 1,
          loading: false
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
              key: 'nama_anggota',
              sortable: true,
              label: 'Nama Anggota',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'nama_rembug',
              sortable: true,
              label: 'Majelis',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'nama_cabang',
              sortable: true,
              label: 'Cabang',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'no_telp',
              sortable: true,
              label: 'No Telp',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'alamat',
              sortable: true,
              label: 'Alamat',
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
          search: '',
          status: 0
        },
        remove: {
          data: Object,
          loading: false
        },
        opt: {
          cabang: [],
          rembug: [],
          pendidikan: [
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'SD / MI',
              value: '1'
            },
            {
              text: 'SMP / MTs',
              value: '2'
            },
            {
              text: 'SMK / SMA / MA',
              value: '3'
            },
            {
              text: 'D1',
              value: '4'
            },
            {
              text: 'D2',
              value: '5'
            },
            {
              text: 'D3',
              value: '6'
            },
            {
              text: 'S1',
              value: '7'
            },
            {
              text: 'S2',
              value: '8'
            },
            {
              text: 'S3',
              value: '9'
            }
          ],
          status_perkawinan: [
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Sudah',
              value: '1'
            },
            {
              text: 'Belum',
              value: '2'
            }
          ],
          kota_kabupaten: [],
          kecamatan: [],
          desa: [],
          pekerjaan: [
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Ibu Rumah Tangga',
              value: '1'
            },
            {
              text: 'Buruh',
              value: '2'
            },
            {
              text: 'Petani',
              value: '3'
            },
            {
              text: 'Pedagang',
              value: '4'
            },
            {
              text: 'Wiraswasta',
              value: '5'
            },
            {
              text: 'Karyawan Swasta',
              value: '6'
            },
            {
              text: 'PNS',
              value: '7'
            }
          ],
          rumah_status: [
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Rumah Sendiri',
              value: '1'
            },
            {
              text: 'Sewa',
              value: '2'
            },
            {
              text: 'Numpang',
              value: '3'
            }
          ],
          rumah_ukuran: [
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Kecil',
              value: '1'
            },
            {
              text: 'Sedang',
              value: '2'
            },
            {
              text: 'Besar',
              value: '3'
            }
          ],
          rumah_dinding: [
            // 0 = Tidak Diketahui, 1 = Tembok, 2 = Semi Tembok, 3 = Papan, 4 = Bambu
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Tembok',
              value: '1'
            },
            {
              text: 'Semi Tembok',
              value: '2'
            },
            {
              text: 'Papan',
              value: '3'
            },
            {
              text: 'Bambu',
              value: '4'
            }
          ],
          rumah_atap: [
            // 0 = Tidak Diketahui, 1 = Genteng, 2 = Asbes, 3 = Rumbia
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Genteng',
              value: '1'
            },
            {
              text: 'Asbes',
              value: '2'
            },
            {
              text: 'Rumbia',
              value: '3'
            }
          ],
          rumah_lantai: [
            // 0 = Tidak Diketahui, 1 = Tanah, 2 = Semen, 3 = Keramik
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Tanah',
              value: '1'
            },
            {
              text: 'Semen',
              value: '2'
            },
            {
              text: 'Keramik',
              value: '3'
            }
          ],
          rumah_jamban: [
            // 0 = Tidak Diketahui, 1 = Sungai, 2 = Jamban Terbuka, 3 = WC
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Sungai',
              value: '1'
            },
            {
              text: 'Jamban Terbuka',
              value: '2'
            },
            {
              text: 'WC',
              value: '3'
            }
          ],
          rumah_air: [
            // 0 = Tidak Diketahui, 1 = Sumur Sendiri, 2 = Sumur Bersama, 3 = Sungai, 4 = PDAM / PAMSIMAS
            {
              text: 'Tidak Diketahui',
              value: '0'
            },
            {
              text: 'Sumur Sendiri',
              value: '1'
            },
            {
              text: 'Sumur Bersama',
              value: '2'
            },
            {
              text: 'Sungai',
              value: '3'
            },
            {
              text: 'PDAM/ PAMSIMAS',
              value: '4'
            }
          ],
          perPage: [10,20,50,100,200]
        },
        loading: false,
        simpanan: {
          simpok: 0,
          simwa: 0
        }
      }
    },
    computed: {
      ...mapGetters(["user"]),
    },
    watch: {
      paging: {
        handler(val){
          this.doGet()
        },
        deep: true
      }
    },
    mounted() {
      this.doGet()
      this.doGetCabang()
      this.doGetSimpanan()
    },
    methods: {
      async doGetCabang() {
        let payload = {
          perPage: '~',
          page: 1,
          sortBy: 'nama_cabang',
          sortDir: 'ASC',
          search: ''
        }
        try {
          let req = await  easycoApi.cabangRead(payload, this.user.token)
          let { data, status, msg } = req.data
          if(status){
            this.opt.cabang = []
            data.map((item) => {
              this.opt.cabang.push({
                value: item.kode_cabang,
                text: item.nama_cabang
              })
            })
          }
        } catch (error) {
          console.error(error)
        }
      },
      async doGetRembug() {
        let payload = {
          kode_cabang: this.form.data.kode_cabang
        }
        try {
          let req = await  easycoApi.anggotaRembug(payload, this.user.token)
          let { data, status, msg } = req.data
          if(status){
            this.opt.rembug = []
            data.map((item) => {
              this.opt.rembug.push({
                value: item.kode_rembug,
                text: item.nama_rembug
              })
            })
          }
        } catch (error) {
          console.error(error)
        }
      },
      async doGetSimpanan() {
        try {
          let req = await  easycoApi.anggotaSimpanan(this.user.token)
          let { data, status, msg } = req.data
          if(status){
            this.simpanan = data
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
          let req = await  easycoApi.anggotaRead(payload, this.user.token)
          let { data, status, msg, total } = req.data
          if(status){
            this.table.items = data
            this.table.totalRows = total
          } else {
            this.notify('danger','Error',msg)
          }
          this.table.loading = false
        } catch (error) {
          this.table.loading = false
          console.error(error)
          this.notify('danger','Login Error',error)
        }
      },
      async doSave() {
        this.form.loading = true
        try {
          let payload = this.form.data
          let tgl_lahir = new Date(this.form.data.tgl_lahir)
          payload.usia = Number(this.calculateAge(tgl_lahir))
          payload.ktp = Number(payload.ktp)
          payload.created_by = this.user.id
          let req = false
          if(payload.id){
            payload.status = 1
            req = await easycoApi.anggotaUpdate(payload, this.user.token) 
          } else {
            req = await easycoApi.anggotaCreate(payload, this.user.token) 
          }
          let {data, status, msg} = req.data
          if(status){
            this.doGet()
            this.$bvModal.hide('modal-form')
            this.doClearForm()
            this.notify('success','Success',msg)
          } else {
            this.notify('danger','Error',msg)
          }
          this.form.loading = false
        } catch (error) {
          this.form.loading = false
          console.error(error)
          this.notify('danger','Login Error',error)         
        }
      },
      async doUpdate(data, setRembug) {
        this.form.setRembug = setRembug
        let id = data.item.id
        try {
          let req = await easycoApi.anggotaDetail(`?id=${id}`,this.user.token)
          let {data, status, msg} = req.data
          if(status){
            this.form.data = {...data.anggotauk,...data.anggota}
            this.form.data.simpok = this.simpanan.simpok
            this.form.data.simwa = this.simpanan.simwa
            this.doGetRembug()
            this.$bvModal.show('modal-form')
          } else {
            this.notify('danger','Error',msg)
          }
        } catch (error) {
          console.error(error)
        }
      },
      onTableUpdate(v){
        console.log(v)
      },
      calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },
      moveStep(dir) {
        if(dir == 'Next'){
          this.form.activeStep++
          if(this.form.activeStep > this.form.steps){
            this.doSave()
          }
        } else {
          this.form.activeStep--
        }
      },
      doClearForm(){
        this.form.data = {
            id: null,
            kode_cabang: null,
            kode_rembug: null,
            nama_anggota: null,
            jenis_kelamin: 'W',
            ibu_kandung: null,
            tempat_lahir: null,
            tgl_lahir: null,
            alamat: null,
            desa: null,
            kecamatan: null,
            kabupaten: null,
            kodepos: null,
            no_ktp: null,
            no_npwp: null,
            no_telp: null,
            pendidikan: null,
            status_perkawinan: null,
            nama_pasangan: null,
            pekerjaan: null,
            ket_pekerjaan: null,
            pendapatan_perbulan: 0,
            tgl_gabung: null,
            created_by: null,
            p_nama: null,
            p_tmplahir: null,
            p_tglahir: null,
            usia: null,
            p_noktp: null,
            p_nohp: null,
            p_pendidikan: null,
            p_pekerjaan: null,
            p_ketpekerjaan: null,
            p_pendapatan: 0,
            jml_anak: null,
            jml_tanggungan: null,
            rumah_status: null,
            rumah_ukuran: null,
            rumah_atap: null,
            rumah_dinding: null,
            rumah_lantai: null,
            rumah_jamban: null,
            rumah_air: null,
            lahan_sawah: null,
            lahan_kebun: null,
            lahan_pekarangan: null,
            ternak_sapi: null,
            ternak_domba: null,
            ternak_unggas: null,
            elc_kulkas: null,
            elc_tv: null,
            elc_hp: null,
            kend_sepeda: null,
            kend_motor: null,
            ush_rumahtangga: 0,
            ush_komoditi: 0,
            ush_lokasi: 0,
            ush_omset: 0,
            by_beras: 0,
            by_dapur: 0,
            by_listrik: 0,
            by_telpon: 0,
            by_sekolah: 0,
            by_lain: 0,
            simpok: 0,
            simwa: 0,
            status: 0
          }
          this.form.activeStep = 1
          this.form.setRembug = false
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
  