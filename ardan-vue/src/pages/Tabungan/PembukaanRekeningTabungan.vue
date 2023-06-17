<template>
  <b-card :title="$route.name">
    <b-form class="border-top py-5" @submit.prevent="doSave()">
      <b-row class="m-0">
        <b-col sm="6" md="6">
          <b-form-group label="Pilih Majelis">
            <b-select
              :options="opt.rembug"
              v-model="form.data.kode_rembug"
              @change="doGetAnggota()"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="6">
          <b-form-group label="Pilih Anggota">
            <b-select
              v-model="form.data.no_anggota"
              :options="opt.anggota"
              @change="setProfile()"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="NIK Anggota">
            <b-form-input v-model="profil.nik" disabled />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="Nama Anggota">
            <b-form-input v-model="profil.nama_anggota" disabled />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="No Anggota">
            <b-form-input v-model="profil.no_anggota" disabled />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="Produk">
            <b-select
              v-model="form.data.kode_produk"
              :options="opt.produk"
              @change="setTabungan()"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="Jangka Waktu & Periode">
            <b-row>
              <b-col sm="3">
                <b-form-input v-model="form.data.jangka_waktu" />
              </b-col>
              <b-col sm="9" class="mt-3 mt-sm-0">
                <b-select v-model="form.data.periode" :options="opt.periode" />
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="Jumlah Setoran">
            <b-input-group prepend="Rp">
              <b-form-input v-model="form.data.setoran" />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="6" md="4">
          <b-form-group label="Mulai Setoran">
            <b-form-datepicker
              v-model="form.data.rencana_awal_setoran"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              locale="id"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" class="text-right border-top pt-5">
          <b-button variant="primary" :disabled="form.loading" type="submit">
            <b-spinner
              small
              label="Small Spinner"
              v-show="form.loading"
              class="mr-2"
            ></b-spinner>
            Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import axios from "@/core/plugins/axios";
import { mapGetters } from "vuex";
import easycoApi from "@/core/services/easyco.service";
export default {
  name: "PembukaanRekeningTabungan",
  components: {},
  data() {
    return {
      form: {
        data: {
          kode_rembug: null,
          no_anggota: null,
          kode_produk: null,
          setoran: 0,
          periode_setoran: null,
          jangka_waktu: null,
          rencana_awal_setoran: null,
          jenis_tabungan: null,
          created_by: null,
        },
      },
      opt: {
        periode: [
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
        ],
        rembug: [],
        produk: [],
        anggota: [],
        tabungan: [],
      },
      profil: {
        nik: null,
        nama_anggota: null,
        no_anggota: null,
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async doGetRembug() {
      let payload = {
        kode_cabang: this.user.kode_cabang,
      };
      try {
        let req = await easycoApi.anggotaRembug(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          this.opt.rembug = [];
          data.map((item) => {
            this.opt.rembug.push({
              value: item.kode_rembug,
              text: item.nama_rembug,
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async doGetAnggota() {
      this.opt.anggota = [];
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kode_rembug",
        sortDir: "ASC",
        search: "",
        rembug: this.form.data.kode_rembug,
      };
      try {
        let req = await easycoApi.anggotaRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
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
      } catch (error) {
        console.error(error);
        this.notify("danger", "Login Error", error);
      }
    },
    async doGetProduk() {
      let payload = {
        perPage: "~",
        page: 1,
        sortBy: "kode_produk",
        sortDir: "ASC",
        search: "",
      };
      try {
        let req = await easycoApi.prdtabunganRead(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
          data.map((item) => {
            this.opt.produk.push({
              value: item.kode_produk,
              text: item.nama_produk,
              data: item,
            });
          });
        } else {
          this.notify("danger", "Error", msg);
        }
      } catch (error) {
        console.error(error);
        this.notify("danger", "Login Error", error);
      }
    },
    setProfile() {
      let profil = this.opt.anggota.find(
        (item) => item.data.no_anggota == this.form.data.no_anggota
      ).data;
      this.profil = {
        nama_anggota: profil.nama_anggota,
        nik: profil.no_ktp,
        nama_anggota: profil.nama_anggota,
        no_anggota: profil.no_anggota,
      };
      console.log(profil);
    },
    setTabungan() {
      let produk = this.opt.produk.find(
        (item) => item.value == this.form.data.kode_produk
      ).data;
      this.form.data.jenis_tabungan = produk.jenis_tabungan;
      this.form.data.created_by = this.user.kode_petugas;
      console.log(produk);
    },
    async doSave() {
      this.form.loading = true;
      try {
        let payload = this.form.data;
        payload.created_by = this.user.id;
        let req = false;
        req = await easycoApi.registrasiTabungan(payload, this.user.token);
        let { data, status, msg } = req.data;
        if (status) {
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
    doClearForm() {
      this.form.data = {
        kode_rembug: null,
        no_anggota: null,
        kode_produk: null,
        setoran: null,
        periode_setoran: null,
        jangka_waktu: null,
        rencana_awal_setoran: null,
        jenis_tabungan: null,
        created_by: null,
      };
      this.profil = {
        nik: null,
        nama_anggota: null,
        no_anggota: null,
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
  mounted() {
    this.doGetRembug();
    this.doGetAnggota();
    this.doGetProduk();
  },
};
</script>
