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
                <b-col cols="6">
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
                </b-col>
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
                <b-button text="Button" variant="success"> XLS </b-button>
                <b-button text="Button" variant="warning"> CSV </b-button>
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
      title="PREVIEW LAPORAN TRANSAKSI REMBUG"
      id="modal-pdf"
      hide-footer
      size="xl"
      centered
    >
      <div id="table-print" class="p-5">
        <h5 class="text-center">
          KSPPS MITRA SEJAHTERA RAYA INDONESIA ( MSI )
        </h5>
        <h5 class="text-center">LAPORAN TRANSAKSI REMBUG</h5>
        <h5 class="text-center" v-show="report.cabang">{{ report.cabang }}</h5>
        <h6 class="text-center mb-5 pb-5" v-show="report.from && report.to">
          Tanggal {{ dateFormatId(report.from) }} s.d
          {{ dateFormatId(report.to) }}
        </h6>
        <b-row class="mt-5 mb-3">
          <b-col cols="6"> Petugas: Nama Petugas </b-col>
          <b-col cols="6"> Tanggal: Tanggal </b-col>
          <b-col cols="6"> Rembug: Nama Rembug </b-col>
        </b-row>
        <table
          role="table"
          aria-busy="false"
          aria-colcount="6"
          class="table b-table table-striped table-bordered table-sm border"
          id="__BVID__218"
        >
          <!----><!---->
          <thead role="rowgroup" class="">
            <!---->
            <tr role="row" class="">
              <th class="text-center" rowspan="2">
                <div>No Anggota</div>
              </th>
              <th class="text-center" rowspan="2">
                <div>Nama</div>
              </th>
              <th class="text-center" colspan="5">
                <div>Setoran</div>
              </th>
              <th class="text-center" rowspan="2">
                <div>Penarikan Sukarela</div>
              </th>
              <th class="text-center" colspan="5">
                <div>Pencairan</div>
              </th>
            </tr>
            <tr>
              <th class="text-center">
                <div>Angs.Pkk</div>
              </th>
              <th class="text-center">
                <div>Angs.Mgn</div>
              </th>
              <th class="text-center">
                <div>Simwa</div>
              </th>
              <th class="text-center">
                <div>Taber</div>
              </th>
              <th class="text-center">
                <div>Sukarela</div>
              </th>
              <th class="text-center">
                <div>Plafon</div>
              </th>
              <th class="text-center">
                <div>By Admin</div>
              </th>
              <th class="text-center">
                <div>Asuransi</div>
              </th>
              <th class="text-center">
                <div>Tab 4%</div>
              </th>
              <th class="text-center">
                <div>Kebajikan</div>
              </th>
            </tr>
          </thead>

          <tbody role="rowgroup">
            <!---->
            <tr v-for="(dt, dtIndex) in report.items" :key="`dt-${dtIndex}`">
              <td class="">
                <div>{{ dt.no_anggota }}</div>
              </td>
              <td class="">
                <div>{{ dt.nama }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.angs_pokok) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.angs_margin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.simwa) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.taber) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.sukarela) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.penarikan) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.plafon) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.by_admin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.asuransi) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.tab4) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.kebajikan) }}</div>
              </td>
            </tr>
            <!---->
            <tr>
              <td colspan="2" class="text-right">
                <div><b>Total</b></div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.angs_pokok) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.angs_margin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.simwa) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.taber) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.sukarela) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.penarikan) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.plafon) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.by_admin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.asuransi) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.tab4) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.kebajikan) }}</div>
              </td>
            </tr>
          </tbody>
          <!---->
        </table>
        <b-row class="mt-5 mb-3">
          <b-col cols="6"> Petugas: Nama Petugas </b-col>
          <b-col cols="6"> Tanggal: Tanggal </b-col>
          <b-col cols="6"> Rembug: Nama Rembug </b-col>
        </b-row>
        <table
          role="table"
          aria-busy="false"
          aria-colcount="6"
          class="table b-table table-striped table-bordered table-sm border"
          id="__BVID__218"
        >
          <!----><!---->
          <thead role="rowgroup" class="">
            <!---->
            <tr role="row" class="">
              <th class="text-center" rowspan="2">
                <div>No Anggota</div>
              </th>
              <th class="text-center" rowspan="2">
                <div>Nama</div>
              </th>
              <th class="text-center" colspan="5">
                <div>Setoran</div>
              </th>
              <th class="text-center" rowspan="2">
                <div>Penarikan Sukarela</div>
              </th>
              <th class="text-center" colspan="5">
                <div>Pencairan</div>
              </th>
            </tr>
            <tr>
              <th class="text-center">
                <div>Angs.Pkk</div>
              </th>
              <th class="text-center">
                <div>Angs.Mgn</div>
              </th>
              <th class="text-center">
                <div>Simwa</div>
              </th>
              <th class="text-center">
                <div>Taber</div>
              </th>
              <th class="text-center">
                <div>Sukarela</div>
              </th>
              <th class="text-center">
                <div>Plafon</div>
              </th>
              <th class="text-center">
                <div>By Admin</div>
              </th>
              <th class="text-center">
                <div>Asuransi</div>
              </th>
              <th class="text-center">
                <div>Tab 4%</div>
              </th>
              <th class="text-center">
                <div>Kebajikan</div>
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <!---->
            <tr v-for="(dt, dtIndex) in report.items" :key="`dt-${dtIndex}`">
              <td class="">
                <div>{{ dt.no_anggota }}</div>
              </td>
              <td class="">
                <div>{{ dt.nama }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.angs_pokok) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.angs_margin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.simwa) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.taber) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.sukarela) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.penarikan) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.plafon) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.by_admin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.asuransi) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.tab4) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(dt.kebajikan) }}</div>
              </td>
            </tr>
            <!---->
            <tr>
              <td colspan="2" class="text-right">
                <div><b>Total</b></div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.angs_pokok) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.angs_margin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.simwa) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.taber) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.sukarela) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.penarikan) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.plafon) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.by_admin) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.asuransi) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.tab4) }}</div>
              </td>
              <td class="text-right">
                <div>Rp {{ thousand(report.total.kebajikan) }}</div>
              </td>
            </tr>
          </tbody>
          <!---->
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
import html2pdf from "html2pdf.js";
import helper from "@/core/helper";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "LaporanTRANSAKSIREMBUG",
  components: {},
  data() {
    return {
      table: {
        fields: [
          {
            key: "tanggal",
            sortable: true,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_transaksi",
            sortable: true,
            label: "No Transaksi",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "majelis",
            sortable: true,
            label: "Majelis",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "setoran",
            sortable: true,
            label: "Setoran",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "penarikan",
            sortable: true,
            label: "Penarikan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "pencairan",
            sortable: true,
            label: "Pencairan",
            thClass: "text-center",
            tdClass: "",
          },
        ],
        items: [],
        loading: false,
      },
      report: {
        fields: [
          {
            key: "tanggal",
            sortable: false,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_transaksi",
            sortable: false,
            label: "No Transaksi",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "majelis",
            sortable: false,
            label: "Majelis",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "setoran",
            sortable: false,
            label: "Setoran",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "penarikan",
            sortable: false,
            label: "Penarikan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "pencairan",
            sortable: false,
            label: "Pencairan",
            thClass: "text-center",
            tdClass: "",
          },
        ],
        items: [
          {
            no_anggota: 1010100001,
            nama: "Aliyah",
            angs_pokok: 40000,
            angs_margin: 12000,
            simwa: 2000,
            taber: 20000,
            sukarela: 10000,
            penarikan: 200000,
            plafon: 4000000,
            by_admin: 10000,
            asuransi: 20000,
            tab4: 160000,
            kebajikan: 40000,
          },
          {
            no_anggota: 1010100001,
            nama: "Nayla",
            angs_pokok: 40000,
            angs_margin: 12000,
            simwa: 2000,
            taber: 20000,
            sukarela: 10000,
            penarikan: 200000,
            plafon: 4000000,
            by_admin: 10000,
            asuransi: 20000,
            tab4: 160000,
            kebajikan: 40000,
          },
          {
            no_anggota: 1010100001,
            nama: "Dina",
            angs_pokok: 40000,
            angs_margin: 12000,
            simwa: 2000,
            taber: 20000,
            sukarela: 10000,
            penarikan: 200000,
            plafon: 4000000,
            by_admin: 10000,
            asuransi: 20000,
            tab4: 160000,
            kebajikan: 40000,
          },
        ],
        total: {
          angs_pokok: 0,
          angs_margin: 0,
          simwa: 0,
          taber: 0,
          sukarela: 0,
          penarikan: 0,
          plafon: 0,
          by_admin: 0,
          asuransi: 0,
          tab4: 0,
          kebajikan: 0,
        },
        loading: false,
        cabang: 0,
        petugas: 0,
        rembug: 0,
      },
      paging: {
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: "kop_trx_rembug.trx_date",
        search: "",
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
      let filename = "LAPORAN TRANSAKSI REMBUG";
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
      let filename = "LAPORAN TRANSAKSI REMBUG";
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
        let req = await easycoApi.transaksiRembug(payload, this.user.token);
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
      this.report.items.map((i) => {
        console.log(i);
        this.report.total.angs_pokok =
          this.report.total.angs_pokok + i.angs_pokok;
        this.report.total.angs_margin =
          this.report.total.angs_margin + i.angs_margin;
        this.report.total.simwa = this.report.total.simwa + i.simwa;
        this.report.total.taber = this.report.total.taber + i.taber;
        this.report.total.sukarela = this.report.total.sukarela + i.sukarela;
        this.report.total.penarikan = this.report.total.penarikan + i.penarikan;
        this.report.total.plafon = this.report.total.plafon + i.plafon;
        this.report.total.by_admin = this.report.total.by_admin + i.by_admin;
        this.report.total.asuransi = this.report.total.asuransi + i.asuransi;
        this.report.total.tab4 = this.report.total.tab4 + i.tab4;
        this.report.total.kebajikan = this.report.total.kebajikan + i.kebajikan;
      });
      let payload = this.paging;
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      payload.perPage = "~";
      this.report.loading = true;
      this.report.from = payload.from;
      this.report.to = payload.to;
      this.report.cabang = this.getCabangName(payload.cabang);
      try {
        let req = await easycoApi.transaksiRembug(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          // this.report.items = data
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
    