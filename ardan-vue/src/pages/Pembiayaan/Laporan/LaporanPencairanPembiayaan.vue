<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="8" class="mb-5">
          <div class="row">
            <b-col cols="12">
              <b-input-group prepend="Cabang" class="mb-3">
                <b-form-select v-model="paging.cabang" :options="opt.cabang" />
              </b-input-group>
            </b-col>
            <b-col>
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
            <b-col>
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
            </b-col>
          </div>
        </b-col>
        <b-col cols="4" class="d-flex justify-content-end align-items-start">
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
            <template #cell(jangka_waktu)="item">
              {{ item.item.jangka_waktu }}
              {{ getPeriodJangkaWaktu(item.item.periode_jangka_waktu) }}
            </template>
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(margin)="item">
              Rp {{ thousand(item.item.margin) }}
            </template>
            <template #cell(pokok)="item">
              Rp {{ thousand(item.item.pokok) }}
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
      title="PREVIEW LAPORAN PENCAIRAN PEMBIAYAAN"
      id="modal-pdf"
      hide-footer
      size="xl"
      centered
    >
      <div id="table-print" class="p-5">
        <h5 class="text-center">
          KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )
        </h5>
        <h5 class="text-center">LAPORAN PENCAIRAN PEMBIAYAAN</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">
          Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}
        </h6>
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
          <template #cell(jangka_waktu)="item">
            {{ item.item.jangka_waktu }}
            {{ getPeriodJangkaWaktu(item.item.periode_jangka_waktu) }}
          </template>
          <template #cell(no)="item">
            {{ item.index + 1 }}
          </template>
          <template #cell(margin)="item">
            Rp {{ thousand(item.item.margin) }}
          </template>
          <template #cell(pokok)="item">
            Rp {{ thousand(item.item.pokok) }}
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
import helper from "@/core/helper";
import html2pdf from "html2pdf.js";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "LaporanRegistrasiAnggota",
  components: {},
  data() {
    return {
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
            key: "nama_cabang",
            sortable: true,
            label: "Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "tanggal_registrasi",
            sortable: true,
            label: "Tanggal",
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
            tdClass: "text-center",
          },
          {
            key: "no_rekening",
            sortable: true,
            label: "No Rek",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "nama_produk",
            sortable: true,
            label: "Produk",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "pokok",
            sortable: true,
            label: "Plafon",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "margin",
            sortable: true,
            label: "Margin",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "jangka_waktu",
            sortable: true,
            label: "Jk Waktu",
            thClass: "text-center",
            tdClass: "text-right",
          },
        ],
        items: [],
        loading: false,
        totalRows: 0,
      },
      report: {
        fields: [
          {
            key: "no",
            sortable: false,
            label: "No",
            thClass: "text-center w-5p",
            tdClass: "text-center",
          },
          {
            key: "nama_cabang",
            sortable: false,
            label: "Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "tanggal_registrasi",
            sortable: false,
            label: "Tanggal",
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
            tdClass: "text-center",
          },
          {
            key: "no_rekening",
            sortable: false,
            label: "No Rek",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "nama_produk",
            sortable: false,
            label: "Produk",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "pokok",
            sortable: false,
            label: "Plafon",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "margin",
            sortable: false,
            label: "Margin",
            thClass: "text-center",
            tdClass: "text-right",
          },
          {
            key: "jangka_waktu",
            sortable: false,
            label: "Jk Waktu",
            thClass: "text-center",
            tdClass: "text-right",
          },
        ],
        items: [],
        loading: false,
        totalRows: 0,
        cabang: null,
        from: null,
        to: null,
      },
      paging: {
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: "kop_pembiayaan.tanggal_registrasi",
        search: "",
        status_rekening: [1, 2, 3],
        status_droping: [1],
        cabang: null,
        from: null,
        to: null,
      },
      opt: {
        cabang: [],
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
    this.doGetReport();
  },
  methods: {
    ...helper,
    doPrintPdf() {
      let filename = "LAPORAN PENCAIRAN PEMBIAYAAN";
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
      let filename = "LAPORAN PENCAIRAN PEMBIAYAAN";
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
      let payload = `kode_cabang=${this.paging.cabang}&jenis_pembiayaan=9&kode_petugas=~&kode_rembug=~&produk=99&from_date=${this.paging.from}&thru_date=${this.paging.to}`;
      let req = await easycoApi.pencairanPembiayaanExcel(payload);
      console.log(req.data);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Pencairan_Pembiayaan.xls";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    async exportCsv() {
      let payload = `kode_cabang=${this.paging.cabang}&jenis_pembiayaan=9&kode_petugas=~&kode_rembug=~&produk=99&from_date=${this.paging.from}&thru_date=${this.paging.to}`;
      let req = await easycoApi.pencairanPembiayaanCsv(payload);
      console.log(req.data);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Pencairan_Pembiayaan.csv";
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
  