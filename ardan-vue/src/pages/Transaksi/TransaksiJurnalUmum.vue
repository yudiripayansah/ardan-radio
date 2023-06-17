<template>
  <div>
    <h1 class="mb-5">{{ $route.name }}</h1>
    <b-card>
      <b-row no-gutters>
        <b-col>
          <b-form @submit="doSave">
            <b-row>
              <b-col cols="6">
                <b-form-group label="Cabang">
                  <b-select v-model="form.data.kode_cabang" :options="opt.cabang" :state="validateState('kode_cabang')"/>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="No Ref">
                  <b-input v-model="form.data.voucher_no" />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Tanggal">
                  <b-form-datepicker v-model="form.data.voucher_date" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id" :state="validateState('voucher_date')"/>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Keterangan">
                  <b-textarea v-model="form.data.description" :state="validateState('description')"/>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <table class="table table-bordered">
                  <thead class="thead-dark">
                    <tr>
                      <th>No</th>
                      <th width="25%">Akun</th>
                      <th width="25%">Deskripsi</th>
                      <th width="25%">Debet</th>
                      <th width="25%">Kredit</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(gl,glIndex) in form.data.detail" :key="`gl-${glIndex}`">
                      <td class="text-center">
                        {{ glIndex + 1 }}
                      </td>
                      <td>
                        <b-form-select v-model="gl.kode_gl" :options="opt.gl"/>
                      </td>
                      <td>
                        <b-form-input v-model="gl.description"/>
                      </td>
                      <td>
                        <b-input-group prepend="Rp ">
                          <vue-numeric class="form-control" separator="." v-model="gl.amount_debet" v-on:keyup.native="countTotal" :disabled="gl.amount_kredit > 0"/>
                        </b-input-group>
                      </td>
                      <td>
                        <b-input-group prepend="Rp ">
                          <vue-numeric class="form-control" separator="." v-model="gl.amount_kredit" v-on:keyup.native="countTotal" :disabled="gl.amount_debet > 0"/>
                        </b-input-group>
                      </td>
                      <td class="text-center">
                        <b-button
                          variant="danger"
                          size="xs"
                          class="mx-1"
                          @click="deleteItem(glIndex)"
                          v-b-tooltip.hover
                          title="Hapus"
                        >
                          <b-icon icon="trash" />
                        </b-button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right" colspan="3">Total:</td>
                      <td class="text-right">Rp {{ thousand(form.data.total_debet) }}</td>
                      <td class="text-right">Rp {{ thousand(form.data.total_kredit) }}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="6">
                        <b-button variant="success" block @click="addItem()">
                          Tambah <b-icon icon="plus"/>
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
              <b-col
                cols="12"
                class="d-flex justify-content-end border-top pt-5"
              >
                <b-button
                  variant="secondary"
                  @click="doClearForm()"
                  :disabled="form.loading"
                  >Batal
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
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import easycoApi from "@/core/services/easyco.service";
import helper from "@/core/helper"
export default {
  name: "TransaksiJurnalUmum",
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
          kode_cabang: null,
          voucher_date: null,
          voucher_no: null,
          no_referensi: null,
          description: null,
          created_by: null,
          detail: [
            {
              kode_gl: null,
              amount_kredit: 0,
              amount_debet: 0,
              description: null,
              flag_dc: null
            },
          ],
          total_debet: 0,
          total_kredit: 0,
        },
        loading: false,
      },
      opt: {
        perPage: [10, 25, 50, 100],
        gl: [],
        cabang: []
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
        voucher_date: {
          required,
        },
        description: {
          required,
        },
      },
    },
  },
  mounted() {
    this.doGetGl()
    this.doGetCabang()
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...helper,
    validateState(name) {
      const { $dirty, $error } = this.$v.form.data[name];
      return $dirty ? !$error : null;
    },
    async doGetCabang() {
      let payload = {
        perPage: '~',
        page: 1,
        sortBy: 'nama_cabang',
        sortDir: 'ASC',
        search: null
      }
      this.opt.cabang = []
      try {
        let req = await easycoApi.cabangRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          data.map((item) => {
            this.opt.cabang.push({
              text: item.nama_cabang,
              value: item.kode_cabang
            })
          })
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGetGl() {
      let payload = {
        perPage: '~',
        page: 1,
        sortBy: 'nama_gl',
        sortDir: 'ASC',
        search: null
      }
      this.opt.gl = []
      try {
        let req = await easycoApi.glRead(payload, this.user.token);
        let { data, status, msg, total } = req.data;
        if (status) {
          data.map((item) => {
            this.opt.gl.push({
              text: `${item.kode_gl} - ${item.nama_gl}`,
              value: item.kode_gl
            })
          })
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doSave(e) {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.form.loading = true;
        try {
          let payload = this.form.data;
          let error = 0
          payload.detail.map((item,index) => {
            if(item.amount_debet > 0){
              item.amount = item.amount_debet
              item.flag_dc = 'D'
            } else {
              item.amount = item.amount_kredit
              item.flag_dc = 'C'
            }
            if(!item.kode_gl) {
              error++
            }
          })
          if(error < 1){
            if(payload.total_debet > 0 || payload.total_kredit > 0){
              if(payload.total_debet == payload.total_kredit){
                payload.created_by = this.user.id;
                let req = await easycoApi.jurnalUmumCreate(payload, this.user.token);
                let { status } = req.data;
                if (status) {
                  this.notify("success", "Success", "Data berhasil disimpan");
                  this.doClearForm()
                } else {
                  this.notify("danger", "Error", "Data gagal disimpan");
                }
              } else {
                this.notify("danger", "Error", "Total Debet dan Kredit Belum seimbang");
              }
            } else {
              this.notify("danger", "Error", "Masukan minimal 1 jurnal");
            }
          } else {
            this.notify("danger", "Error", "Terdapat jurnal yang tidak memiliki data akun");
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
    addItem() {
      this.form.data.detail.push({
        kode_gl: null,
        amount_kredit: 0,
        amount_debet: 0,
        description: null,
        flag_dc: null
      })
    },
    deleteItem(idx) {
      if(this.form.data.detail.length > 1){
        this.form.data.detail.splice(idx,1)
      }
    },
    countTotal() {
      this.form.data.total_debet = 0
      this.form.data.total_kredit = 0
      this.form.data.detail.map((item) => {
        this.form.data.total_debet += item.amount_debet
        this.form.data.total_kredit += item.amount_kredit
      })
    },
    doClearForm() {
      this.form.data = {
        id: null,
        kode_cabang: null,
        voucher_date: null,
        voucher_no: null,
        no_referensi: null,
        description: null,
        created_by: null,
        detail: [
          {
            kode_gl: null,
            amount_kredit: 0,
            amount_debet: 0,
            description: null,
            flag_dc: null
          },
        ],
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
};
</script>
