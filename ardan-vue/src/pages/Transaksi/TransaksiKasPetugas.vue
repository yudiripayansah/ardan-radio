<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col
          cols="12"
          class="d-flex justify-content-end mb-5 pb-5 border-bottom"
        >
          <b-button
            variant="success"
            @click="
              $bvModal.show('modal-form');
              doClearForm();
            "
            v-b-tooltip.hover
            title="Tambah Data Baru"
          >
            <b-icon icon="plus" />
            Tambah Baru
          </b-button>
        </b-col>
        <b-col cols="12" class="mb-5">
          <b-row no-gutters>
            <b-col cols="8" class="mb-5">
              <div class="row">
                <b-col cols="6">
                  <b-input-group prepend="Cabang" class="mb-3">
                    <b-form-select
                      v-model="paging.cabang"
                      :options="opt.cabang"
                    />
                  </b-input-group>
                </b-col>
                <b-col cols="6">
                  <b-input-group prepend="Petugas" class="mb-3">
                    <b-form-select
                      v-model="paging.petugas"
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
            <template #cell(action)="item">
              <b-button
                variant="success"
                size="xs"
                class="mx-1"
                @click="doUpdate(item)"
                v-b-tooltip.hover
                title="Edit"
              >
                <b-icon icon="pencil" />
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
      title="Form Transaksi Kas Petugas"
      id="modal-form"
      hide-footer
      size="lg"
      centered
    >
      <b-form @submit="doSave()">
        <b-row>
          <b-col cols="4">
            <b-form-group label="cabang">
              <b-select v-model="form.data.cabang" :options="opt.cabang" />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Petugas">
              <b-select
                v-model="form.data.kode_kas_petugas"
                :options="opt.petugas"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Tanggal">
              <b-form-datepicker v-model="form.data.voucher_date" />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Kas Teller">
              <b-select
                v-model="form.data.kode_kas_teller"
                :options="opt.kas_teller"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Jenis Transaksi">
              <b-select
                v-model="form.data.jenis_trx"
                :options="opt.jenis_transaksi"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Jumlah">
              <b-input v-model="form.data.jumlah_trx" />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="No. Referensi">
              <b-input v-model="form.data.voucher_ref" />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Keterangan">
              <b-textarea v-model="form.data.keterangan" />
            </b-form-group>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-end border-top pt-5">
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
import { validationMixin } from "vuelidate";
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
import helper from "@/core/helper";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "transaksi_kas_petugas",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
          cabang: null,
          kode_kas_petugas: null,
          voucher_date: null,
          kode_kas_teller: null,
          jenis_trx: null,
          jumlah_trx: null,
          voucher_ref: null,
          keterangan: null,
        },
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
            key: "tanggal",
            sortable: true,
            label: "Tanggal",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama",
            sortable: true,
            label: "Nama",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jenis_transaksi",
            sortable: true,
            label: "Jenis Trx",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_rek",
            sortable: true,
            label: "Nomer Rek",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jumlah",
            sortable: true,
            label: "Jumlah",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "keterangan",
            sortable: true,
            label: "keterangan",
            thClass: "text-center",
            tdClass: "",
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
      },
      paging: {
        page: 1,
        perPage: 10,
      },
      remove: {
        data: {},
        loading: false,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        role: ["admin", "user", "staff", "accounting"],
        cabang: [],
        petugas: [],
        kas_teller: [],
        jenis_transaksi: [
          {
            text: "Modal Awal",
            value: "1",
          },
          {
            text: "Setor Kas",
            value: "4",
          },
        ],
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      data: {
        cabang: {
          required,
        },
        kode_kas_petugas: {
          required,
        },
        voucher_date: {
          required,
        },
        kode_kas_teller: {
          required,
        },
        jenis_trx: {
          required,
        },
        jumlah_trx: {
          required,
        },
        voucher_ref: {
          required,
        },
        keterangan: {
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
  mounted() {
    this.doGet();
    this.doGetCabang();
    this.doGetPetugas();
    this.doGetKasTeller();
  },
  methods: {
    ...helper,
    validateState(name) {
      const { $dirty, $error } = this.$v.form.data[name];
      return $dirty ? !$error : null;
    },
    async doGet() {
      this.table.loading = true;
      setTimeout(() => {
        this.table.loading = false;
        this.table.items = [
          {
            tanggal: "01-12-20",
            nama: "Siti Amaninah",
            jenis_transaksi: "Modal Awal",
            no_rek: "201.0010001",
            jumlah: "2.0000.0000",
            keterangan: "MBA",
          },
        ];
        this.doInfo("Data berhasil diambil", "Berhasil", "success");
      }, 5000);
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
          this.opt.cabang = [];
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
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kode_kas_petugas",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.getKasPetugas(payload, this.user.token);
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
    // mengambil data dari kas petugas dikarenakan kas teller belum di buat dari backend
    async doGetKasTeller() {
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kode_kas_petugas",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.getKasPetugas(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.kas_teler = [];
          data.map((item) => {
            this.opt.kas_teller.push({
              value: item.kode_kas_petugas,
              text: item.nama_kas_petugas,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doSave() {
      this.form.loading = true;
      try {
        let payload = this.form.data;
        payload.created_by = this.user.id;
        let req = false;
        req = await easycoApi.trxKasPetugas(payload, this.user.token);
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
    async doUpdate(item) {
      console.log(item);
      this.form.data = { ...item.item };
      this.$bvModal.show("modal-form");
    },
    async doDelete(item, prompt) {
      if (prompt) {
        this.remove.data = item;
        this.$bvModal.show("modal-delete");
      } else {
        this.remove.loading = true;
        setTimeout(() => {
          this.remove.loading = false;
          this.$bvModal.hide("modal-delete");
          this.doInfo("Data berhasil dihapus", "Berhasil", "success");
        }, 5000);
      }
    },
    doClearForm() {
      this.form.data = {
        id: null,
        cabang: null,
        kode_kas_petugas: null,
        voucher_date: null,
        kode_kas_teller: null,
        jenis_trx: null,
        jumlah_trx: null,
        voucher_ref: null,
        keterangan: null,
      };
      this.$v.form.$reset();
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
  