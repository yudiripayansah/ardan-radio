<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="12" class="d-flex mb-5 pb-5 border-bottom">
          <b-form-group label="Cabang" class="mr-5 col-3 p-0 mb-0">
            <b-form-select v-model="paging.branch_code" :options="opt.cabang" @change="doGet()"/>
          </b-form-group>
          <b-form-group label="Dari Tanggal" class="mr-5 col-3 p-0 mb-0">
            <b-form-datepicker
              v-model="paging.from_date" 
              @change="doGet()"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              locale="id"
            /> 
          </b-form-group>
          <b-form-group label="Sampai Tanggal" class="col-3 p-0 mb-0">
            <b-form-datepicker
              v-model="paging.thru_date" 
              @change="doGet()"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              locale="id"
            /> 
          </b-form-group>
        </b-col>
        <!-- <b-col cols="12" class="mb-5">
          <b-row no-gutters>
            <b-col cols="6">
              <div class="w-100 max-200 pr-5">
                <b-input-group size="sm" prepend="Per Halaman">
                  <b-form-select
                    v-model="paging.perPage"
                    :options="opt.perPage"
                  />
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
        </b-col> -->
        <b-col cols="12">
          <b-table
            responsive
            bordered
            outlined
            small
            striped
            hover
            :fields="table.fields"
            :items="table.items"
            show-empty
            :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'"
          >
            <template #cell(no)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(total_penerimaan)="data">
              Rp {{ thousand(data.item.total_penerimaan) }}
            </template>
            <template #cell(total_penarikan)="data">
              Rp {{ thousand(data.item.total_penarikan) }}
            </template>
            <template #cell(infaq)="data">
              Rp {{ thousand(data.item.infaq) }}
            </template>
            <template #cell(action)="data">
              <b-button
                variant="info"
                size="xs"
                class="mx-1"
                @click="doGetDetil(data.item)"
              >
                <b-icon icon="check" /> Verifikasi
              </b-button>
            </template>
          </b-table>
        </b-col>
        <!-- <b-col cols="12" class="justify-content-end d-flex">
          <b-pagination
            v-model="paging.page"
            :total-rows="table.totalRows"
            :per-page="paging.perPage"
          >
          </b-pagination>
        </b-col> -->
      </b-row>
    </b-card>
    <b-modal title="Form Verifikasi Transaksi Rembug" id="modal-form" hide-footer size="xxl" centered>
      <b-form @submit="doSave">
        <b-row>
          <b-col cols="3">
            <b-form-group label="Cabang" label-for="cabang">
              <b-form-input
                id="cabang"
                disabled
                :value="form.data.nama_cabang"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Tanggal" label-for="tanggal">
              <b-form-input
                id="tanggal"
                disabled
                :value="form.data.trx_date"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Rembug" label-for="rembug">
              <b-form-input
                id="rembug"
                disabled
                :value="form.data.nama_rembug"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Petugas" label-for="petugas">
              <b-form-input
                id="petugas"
                disabled
                :value="form.data.nama_kas_petugas"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <div class="table-responsive">
              <table class="table table-bordered table-stripped border-dark">
                <thead class="bg-dark text-white">
                  <tr>
                    <td class="text-center align-center" rowspan="3">Id</td>
                    <td class="text-center align-center" rowspan="3" width="10%">Nama</td>
                    <td class="text-center align-center" rowspan="3" width="5%">Absen</td>
                    <td class="text-center align-center" colspan="5">Setoran</td>
                    <td class="text-center align-center">Penarikan</td>
                    <td class="text-center align-center" colspan="3">Realisasi Pembiayaan</td>
                    <td class="text-center align-center" rowspan="3">Ket.</td>
                  </tr>
                  <tr>
                    <td class="text-center align-center" colspan="2">Angsuran</td>
                    <td class="text-center align-center" rowspan="2">Tab. Sukarela</td>
                    <td class="text-center align-center" rowspan="2">Tab. Simwa/ Simpok</td>
                    <td class="text-center align-center" rowspan="2">Tab. Berencana</td>
                    <td class="text-center align-center" rowspan="2">Tab. Sukarela</td>
                    <td class="text-center align-center" rowspan="2">Plafon</td>
                    <td class="text-center align-center" rowspan="2">Adm</td>
                    <td class="text-center align-center" rowspan="2">Asuransi</td>
                  </tr>
                  <tr>
                    <td class="text-center align-center" width="5%">Frek</td>
                    <td class="text-center align-center">@</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,idx) in form.detail" :key="idx">
                    <td>{{item.no_anggota}}</td>
                    <td>{{item.nama_anggota}}</td>
                    <td><b-form-select value="H"/></td>
                    <td><b-form-input :value="thousand(item.frek)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.angsuran)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.setoran_sukarela)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.setoran_simpok)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.setoran_taber)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.penarikan_sukarela)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.pokok)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.biaya_administrasi)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(item.biaya_asuransi_jiwa)" class="text-right"/></td>
                    <td><b-button variant="info">...</b-button></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right align-center">Total</td>
                    <td><b-form-input :value="thousand(form.total.angsuran)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.setoran_sukarela)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.setoran_simpok)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.setoran_taber)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.penarikan_sukarela)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.pokok)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.biaya_administrasi)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.total.biaya_asuransi_jiwa)" class="text-right"/></td>
                    <td><b-button variant="info">...</b-button></td>
                  </tr>
                  <tr>
                    <td colspan="13"></td>
                  </tr>
                </tbody>
                <thead class="bg-dark text-white">
                  <tr>
                    <td colspan="4"></td>
                    <td class="text-center">Kas Awal</td>
                    <td class="text-center">Infaq</td>
                    <td class="text-center">Setoran</td>
                    <td class="text-center">Penarikan</td>
                    <td class="text-center">Saldo Kas</td>
                    <td colspan="4"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="4"></td>
                    <td><b-form-input :value="thousand(0)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(0)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.data.penerimaan)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(form.data.penarikan)" class="text-right"/></td>
                    <td><b-form-input :value="thousand(0)" class="text-right"/></td>
                    <td colspan="4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-center border-top pt-5">
            <b-button
              variant="secondary"
              @click="$bvModal.hide('modal-form')"
              :disabled="form.loading"
              class="mx-1"
              >Cancel
            </b-button>
            <b-button
              variant="danger"
              type="submit"
              :disabled="form.loading"
              class="mx-1"
              @click="$bvModal.hide('modal-form')"
            >
              {{ form.loading ? "Memproses..." : "Reject" }}
            </b-button>
            <b-button
              variant="success"
              type="submit"
              :disabled="form.loading"
              class="mx-1"
              @click="doSave"
            >
              {{ form.loading ? "Memproses..." : "Approve" }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      title="Delete"
      id="modal-delete"
      hide-footer
      size="sm"
      header-bg-variant="warning"
      body-bg-variant="warning"
      centered
    >
      <p class="text-center py-3">Anda yakin ingin menghapus data ini?</p>
      <div class="d-flex justify-content-end">
        <b-button
          variant="light"
          type="button"
          :disabled="remove.loading"
          @click="$bvModal.hide('modal-delete')"
          >Tidak
        </b-button>
        <b-button
          variant="danger"
          class="ml-3"
          type="button"
          :disabled="remove.loading"
          @click="doDelete(remove.data, false)"
        >
          {{ remove.loading ? "Memproses..." : "Ya" }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import easycoApi from "@/core/services/easyco.service";
import helper from '@/core/helper'
export default {
  name: "Cabang",
  components: {},
  data() {
    return {
      form: {
        data: Object,
        total: Object,
        id_trx_rembug: null,
        detail: [],
        loading: false,
      },
      table: {
        fields: [
          {
            key: "no",
            sortable: false,
            label: "No",
            thClass: "text-center w-5p",
            tdClass: "text-center",
          },
          {
            key: "nama_rembug",
            sortable: true,
            label: "Majelis",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_cabang",
            sortable: true,
            label: "Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "trx_date",
            sortable: true,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_kas_petugas",
            sortable: true,
            label: "Petugas",
            thClass: "text-center",
            tdClass: "",
          },
          // {
          //   key: "kas_awal",
          //   sortable: true,
          //   label: "Kas Awal",
          //   thClass: "text-center",
          //   tdClass: "text-right",
          // },
          {
            key: "infaq",
            sortable: true,
            label: "Infaq",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "total_penerimaan",
            sortable: true,
            label: "Setoran",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "total_penarikan",
            sortable: true,
            label: "Penarikan",
            thClass: "text-center",
            tdClass: "text-right",
          },
          // {
          //   key: "saldo_kas",
          //   sortable: true,
          //   label: "Saldo Kas",
          //   thClass: "text-center",
          //   tdClass: "text-right",
          // },
          {
            key: "action",
            sortable: false,
            label: "Action",
            thClass: "text-center w-10p",
            tdClass: "text-center",
          },
        ],
        items: [],
        loading: false,
        totalRows: 0,
      },
      paging: {
        branch_code: null,
        from_date: null,
        thru_date: null,
      },
      remove: {
        data: Object,
        loading: false,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        cabang: [],
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      data: {
        kode_cabang: {
          required,
        },
        nama_cabang: {
          required,
        },
        induk_cabang: {
          required,
        },
        jenis_cabang: {
          required,
        },
        pimpinan_cabang: {
          required,
        },
      },
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    paging: {
      handler(val) {
        this.doGet();
      },
      deep: true,
    },
  },
  methods: {
    ...helper,
    validateState(name) {
      const { $dirty, $error } = this.$v.form.data[name];
      return $dirty ? !$error : null;
    },
    async doGetCabang() {
      let payload = {
        page: 1,
        perPage: '~',
        sortBy: "nama_cabang",
        search: "",
        sortyDir: 'ASC'
      };
      try {
        let req = await easycoApi.cabangRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          this.opt.cabang = []
          data.map((item) => {
            this.opt.cabang.push({
              value: item.kode_cabang,
              text: item.nama_cabang,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGet() {
      let payload = {...this.paging};
      payload.from_date = this.dateFormatId(payload.from_date,'/')
      payload.thru_date = this.dateFormatId(payload.thru_date,'/')
      if(payload.from_date && payload.branch_code && payload.thru_date){
        this.table.loading = true;
        try {
          let req = await easycoApi.transaksiRembugRead(payload, this.user.token);
          let { data, status, msg, total } = req.data;
          if (status) {
            this.table.items = data;
            this.table.totalRows = total;
          }
          this.table.loading = false;
        } catch (error) {
          this.table.loading = false;
          console.error(error);
        }
      }
    },
    async doSave(e) {
        this.form.loading = true;
        try {
          let payload = {
            id_trx_rembug: this.form.id_trx_rembug
          }
          let req = await easycoApi.transaksiRembugProses(payload, this.user.token);
          let { status } = req.data;
          if (status) {
            this.notify("success", "Success", "Data berhasil disimpan");
            this.doGet();
            this.$bvModal.hide("modal-form");
          } else {
            this.notify("danger", "Error", "Data gagal disimpan");
          }
          this.form.loading = false;
        } catch (error) {
          this.notify("danger", "Error", error);
          this.form.loading = false;
        }
    },
    async doGetDetil(item) {
      try {
        let payload = {
          id_trx_rembug: item.id_trx_rembug
        }
        this.form.id_trx_rembug = item.id_trx_rembug
        let req = await easycoApi.transaksiRembugDetail(payload, this.user.token);
        let { data, status, msg, detail } = req.data;
        if (status) {
          console.log(detail)
          this.form.data = data;
          this.form.detail = detail;

          this.form.total.frek = 0
          this.form.total.angsuran = 0
          this.form.total.setoran_sukarela = 0
          this.form.total.setoran_simpok = 0
          this.form.total.setoran_taber = 0
          this.form.total.penarikan_sukarela = 0
          this.form.total.pokok = 0
          this.form.total.biaya_administrasi = 0
          this.form.total.biaya_asuransi_jiwa = 0
          detail.map((item) => {
            this.form.total.frek += Number(item.frek)
            this.form.total.angsuran += Number(item.angsuran)
            this.form.total.setoran_sukarela += Number(item.setoran_sukarela)
            this.form.total.setoran_simpok += Number(item.setoran_simpok)
            this.form.total.setoran_taber += Number(item.setoran_taber)
            this.form.total.penarikan_sukarela += Number(item.penarikan_sukarela)
            this.form.total.pokok += Number(item.pokok)
            this.form.total.biaya_administrasi += Number(item.biaya_administrasi)
            this.form.total.biaya_asuransi_jiwa += Number(item.biaya_asuransi_jiwa)
          })
          this.$bvModal.show("modal-form");
        }
      } catch (error) {
        console.log(error);
        this.notify("danger", "Error", "Gagal mengambil data");
      }
      
      // this.$bvModal.show("modal-form");
    },
    getJenisCabang(val) {
      let res = this.opt.jenis_cabang.find((i) => i.value == val);
      if (res) {
        return res.text;
      }
      return "-";
    },
    getIndukCabang(val) {
      let res = this.opt.induk_cabang.find((i) => i.value == val);
      if (res) {
        return res.text;
      }
      return "-";
    },
    doClearForm() {
      this.form.data = {
        id: null,
        kode_cabang: null,
        nama_cabang: null,
        induk_cabang: 0,
        jenis_cabang: null,
        pimpinan_cabang: null,
        created_by: null,
      };
      this.$v.form.$reset();
    },
    notify(type, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 5000,
        variant: type,
        toaster: "b-toaster-bottom-right",
        appendToast: true,
      });
    },
  },
  mounted() {
    this.doGetCabang();
  },
};
</script>
<style>
  .modal-xxl {
    max-width: 99%;
  }
  .align-center {
    vertical-align: middle !important;
  }
</style>
