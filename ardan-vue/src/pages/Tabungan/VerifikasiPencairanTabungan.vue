<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
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
      </b-row>
    </b-card>
    <div>
      <b-modal id="modal-form" centered title="Verifikasi Pencairan Tabungan">
        <p class="my-4">Silahkan Pilih Verifikasi Pencairan Tabungan Ini .</p>
        <template #modal-footer="{}">
          <b-form @submit="doSave">
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
              @click="doReject"
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
          </b-form>
        </template>
      </b-modal>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import easycoApi from "@/core/services/easyco.service";
import helper from "@/core/helper";
export default {
  name: "Cabang",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
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
            key: "nama_produk",
            sortable: true,
            label: "Produk",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "no_rekening",
            sortable: true,
            label: "No Rekening",
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
      remove: {
        data: Object,
        loading: false,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        cabang: [],
      },
    };
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
    async doGet() {
      let payload = {
        page: 1,
        perPage: 10,
        sortyDir: "ASC",
        sortBy: "tanggal_buka",
        search: null,
        status: 4,
        cabang: null,
        from_date: null,
        thru_date: null,
      };
      this.table.loading = true;
      try {
        let req = await easycoApi.getVerifikasiPencairan(
          payload,
          this.user.token
        );
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
    },
    async doSave(e) {
      this.form.loading = true;
      try {
        let payload = {
          id: this.form.data.id,
        };
        let req = await easycoApi.approveVerifikasiPencairan(
          payload,
          this.user.token
        );
        let { status } = req.data;
        if (status) {
          this.notify("success", "Success", "Data berhasil approve");
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
    async doReject(e) {
      this.form.loading = true;
      try {
        let payload = {
          id: this.form.data.id,
        };
        let req = await easycoApi.rejectVerifikasiPencairan(
          payload,
          this.user.token
        );
        let { status } = req.data;
        if (status) {
          this.notify("success", "Success", "Data berhasil direject");
          this.doGet();
          this.$bvModal.hide("modal-form");
        } else {
          this.notify("danger", "Error", "Data gagal direject");
        }
        this.form.loading = false;
      } catch (error) {
        this.notify("danger", "Error", error);
        this.form.loading = false;
      }
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
    async doGetDetil(item) {
      this.form.data.id = item.id;
      this.$bvModal.show("modal-form");
    },
  },
  mounted() {
    this.doGet();
  },
};
</script>
  