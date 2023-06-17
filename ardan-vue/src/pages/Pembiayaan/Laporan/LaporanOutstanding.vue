<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col
          cols="12"
          class="d-flex justify-content-end mb-5 pb-5 border-bottom"
        >
        </b-col>
        <b-col cols="12" class="mb-5">
          <b-row no-gutters>
            <b-col cols="8" class="mb-5">
              <div class="row">
                <b-col cols="4">
                  <b-input-group prepend="Cabang" class="mb-3">
                    <b-form-select
                      v-model="paging.cabang"
                      :options="opt.cabang"
                    />
                  </b-input-group>
                </b-col>
                <b-col cols="4">
                  <b-input-group prepend="Petugas" class="mb-3">
                    <b-form-select
                      v-model="paging.petugas"
                      :options="opt.petugas"
                    />
                  </b-input-group>
                </b-col>
                <b-col cols="4">
                  <b-input-group prepend="Majelis" class="mb-3">
                    <b-form-select
                      v-model="paging.rembug"
                      :options="opt.rembug"
                    />
                  </b-input-group>
                </b-col>
                <!-- <b-col cols="6">
                  <b-input-group prepend="Dari Tanggal">
                    <b-form-datepicker
                      v-model="paging.from"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      locale="id"
                    />
                  </b-input-group>
                </b-col>
                <b-col cols="6">
                  <b-input-group prepend="Sampai Tanggal">
                    <b-form-datepicker
                      v-model="paging.to"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      locale="id"
                    />
                  </b-input-group>
                </b-col> -->
              </div>
            </b-col>
            <b-col
              cols="4"
              class="d-flex justify-content-end align-items-start"
            >
              <b-button-group>
                <b-button
                  text="Button"
                  variant="danger"
                  @click="
                    $bvModal.show('modal-pdf');
                    doGetReport();
                  "
                >
                  PDF
                </b-button>
                <b-button text="Button" variant="success" @click="exportXls()">
                  XLS
                </b-button>
                <b-button text="Button" variant="warning" @click="exportCsv()">
                  CSV
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-col>
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
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(saldo_pokok)="item">
              Rp {{ thousand(item.item.saldo_pokok) }}
            </template>
            <template #cell(saldo_margin)="item">
              Rp {{ thousand(item.item.saldo_margin) }}
            </template>
            <template #cell(saldo_minggon)="item">
              Rp {{ thousand(item.item.saldo_minggon) }}
            </template>
            <template #cell(jangka_waktu)="item">
              {{ item.item.jangka_waktu }}
              {{ getPeriodJangkaWaktu(item.item.periode_jangka_waktu) }}
            </template>
          </b-table>
        </b-col>
        <b-col cols="12" class="justify-content-end d-flex">
          <b-pagination
            v-model="paging.page"
            :total-rows="table.totalRows"
            :per-page="paging.perPage"
          >
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      title="PREVIEW LAPORAN OUTSTANDING"
      id="modal-pdf"
      hide-footer
      size="xl"
      centered
    >
      <div id="table-print" class="p-5">
        <h5 class="text-center">
          KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )
        </h5>
        <h5 class="text-center">LAPORAN OUTSTANDING</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <!-- <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">
          Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}
        </h6> -->
        <b-table
          responsive
          bordered
          outlined
          small
          striped
          hover
          :fields="report.fields"
          :items="report.items"
          show-empty
          :emptyText="report.loading ? 'Memuat data...' : 'Tidak ada data'"
          class="mt-5 pt-5 d-block"
        >
          <template #cell(no)="item">
            {{ item.index + 1 }}
          </template>
          <template #cell(saldo_pokok)="item">
            Rp {{ thousand(item.item.saldo_pokok) }}
          </template>
          <template #cell(saldo_margin)="item">
            Rp {{ thousand(item.item.saldo_margin) }}
          </template>
          <template #cell(saldo_minggon)="item">
            Rp {{ thousand(item.item.saldo_minggon) }}
          </template>
          <template #cell(jangka_waktu)="item">
            {{ item.item.jangka_waktu }}
            {{ getPeriodJangkaWaktu(item.item.periode_jangka_waktu) }}
          </template>
        </b-table>
      </div>
      <b-row>
        <b-col
          cols="12"
          sm="12"
          class="d-flex justify-content-end border-top pt-5"
        >
          <b-button variant="secondary" @click="$bvModal.hide('modal-pdf')"
            >Cancel
          </b-button>
          <b-button
            variant="danger"
            type="button"
            class="ml-3"
            @click="doPrintPdf()"
          >
            Cetak PDF
          </b-button>
          <b-button
            variant="warning"
            type="button"
            class="ml-3"
            @click="doSavePdf()"
          >
            Simpan PDF
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
  
