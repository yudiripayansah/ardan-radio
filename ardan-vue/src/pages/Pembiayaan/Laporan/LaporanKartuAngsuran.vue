<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col cols="8" class="mb-5">
          <div class="row">
            <b-col>
              <b-input-group prepend="No Rekening">
                <b-form-select
                  v-model="paging.no_rekening"
                  :options="opt.no_rekening"
                />
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="Plafon">
                <b-form-input v-model="paging.plafon" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="Nama">
                <b-form-input v-model="paging.nama" />
              </b-input-group>
            </b-col>
            <b-col
              ><br />
              <b-input-group prepend="Margin">
                <b-form-input v-model="paging.margin" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="Majelis">
                <b-form-input v-model="paging.majelis" />
              </b-input-group>
            </b-col>
            <b-col
              ><br />
              <b-input-group prepend="JK Waktu">
                <b-form-input v-model="paging.jk_waktu" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="Desa">
                <b-form-input v-model="paging.desa" />
              </b-input-group>
            </b-col>
            <b-col
              ><br />
              <b-input-group prepend="Angs Pokok">
                <b-form-input v-model="paging.angs_pokok" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="produk">
                <b-form-input v-model="paging.produk" />
              </b-input-group>
            </b-col>
            <b-col
              ><br />
              <b-input-group prepend="Angs Margin">
                <b-form-input v-model="paging.angs_margin" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="Tanggal">
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
            <b-col
              ><br />
              <b-input-group prepend="Total Angs">
                <b-form-input v-model="paging.plafon" />
              </b-input-group>
            </b-col>
          </div>
          <div class="row">
            <b-col
              ><br />
              <b-input-group prepend="Mulai Angs">
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
          </div>
        </b-col>
        <b-col cols="4" class="d-flex justify-content-end align-items-start">
          <b-button-group>
            <b-button
              text="Button"
              variant="danger"
              @click="$bvModal.show('modal-pdf')"
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
    <!-- <b-modal title="PREVIEW LAPORAN REGISTRASI ANGGOTA" id="modal-pdf" hide-footer size="xl" centered>
      <div id="table-print" class="p-5">
        <h5 class="text-center">KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )</h5>
        <h5 class="text-center">LAPORAN REGISTRASI ANGGOTA</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}</h6>
        <b-table responsive bordered outlined small striped hover :fields="report.fields" :items="report.items"
          show-empty :emptyText="report.loading ? 'Memuat data...' : 'Tidak ada data'" class="mt-5 pt-5 d-block">
          <template #cell(no)="item">
            {{ item.index + 1 }}
          </template>
        </b-table>
      </div>
      <b-row>
        <b-col cols="12" sm="12" class="d-flex justify-content-end border-top pt-5">
          <b-button variant="secondary" @click="$bvModal.hide('modal-pdf')">Cancel
          </b-button>
          <b-button variant="danger" type="button" class="ml-3" @click="doPrintPdf()">
            Simpan PDF
          </b-button>
        </b-col>
      </b-row>
    </b-modal> -->
    <b-modal
      title="PREVIEW LAPORAN KARTU ANGSURAN"
      id="modal-pdf"
      hide-footer
      size="xl"
      centered
    >
      <div id="table-print" class="p-5">
        <h5 class="text-center">
          KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )
        </h5>
        <h5 class="text-center">LAPORAN KARTU ANGSURAN</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">
          Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}
        </h6>
        <table class="table table-bordered table-striped">
          <thead>
            <tr class="text-center">
              <th rowspan="2">No</th>
              <th colspan="2">Tanggal</th>
              <th colspan="2">Angsuran</th>
              <th colspan="2">Angsuran</th>
              <th colspan="2">Valid</th>
            </tr>
            <tr class="text-center">
              <th>Angsur</th>
              <th>Bayar</th>
              <th>Ke</th>
              <th>Jumlah</th>
              <th>Pokok</th>
              <th>Margin</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="report.items.length > 0">
            <tr
              v-for="(report, reportIndex) in report.items"
              :key="`report-${reportIndex}`"
            >
              <td>{{ reportIndex + 1 }}</td>
              <td>{{ report.tanggal }}</td>
              <td>{{ report.no_trans }}</td>
              <td>{{ report.keterangan }}</td>
              <td>{{ report.no_akun }}</td>
              <td>{{ report.debit }}</td>
              <td>{{ report.kredit }}</td>
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
            key: "tanggal",
            sortable: true,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_trans",
            sortable: true,
            label: "No Transaksi",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "keterangan",
            sortable: true,
            label: "Keterangan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_akun",
            sortable: true,
            label: "No Akun",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "debit",
            sortable: true,
            label: "Debit",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "kredit",
            sortable: true,
            label: "kredit",
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
            key: "no_trans",
            sortable: false,
            label: "No Trans",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "keterangan",
            sortable: false,
            label: "keterangan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_akun",
            sortable: false,
            label: "No Akun",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_telp",
            sortable: false,
            label: "No Telp",
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
            label: "kredit",
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
        sortBy: "kop_pembiayaan.tanggal_registrasi",
        search: "",
        status: "~",
        cabang: "",
        from: null,
        to: null,
      },
      opt: {
        cabang: [],
        no_rekening: [],
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
    // this.doGet();
    this.doGetCabang();
    this.doGetNorek();
  },
  methods: {
    ...helper,
    doPrintPdf() {
      let filename = "LAPORAN KARTU ANGSURAN";
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
      let filename = "LAPORAN KARTU ANGSURAN";
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
      let payload = `no_rekening=${this.paging.no_rekening}`;
      let req = await easycoApi.kartuAngsuranExcel(payload);
      console.log(req.data);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Kartu_Angsuran.xls";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    async exportCsv() {
      let payload = `no_rekening=${this.paging.no_rekening}`;
      let req = await easycoApi.kartuAngsuranCsv(payload);
      const url = window.URL.createObjectURL(new Blob([req.data]));
      const link = document.createElement("a");
      let fileName = "Kartu_Angsuran.csv";
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
    async doGetNorek() {
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kop_pembiayaan.no_rekening",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.regisAkadRead(payload, this.user.token);
        console.log(req);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.no_rekening = [];
          data.map((item) => {
            this.opt.no_rekening.push({
              value: item.no_rekening,
              text: item.no_rekening,
              data: item,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
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
              value: 0,
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
      this.report.cabang = this.getCabangName(payload.cabang);
      try {
        let req = await easycoApi.anggotaRead(payload, this.user.token);
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
