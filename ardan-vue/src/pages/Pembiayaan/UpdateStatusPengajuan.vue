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
            <b-col cols="6">
              <div class="w-100 max-200 pr-5">
                <b-input-group size="sm" prepend="Per Halaman">
                  <b-form-select
                    v-model="paging.perPage"
                    :options="opt.perPage"
                    @change="doGet()"
                  />
                </b-input-group>
              </div>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-end">
              <div class="w-100 max-300">
                <b-input-group size="sm">
                  <b-form-input v-model="paging.search" />
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      text="Button"
                      variant="primary"
                      @click="doGet()"
                    >
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
            responsive
            bordered
            outlined
            small
            striped
            hover
            :fields="table.fields"
            :items="table.items"
            :sort-by.sync="paging.sortBy"
            :sort-desc.sync="paging.sortDesc"
            show-empty
            :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'"
          >
            <template #cell(no)="item">
              {{ item.index + 1 }}
            </template>
            <template #cell(action)="item">
              <b-button
                variant="success"
                size="xs"
                class="mx-1"
                @click="doUpdate(item)"
                v-b-tooltip.hover
              >
                Update Status
              </b-button>
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
      title="Form Pengajuan Pembiayaan"
      id="modal-form"
      hide-footer
      size="lg"
      centered
    >
      <b-form @submit="doSave()">
        <b-row>
          <b-col cols="12" sm="6">
            <b-form-group label="Petugas">
              <b-select
                v-model="form.data.kode_petugas"
                :options="opt.petugas"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group label="No Anggota">
              <b-select
                v-model="form.data.no_anggota"
                :options="opt.anggota"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Nama Anggota">
              <b-input :value="anggota.nama_anggota" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="No Ktp">
              <b-input :value="anggota.no_ktp" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Rembug">
              <b-input :value="anggota.nama_rembug" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr />
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Pembiayaan Ke">
              <b-input v-model="form.data.pengajuan_ke" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Jumlah Pengajuan">
              <b-input v-model="form.data.jumlah_pengajuan" disabled />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Peruntukan">
              <b-select
                v-model="form.data.peruntukan"
                :options="opt.peruntukan"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12">
            <b-form-group label="Keterangan">
              <b-textarea
                v-model="form.data.keterangan_peruntukan"
                disabled
                rows="5"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="8">
            <b-form-group label="Rencana Jangka Waktu">
              <b-row>
                <b-col cols="4">
                  <b-input v-model="form.data.jangka_waktu" disabled />
                </b-col>
                <b-col cols="8">
                  <b-select
                    v-model="form.data.rencana_periode_jwaktu"
                    :options="opt.rencanaPeriodeJangkaWaktu"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Jenis Pembiayaan">
              <b-select
                v-model="form.data.jenis_pembiayaan"
                :options="opt.jenisPembiayaan"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Sumber Pengembalian">
              <b-select
                v-model="form.data.sumber_pengembalian"
                :options="opt.sumberPengembalian"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Tanggal Pengajuan">
              <b-form-datepicker
                v-model="form.data.tanggal_pengajuan"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                locale="id"
                @input="setTanggalCair()"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="4">
            <b-form-group label="Tanggal Pencairan">
              <b-form-datepicker
                v-model="form.data.rencana_droping"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                locale="id"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr />
          </b-col>
          <b-col cols="12" sm="12">
            <b-form-group label="Hasil Komite">
              <b-select
                v-model="form.data.status_pengajuan"
                :options="opt.status_pengajuan"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
            sm="12"
            class="d-flex justify-content-end border-top pt-5"
          >
            <b-button
              variant="secondary"
              @click="$bvModal.hide('modal-form')"
              :disabled="form.loading"
              >Cancel
            </b-button>
            <b-button
              variant="primary"
              type="submit"
              :disabled="form.loading"
              class="ml-3"
            >
              {{ form.loading ? "Memproses..." : "Simpan" }}
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
import helper from "@/core/helper";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "RegistrasiAkad",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
          no_anggota: null,
          kode_petugas: null,
          tanggal_pengajuan: null,
          jumlah_pengajuan: 0,
          pengajuan_ke: 0,
          peruntukan: null,
          keterangan_peruntukan: null,
          rencana_droping: null,
          jangka_waktu: null,
          rencana_periode_jwaktu: null,
          jenis_pembiayaan: null,
          sumber_pengembalian: null,
          doc_ktp: null,
          doc_kk: null,
          doc_pendukung: null,
          ttd_anggota: null,
          ttd_suami: null,
          ttd_ketua_majelis: null,
          ttd_tpl: null,
          created_by: null,
          status_pengajuan: null,
        },
        loading: false,
      },
      anggota: {
        nama_anggota: null,
        no_ktp: null,
        nama_rembug: null,
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
            key: "no_anggota",
            sortable: true,
            label: "No Anggota",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_anggota",
            sortable: true,
            label: "Nama Anggota",
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
            key: "nama_cabang",
            sortable: true,
            label: "Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_pengajuan",
            sortable: true,
            label: "No Pengajuan",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jumlah_pengajuan",
            sortable: true,
            label: "Jumlah Pengajuan",
            thClass: "text-center",
            tdClass: "text-right",
          },
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
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: "id",
        search: "",
        status: [0],
        jenis_pembiayaan: "~",
        petugas: "~",
        rembug: "~",
        produk: "~",
        from: null,
        to: null,
      },
      remove: {
        data: Object,
        loading: false,
      },
      opt: {
        perPage: [10, 20, 50, 100, 200],
        petugas: [],
        anggota: [],
        peruntukan: [],
        status_pengajuan: [
          {
            text: "Terima",
            value: "4",
          },
          {
            text: "Tolak",
            value: "2",
          },
        ],
        rencanaPeriodeJangkaWaktu: [
          {
            text: "Harian",
            value: "0",
          },
          {
            text: "Mingguan",
            value: "1",
          },
          {
            text: "Bulanan",
            value: "2",
          },
          {
            text: "Tempo",
            value: "3",
          },
        ],
        jenisPembiayaan: [
          {
            text: "Kelompok",
            value: "0",
          },
          {
            text: "Individu",
            value: "1",
          },
        ],
        sumberPengembalian: [
          {
            text: "Sumber Usaha",
            value: "0",
          },
          {
            text: "Non Usaha",
            value: "1",
          },
        ],
      },
      loading: false,
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
    form: {
      handler(val) {
        let noAnggota = val.data.no_anggota;
        if (noAnggota) {
          this.anggota = this.opt.anggota.find(
            (i) => i.value == noAnggota
          ).data;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.doGet();
    this.doGetPetugas();
    this.doGetAnggota();
    this.doGetPeruntukan();
  },
  methods: {
    ...helper,
    async doGetPetugas() {
      let payload = null;
      try {
        let req = await easycoApi.petugasRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.petugas = [];
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
    async doGetAnggota() {
      let payload = null;
      try {
        let req = await easycoApi.pengajuanAnggotaRead(
          payload,
          this.user.token
        );
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.anggota = [];
          data.map((item) => {
            this.opt.anggota.push({
              value: Number(item.no_anggota),
              text: item.nama_anggota,
              data: item,
            });
          });
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
    async doGetPeruntukan() {
      let payload = null;
      try {
        let req = await easycoApi.peruntukanRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.peruntukan = [];
          data.map((item) => {
            this.opt.peruntukan.push({
              value: item.kode_value,
              text: item.kode_display,
            });
          });
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
    async doGet() {
      let payload = this.paging;
      console.log(payload);
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      this.table.loading = true;
      try {
        let req = await easycoApi.pengajuanRead(payload, this.user.token);
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
    async doSave() {
      this.form.loading = true;
      try {
        let payload = this.form.data;
        payload.created_by = this.user.id;
        let req = false;
        req = await easycoApi.updateKomite(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.doGet();
          this.$bvModal.hide("modal-form");
          this.doClearForm();
          this.notify("success", "Success", msg);
        } else {
          this.notify("danger", "Error", msg);
        }
        this.form.loading = false;
      } catch (error) {
        this.form.loading = false;
        console.error(error);
        this.notify("danger", "Login Error", error);
      }
    },
    async doUpdate(data, setRembug) {
      let id = `?id=${data.item.id}`;
      try {
        let req = await easycoApi.pengajuanDetail(id, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.form.data = { ...data };
          this.$bvModal.show("modal-form");
        } else {
          this.notify("danger", "Error", msg);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doDelete(data, dialog) {
      if (dialog) {
        console.log("dialog:", data);
        this.$bvModal.show("modal-delete");
        this.remove.data = data.item;
      } else {
        console.log("on delete:", data);
        try {
          this.remove.loading = true;
          let req = await easycoApi.pengajuanDelete(
            `?id=${this.remove.data.id}`,
            this.user.token
          );
          let { data, status, msg } = req.data;
          if (status) {
            this.$bvModal.hide("modal-delete");
            this.doGet();
            this.remove.data = Object;
            this.notify("success", "Success", msg);
          } else {
            this.notify("danger", "Error", msg);
          }
          this.remove.loading = false;
        } catch (error) {
          console.log(error);
          this.notify("danger", "Error", error);
        }
      }
    },
    setTanggalCair() {
      var date = new Date(this.form.data.tanggal_pengajuan);
      this.form.data.rencana_droping = new Date(
        date.setDate(date.getDate() + 7)
      );
    },
    previewImage(event, target) {
      let theImg = null;
      let vm = this;
      const ttd_anggota = this.$refs["fm-ttd_anggota"];
      const ttd_ketua_majelis = this.$refs["fm-ttd_ketua_majelis"];
      const ttd_tpl = this.$refs["fm-ttd_tpl"];
      const ttd_suami = this.$refs["fm-ttd_suami"];
      const doc_ktp = this.$refs["fm-doc_ktp"];
      const doc_kk = this.$refs["fm-doc_kk"];
      const doc_pendukung = this.$refs["fm-doc_pendukung"];
      let reader = new FileReader();
      switch (target) {
        case "ttd_anggota":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.ttd_anggota = reader.result;
            ttd_anggota.type = "text";
            ttd_anggota.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.ttd_anggota = null;
            ttd_anggota.type = "text";
            ttd_anggota.type = "file";
          };
          break;
        case "ttd_ketua_majelis":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.ttd_ketua_majelis = reader.result;
            ttd_ketua_majelis.type = "text";
            ttd_ketua_majelis.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.ttd_ketua_majelis = null;
            ttd_ketua_majelis.type = "text";
            ttd_ketua_majelis.type = "file";
          };
          break;
        case "ttd_tpl":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.ttd_tpl = reader.result;
            ttd_tpl.type = "text";
            ttd_tpl.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.ttd_tpl = null;
            ttd_tpl.type = "text";
            ttd_tpl.type = "file";
          };
          break;
        case "ttd_suami":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.ttd_suami = reader.result;
            ttd_suami.type = "text";
            ttd_suami.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.ttd_suami = null;
            ttd_suami.type = "text";
            ttd_suami.type = "file";
          };
          break;
        case "doc_ktp":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.doc_ktp = reader.result;
            doc_ktp.type = "text";
            doc_ktp.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.doc_ktp = null;
            doc_ktp.type = "text";
            doc_ktp.type = "file";
          };
          break;
        case "doc_kk":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.doc_kk = reader.result;
            doc_kk.type = "text";
            doc_kk.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.doc_kk = null;
            doc_kk.type = "text";
            doc_kk.type = "file";
          };
          break;
        case "doc_pendukung":
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.doc_pendukung = reader.result;
            doc_pendukung.type = "text";
            doc_pendukung.type = "file";
          };
          reader.onerror = function () {
            vm.form.data.doc_pendukung = null;
            doc_pendukung.type = "text";
            doc_pendukung.type = "file";
          };
          break;
      }
    },
    doClearForm() {
      this.form.data = {
        id: null,
        no_anggota: null,
        kode_petugas: null,
        tanggal_pengajuan: null,
        jumlah_pengajuan: 0,
        pengajuan_ke: 0,
        peruntukan: null,
        keterangan_peruntukan: null,
        rencana_droping: null,
        jangka_waktu: null,
        rencana_periode_jwaktu: null,
        jenis_pembiayaan: null,
        sumber_pengembalian: null,
        doc_ktp: null,
        doc_kk: null,
        doc_pendukung: null,
        ttd_anggota: null,
        ttd_suami: null,
        ttd_ketua_majelis: null,
        ttd_tpl: null,
        created_by: null,
        status_pengajuan: null,
      };
      this.anggota = {
        nama_anggota: null,
        no_ktp: null,
        nama_rembug: null,
      };
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
  