<script>
import html2pdf from "html2pdf.js";
import helper from "@/core/helper";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "LaporanOutstanding",
  components: {},
  data() {
    return {
      table: {
        fields: [
          {
            key: "no_rekening",
            sortable: true,
            label: "No Rek",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_anggota",
            sortable: true,
            label: "Nama",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_rembug",
            sortable: true,
            label: "Majelis",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_produk",
            sortable: true,
            label: "Produk",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "tanggal_akad",
            sortable: true,
            label: "Tgl Cair",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jangka_waktu",
            sortable: true,
            label: "Jk Waktu",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "saldo_margin",
            sortable: true,
            label: "Margin",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "saldo_pokok",
            sortable: true,
            label: "Saldo Pokok",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "saldo_minggon",
            sortable: true,
            label: "Saldo Mgn",
            thClass: "text-center",
            tdClass: "text-right",
          },
        ],
        items: [],
        loading: false,
      },
      report: {
        fields: [
          {
            key: "no_rekening",
            sortable: false,
            label: "No Rek",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_anggota",
            sortable: false,
            label: "Nama",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_rembug",
            sortable: false,
            label: "Rembug",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_produk",
            sortable: false,
            label: "Produk",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "tanggal_akad",
            sortable: false,
            label: "Tgl Cair",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jangka_waktu",
            sortable: false,
            label: "Jk Waktu",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "saldo_margin",
            sortable: false,
            label: "Margin",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "saldo_pokok",
            sortable: false,
            label: "Saldo Pokok",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "saldo_minggon",
            sortable: false,
            label: "Saldo Mgn",
            thClass: "text-center",
            tdClass: "text-right",
          },
        ],
        items: [],
        loading: false,
        cabang: 0,
        petugas: 0,
        rembug: 0,
      },
      paging: {
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: "kop_anggota.id",
        search: "",
        status: [0, 1],
        cabang: null,
        petugas: null,
        rembug: null,
        from: null,
        to: null,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        cabang: [],
        petugas: [],
        rembug: [],
      },
    };
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
  mounted() {
    this.doGet();
    this.doGetCabang();
    this.doGetPetugas();
    this.doGetRembug();
  },
  methods: {
    ...helper,
    doPrintPdf() {
      let filename = "LAPORAN OUTSTANDING";
      if (this.report.cabang) {
        filename += ` - Cabang ${this.report.cabang}`;
      }
      if (this.report.from && this.report.to) {
        filename += ` - Dari ${this.dateFormatId(
          this.report.from
        )} Sampai ${this.dateFormatId(this.report.to)}`;
      }
      let element = document.getElementById("table-print");
      let options = {
        margin: 0,
        filename: `${filename}.pdf`,
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "landscape",
        },
      };
      html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          console.log("hi");
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
    doSavePdf() {
      let filename = "LAPORAN OUTSTANDING";
      if (this.report.cabang) {
        filename += ` - Cabang ${this.report.cabang}`;
      }
      if (this.report.from && this.report.to) {
        filename += ` - Dari ${this.dateFormatId(
          this.report.from
        )} Sampai ${this.dateFormatId(this.report.to)}`;
      }

      html2pdf(document.getElementById("table-print"), {
        margin: 0,
        filename: `${filename}.pdf`,
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "landscape",
        },
      });
    },
    async exportXls() {
      let payload = `kode_cabang=${this.paging.cabang}&kode_petugas=${this.paging.petugas}&kode_rembug=${this.paging.rembug}`;
      let req = await easycoApi.outstandingPembiayaanExcel(payload);
      console.log(req.data);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Outstanding_Pembiayaan.xls";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    async exportCsv() {
      let payload = `kode_cabang=${this.paging.cabang}&kode_petugas=${this.paging.petugas}&kode_rembug=${this.paging.rembug}`;
      let req = await easycoApi.outstandingPembiayaanCsv(payload);
      console.log(req.data);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Outstanding_Pembiayaan.csv";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    getCabangName(id) {
      if (id > 0) {
        let cabangName = this.opt.cabang.find((i) => i.value == id);
        if (cabangName) {
          console.log(cabangName.text);
          return cabangName.text;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    getPeriodJangkaWaktu(val) {
      let res = "";
      switch (val) {
        case 1:
          res = "Minggu";
          break;
        case 2:
          res = "Bulan";
          break;
        default:
          res = "Hari";
          break;
      }
      return res;
    },
    async doGetCabang() {
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "nama_cabang",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.cabangRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.cabang = [
            {
              value: null,
              text: "All",
            },
          ];
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
    async doGetPetugas() {
      let payload = null;
      try {
        let req = await easycoApi.petugasRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.petugas = [
            {
              value: null,
              text: "All",
            },
          ];
          data.map((item) => {
            this.opt.petugas.push({
              value: Number(item.kode_petugas),
              text: item.nama_kas_petugas,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGetRembug() {
      let payload = {
        kode_cabang: this.user.kode_cabang,
      };
      try {
        let req = await easycoApi.anggotaRembug(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.rembug = [
            {
              value: null,
              text: "All",
            },
          ];
          data.map((item) => {
            this.opt.rembug.push({
              value: Number(item.kode_rembug),
              text: item.nama_rembug,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGet() {
      let payload = this.paging;
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      payload.perPage = 10;
      this.table.loading = true;
      try {
        let req = await easycoApi.regisAkadRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          this.table.items = data;
          this.table.totalRows = total;
        } else {
          this.notify("danger", "Error", msg);
        }
        this.table.loading = false;
      } catch (error) {
        this.table.loading = false;
        console.error(error);
        this.notify("danger", "Login Error", error);
      }
    },
    async doGetReport() {
      let payload = this.paging;
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      payload.perPage = "~";
      this.report.loading = true;
      this.report.from = payload.from;
      this.report.to = payload.to;
      this.report.cabang = this.getCabangName(payload.cabang);
      try {
        let req = await easycoApi.regisAkadRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          this.report.items = data;
          this.report.totalRows = total;
        } else {
          this.notify("danger", "Error", msg);
        }
        this.report.loading = false;
      } catch (error) {
        this.report.loading = false;
        console.error(error);
        this.notify("danger", "Error", error);
      }
    },
    doInfo(msg, title, variant) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
      });
    },
  },
};
</script>
    