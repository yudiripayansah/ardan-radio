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
            <template #cell(no)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(jenis_cabang)="data">
              {{ getJenisCabang(data.item.jenis_cabang) }}
            </template>
            <template #cell(induk_cabang)="data">
              {{ getIndukCabang(data.item.induk_cabang) }}
            </template>
            <template #cell(action)="data">
              <b-button
                variant="danger"
                size="xs"
                class="mx-1"
                @click="doDelete(data.item, true)"
                v-b-tooltip.hover
                title="Hapus"
              >
                <b-icon icon="trash" />
              </b-button>
              <b-button
                variant="success"
                size="xs"
                class="mx-1"
                @click="doUpdate(data.item)"
                v-b-tooltip.hover
                title="Ubah"
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
    <b-modal title="Form Cabang" id="modal-form" hide-footer size="lg" centered>
      <b-form @submit="doSave">
        <b-row>
          <b-col cols="6">
            <b-form-group label="Kode Cabang" label-for="kode_cabang">
              <b-form-input
                id="kode_cabang"
                v-model="$v.form.data.kode_cabang.$model"
                :state="validateState('kode_cabang')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Nama Cabang" label-for="nama cabang">
              <b-form-input
                id="nama_cabang"
                v-model="$v.form.data.nama_cabang.$model"
                :state="validateState('nama_cabang')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Induk Cabang" label-for="induk_cabang">
              <b-form-select
                id="induk_cabang"
                :options="opt.induk_cabang"
                v-model="$v.form.data.induk_cabang.$model"
                :state="validateState('induk_cabang')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Jenis Cabang" label-for="jenis_cabang">
              <b-form-select
                id="jenis_cabang"
                :options="opt.jenis_cabang"
                v-model="$v.form.data.jenis_cabang.$model"
                :state="validateState('jenis_cabang')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Pimpinan Cabang" label-for="pimpinan_cabang">
              <b-form-input
                id="pimpinan_cabang"
                v-model="$v.form.data.pimpinan_cabang.$model"
                :state="validateState('pimpinan_cabang')"
              />
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "Cabang",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
          kode_cabang: null,
          nama_cabang: null,
          induk_cabang: 0,
          jenis_cabang: null,
          pimpinan_cabang: null,
          created_by: null,
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
            key: "kode_cabang",
            sortable: true,
            label: "Kode Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "nama_cabang",
            sortable: true,
            label: "Nama Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "induk_cabang",
            sortable: true,
            label: "Induk Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "jenis_cabang",
            sortable: true,
            label: "Jenis Cabang",
            thClass: "text-center",
            tdClass: "",
          },
          {
            key: "pimpinan_cabang",
            sortable: true,
            label: "Pimpinan Cabang",
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
      paging: {
        page: 1,
        perPage: 10,
        sortDesc: true,
        sortBy: "id",
        search: "",
      },
      remove: {
        data: Object,
        loading: false,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        role: ["admin", "user", "staff", "accounting"],
        cabang: ["cabang 1", "cabang 2", "cabang 3"],
        status: ["aktif", "non aktif"],
        jenis_cabang: [
          {
            value: 1,
            text: "Area",
          },
          {
            value: 2,
            text: "Cabang",
          },
          {
            value: 3,
            text: "Unit",
          },
        ],
        induk_cabang: [],
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
    validateState(name) {
      const { $dirty, $error } = this.$v.form.data[name];
      return $dirty ? !$error : null;
    },
    async doGetCabang() {
      let payload = { ...this.paging };
      payload.sortDir = payload.sortDesc ? "DESC" : "ASC";
      payload.perPage = "~";
      try {
        let req = await easycoApi.cabangRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          this.opt.induk_cabang = [
            {
              value: 0,
              text: "Induk",
            },
          ];
          data.map((item) => {
            this.opt.induk_cabang.push({
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
      this.table.loading = true;
      try {
        let req = await easycoApi.cabangRead(payload, this.user.token);
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
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.form.loading = true;
        try {
          let payload = this.form.data;
          payload.created_by = this.user.id;
          let req = false;
          if (payload.id) {
            req = await easycoApi.cabangUpdate(payload, this.user.token);
          } else {
            req = await easycoApi.cabangCreate(payload, this.user.token);
          }
          let { status } = req.data;
          if (status) {
            this.notify("success", "Success", "Data berhasil disimpan");
            this.doGet();
            this.doGetCabang();
            this.$bvModal.hide("modal-form");
          } else {
            this.notify("danger", "Error", "Data gagal disimpan");
          }
          this.form.loading = false;
        } catch (error) {
          this.notify("danger", "Error", error);
          this.form.loading = false;
        }
      } else {
        e.preventDefault();
      }
    },
    async doUpdate(item) {
      try {
        let req = await easycoApi.cabangDetail(
          `id=${item.id}`,
          this.user.token
        );
        let { data, status, msg } = req.data;
        if (status) {
          this.form.data = data;
          this.$bvModal.show("modal-form");
        }
      } catch (error) {
        console.log(error);
        this.notify("danger", "Error", "Gagal mengambil data");
      }
    },
    async doDelete(item, prompt) {
      if (prompt) {
        this.remove.data = item;
        this.$bvModal.show("modal-delete");
      } else {
        this.remove.loading = true;
        try {
          let req = await easycoApi.cabangDelete(
            `id=${this.remove.data.id}`,
            this.user.token
          );
          let { status } = req.data;
          if (status) {
            this.remove.loading = false;
            this.$bvModal.hide("modal-delete");
            this.notify("success", "Success", "Data berhasil dihapus");
            this.doGet();
            this.doGetCabang();
          } else {
            this.notify("danger", "Error", "Data gagal dihapus");
          }
        } catch (error) {
          this.notify("danger", "Error", error);
        }
      }
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
    this.doGet();
    this.doGetCabang();
  },
};
</script>
