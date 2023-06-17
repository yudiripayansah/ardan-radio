<template>
    <div>
      <h1 class="mb-5">{{$route.name}}</h1>
      <b-card>
        <b-row no-gutters>
          <b-col cols="12" class="d-flex justify-content-end mb-5 pb-5 border-bottom">
          </b-col>
          <b-col cols="12" class="mb-5">
            <b-row no-gutters>
                <b-col cols="8" class="mb-5">
          <div class="row">
            <b-col cols="6">
              <b-input-group prepend="Cabang" class="mb-3">
                <b-form-select v-model="paging.cabang" :options="opt.cabang" />
              </b-input-group>
            </b-col>
            <b-col cols="6">
              <b-input-group prepend="No Akun" class="mb-3">
                <b-form-select v-model="paging.no_akun" :options="opt.no_akun" />
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="Dari Tanggal">
                <b-form-datepicker v-model="paging.from"/>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="Sampai Tanggal">
                <b-form-datepicker v-model="paging.to"/>
              </b-input-group>
            </b-col>
          </div>
        </b-col>
        <b-col cols="4" class="d-flex justify-content-end align-items-start">
          <b-button-group>
            <b-button text="Button" variant="primary">
              GRID
            </b-button>
            <b-button text="Button" variant="warning">
              CSV
            </b-button>
            <b-button text="Button" variant="danger">
              PDF
            </b-button>
            <b-button text="Button" variant="success">
              XLS
            </b-button>
          </b-button-group>
        </b-col>
            </b-row>
          </b-col>
          <b-col cols="12">
            <b-table responsive bordered outlined small striped hover :fields="table.fields" :items="table.items"
              show-empty :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'">
              <template #cell(no)="item">
                {{item.index + 1}}
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" class="justify-content-end d-flex">
            <b-pagination v-model="paging.page" :total-rows="table.totalRows" :per-page="paging.perPage">
            </b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </template>
  
  <script>
  import { validationMixin } from "vuelidate";
  import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
  export default {
    name: "transaksi_kas_petugas",
    components: {},
    data() {
      return {
        form: {
          data: {
            id: null,
            cabang: null,
            tanggal: null,
            saldo: null,
            keterangan: null,
            no_akun: null,
            debit: null,
            kredit: null,
          },
          loading: false,
        },
        table: {
          fields: [
            {
              key: 'tanggal',
              sortable: true,
              label: 'Tanggal',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'keterangan',
              sortable: true,
              label: 'Keterangan',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'debit',
              sortable: true,
              label: 'Debit',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'kredit',
              sortable: true,
              label: 'Kredit',
              thClass: 'text-center',
              tdClass: ''
            },
            {
              key: 'saldo',
              sortable: true,
              label: 'Saldo',
              thClass: 'text-center',
              tdClass: ''
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
          perPage: [10,25,50,100],
          cabang: ['cabang 1','cabang 2','cabang 3'],
          no_akun: ['101020101 BRI CAB SUDIRMAN','101010101 KAS BESAR','501020105 BY PERJALANAN DINS','101010101 KAS BESAR'],
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
          tanggal: {
            required,
          },
          keterangan: {
            required,
          },
          no_akun: {
            required,
          },
          debit: {
            required,
          },
          kredit: {
            required,
          },
          saldo: {
            required,
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
              keterangan: 'Saldo Awal',
              saldo: '178.250.000',
            },
            {
              tanggal: '01-01-2022',
              keterangan: 'Setor Tunai ke BRI',
              no_akun: '101010101 KAS BESAR',
              debit: '0',
              kredit: '78.250.000',
              saldo: '100.000.000',
            },
            {
              tanggal: '01-01-2022',
              keterangan: 'UMB Perjalanan Dinas Tim Penumbuhan',
              debit: '0',
              kredit: '15.700.000',
              saldo: '84.300.000',
            },
            {
              debit: '0',
              kredit: '93.950.000',
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
            tanggal: null,
            saldo: null,
            keterangan: null,
            no_akun: null,
            debit: null,
            kredit: null,
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
      }
    }
  };
  </script>
    