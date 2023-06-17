<template>
<div class="d-flex flex-column flex-root">
  <div class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid login-signin-on" style="background-color: #006165;" id="kt_login">
    <!--begin::Aside-->
    <div class="login-aside d-flex flex-column flex-row-auto w-100" style="background-color: #fff;">
      <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
        <a href="#" class="text-center mb-10">
          <img src="media/logos/logo-dark.png" class="max-h-70px" alt="" />
        </a>
        <h3 class="font-weight-bolder text-center font-size-h4 font-size-h1-lg" style="color: #154734;">
          EASYCO <br> By KOPIKODING
        </h3>
      </div>
      <div class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    </div>
    <!--begin::Aside-->
    <!--begin::Content-->
    <div class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
      <div class="d-flex flex-column-fluid flex-center">
        <!--begin::Signin-->
        <div class="login-form login-signin">
          <form class="form w-100" novalidate="novalidate" id="kt_login_signin_form" @submit.prevent="doLogin()">
            <div class="pb-13 pt-lg-0 pt-5">
              <h3 class="font-weight-bolder text-light font-size-h4 font-size-h1-lg">
                Welcome to EASYCO
              </h3>
            </div>
            <div class="form-group">
              <label class="font-size-h6 font-weight-bolder text-light">Username</label>
              <div id="example-input-group-1" label="" label-for="example-input-1">
                <input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="text" name="nama_user" ref="nama_user" v-model="form.nama_user" />
              </div>
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between mt-n5">
                <label class="font-size-h6 font-weight-bolder text-light pt-5">Password</label>
              </div>
              <div id="example-input-group-2" label="" label-for="example-input-2">
                <input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="password" name="password" ref="password" v-model="form.password" autocomplete="off" />
              </div>
            </div>
            <div class="pb-lg-0 pb-5">
              <b-button type="submit" ref="kt_login_signin_submit" variant="light" class="font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3" :class="(loading) ? 'spinner spinner-dark spinner-right' : null" :disabled="loading">
                Sign In
              </b-button>
            </div>
          </form>
        </div>
        <!--end::Signin-->
      </div>
      <!--begin::Content footer-->
      <div class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0">
        <!-- <a href="#" class="text-primary font-weight-bolder font-size-h5">Terms</a>
        <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5">Plans</a>
        <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5">Contact Us</a> -->
      </div>
      <!--end::Content footer-->
    </div>
    <!--end::Content-->
  </div>
</div>
</template>

<!-- Load login custom page styles -->

<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
// email superadmin@hseswadaya.co.id
// password admin123labpcr
import easycoApi from '@/core/services/easyco.service'
import {
  mapGetters,
  mapActions
} from "vuex";

export default {
  data() {
    return {
      form: {
        nama_user: 'ummar',
        password: 'easycoOk',
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    backgroundImage() {
      return (
        process.env.BASE_URL + "media/svg/illustrations/data-points.svg"
      );
    }
  },
  watch: {
    currentUser(val) {
      if (val) {
        this.loading = false
        this.$router.push({
          name: "Dashboard"
        })
      }
    },
    loginError(val) {
      if(val) {
        this.notify('danger','Login Error',val)
        this.loading = false
      }
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    async doLogin() {
      this.loading = true
      let payload = this.form
      try {
        let req = await easycoApi.login(payload)
        if(req.status === 200){
          let {data, status, msg, token} = req.data
          if(status) {
            data.token = token
            this.setUser(data)
            this.notify('success','Login Success',msg)
            this.$router.push({
              name: "Dashboard"
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.notify('danger','Login Error',msg)
          }
        } else {
          this.notify('danger','Login Error',req.data.message)
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        this.notify('danger','Login Error',error)
      }
    },
    notify(type, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 5000,
        variant: type,
        toaster: 'b-toaster-bottom-right',
        appendToast: true
      })
    }
  },
};
</script>
