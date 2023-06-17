<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="8" class="mb-5">
          <div class="row">
            <b-col cols="12">
              <b-input-group prepend="Petugas" class="mb-3">
                <b-form-select
                  v-model="paging.kode_kas_petugas"
                  :options="opt.petugas"
                />
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="Dari Tanggal">
                <b-form-datepicker v-model="paging.from" />
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="Sampai Tanggal">
                <b-form-datepicker v-model="paging.to" />
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
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(debit)="item">
              {{ item.item.debit_credit == "C" ? item.item.jumlah_trx : 0 }}
            </template>
            <template #cell(kredit)="item">
              {{ item.item.debit_credit == "D" ? item.item.jumlah_trx : 0 }}
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
      title="PREVIEW LAPORAN TRANSAKSI KAS PETUGAS"
      id="modal-pdf"
      hide-footer
      size="xl"
      centered
    >
      <div id="table-print" class="p-5">
        <h5 class="text-center">
          KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )
        </h5>
        <h5 class="text-center">LAPORAN TRANSAKSI KAS PETUGAS</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">
          Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}
        </h6>
        <table class="table table-bordered table-striped">
          <thead>
            <tr class="text-center">
              <th>No</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Debit</th>
              <th>Kredit</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody v-if="report.items.length > 0">
            <tr
              v-for="(report, reportIndex) in report.items"
              :key="`report-${reportIndex}`"
            >
              <td>{{ reportIndex + 1 }}</td>
              <td>{{ report.trx_date }}</td>
              <td>{{ report.keterangan }}</td>
              <td>{{ report.debit_credit == "C" ? report.jumlah_trx : 0 }}</td>
              <td>{{ report.debit_credit == "D" ? report.jumlah_trx : 0 }}</td>
              <td>{{ report.saldo }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="text-center">
              <td colspan="12">There's no data to display...</td>
            </tr>
          </tbody>
        </table>
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
  name: "LaporanSaldoAnggota",
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
            key: "trx_date",
            sortable: false,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "keterangan",
            sortable: false,
            label: "Keterangan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "debit",
            sortable: false,
            label: "Debit",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "kredit",
            sortable: false,
            label: "Kredit",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "saldo",
            sortable: false,
            label: "Saldo",
            thClass: "text-center",
            tdClass: "",
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
            key: "tanggal",
            sortable: false,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "keterangan",
            sortable: false,
            label: "Keterangan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "debit",
            sortable: false,
            label: "Debit",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "kredit",
            sortable: false,
            label: "Kredit",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "saldo",
            sortable: false,
            label: "Saldo",
            thClass: "text-center",
            tdClass: "",
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
        sortBy: "voucher_date",
        search: "",
        status: "~",
        kode_kas_petugas: 0,
        from: null,
        to: null,
      },
      opt: {
        petugas: [],
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
    // this.doGet()
    this.doGetPetugas();
  },
  methods: {
    ...helper,
    doPrintPdf() {
      let filename = "LAPORAN TRANSAKSI KAS PETUGAS";
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
      let filename = "LAPORAN TRANSAKSI KAS PETUGAS";
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
      let payload = `kode_kas_petugas=${this.paging.kode_kas_petugas}&from_date=${this.paging.from}&thru_date=${this.paging.to}`;
      let req = await easycoApi.kasPetugasExcel(payload);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Transaksi_Kas_Petugas.xls";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    async exportCsv() {
      let payload = `kode_kas_petugas=${this.paging.kode_kas_petugas}&from_date=${this.paging.from}&thru_date=${this.paging.to}`;
      let req = await easycoApi.kasPetugasCsv(payload);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Transaksi_Kas_Petugas.csv";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    async doGetPetugas() {
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kode_kas_petugas",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.kodeKasPetugas(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.petugas = [];
          data.map((item) => {
            this.opt.petugas.push({
              value: item.kode_kas_petugas,
              text: item.nama_kas_petugas,
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
        let req = await easycoApi.getTrxKasPetugas(payload, this.user.token);
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
        this.notify("danger", "Error", error);
      }
    },
    async doGetReport() {
      let payload = this.paging;
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      payload.perPage = "~";
      this.report.loading = true;
      this.report.from = payload.from;
      this.report.to = payload.to;
      try {
        let req = await easycoApi.getTrxKasPetugas(payload, this.user.token);
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
};
</script>
