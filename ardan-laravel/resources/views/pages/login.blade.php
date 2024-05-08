<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>Sign In | Ardan Radio </title>
		<link rel="icon" type="image/x-icon" href="/resources/assets/img/ardan/logo.png"/>
    <link href="/resources/assets/css/light/loader.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/dark/loader.css" rel="stylesheet" type="text/css" />
    <script src="/resources/assets/loader.js"></script>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">
    <link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/light/plugins.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/light/authentication/auth-cover.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/dark/plugins.css" rel="stylesheet" type="text/css" />
    <link href="/resources/assets/css/dark/authentication/auth-cover.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
</head>
<body class="form">
  <!-- BEGIN LOADER -->
  <div id="load_screen"> 
    <div class="loader"> 
      <div class="loader-content">
        <div class="spinner-grow align-self-center"></div>
      </div>
    </div>
  </div>
  <!--  END LOADER -->
  <div id="loginPage">
    <div class="auth-container d-flex">
      <div class="container mx-auto align-self-center">
        <div class="row">
          <div class="col-6 d-lg-flex d-none h-100 my-auto top-0 start-0 text-center justify-content-center flex-column">
            <div class="auth-cover-bg-image"></div>
            <div class="auth-overlay"></div>
            <div class="auth-cover">
              <div class="position-relative">
                <img src="/resources/assets/img/ardan/banner.png" alt="auth-img" class="img-fluid">
                <h2 class="mt-5 text-light font-weight-bolder px-2">Ardan CMS</h2>
                <p class="text-light px-2">CMS panel for manage Ardan Radio mobile apps</p>
              </div>
            </div>
          </div>
          <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <h2>Sign In</h2>
                    <p>Enter your email and password to login</p>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" v-model="form.data.email">
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-4">
                      <label class="form-label">Password</label>
                      <input type="password" class="form-control" v-model="form.data.password">
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-4">
                      <button class="btn btn-primary w-100" type="button" @click="doLogin()" :disabled="form.loading" v-text="(form.loading) ? 'Please Wait...' : 'SIGN IN'"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Toaster -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="liveToast" class="toast" :class="alert.show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" :class="alert.bg">
          <strong class="me-auto text-white" v-text="alert.title"></strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-dark" v-text="alert.msg">
        </div>
      </div>
    </div>
    <!-- end Toaster -->
  </div>
  <!-- BEGIN GLOBAL MANDATORY SCRIPTS -->
  <script src="/resources/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- END GLOBAL MANDATORY SCRIPTS -->
  
  <script src="{{ url('/resources/plugins/vue2/vue.js') }}"></script>
  <script src="https://unpkg.com/vuex@4.0.0/dist/vuex.global.js"></script>
  <script src="{{ url('/resources/plugins/axios/axios.js') }}"></script>
  <script src="{{ url('/resources/assets/js/store.js') }}"></script>
  <script src="{{ url('/resources/assets/js/helper.js') }}"></script>
  <script src="{{ url('/resources/assets/js/Api.js') }}"></script>
  <script>
    const vueLogin = new Vue( {
      el: '#loginPage',
      data: {
        form: {
          data: {
            email: null,
            password: null
          },
          loading: false
        },
        alert: {
          show: 'hide',
          bg: 'bg-primary',
          title: null,
          msg: null
        }
      },
      methods: {
        async doLogin() {
          this.form.loading = true
          let payload = {...this.form.data}
          try {
            if(payload.email && payload.password) {
              let req = await Api.login(payload)
              if(req.status == 200) {
                let {data,status,msg} = req.data
                if(status){
                  this.notify('success','Success',msg)
                  store.dispatch('setUsers', data)
                  window.location.href = '{{ url("/dashboard") }}'
                } else {
                  this.notify('error','Error',msg)
                }
              } else {
                this.notify('error','Error',req.message)
              }
            } else {
              this.notify('error','Error','Email dan Password harus diisi')
            }
            this.form.loading = false
          } catch (error) {
            this.notify('error','Error',error.message)
            this.form.loading = false
          }
        },
        notify(type,title,msg){
          let bg = 'bg-primary'
          switch (type) {
            case 'error':
              bg = 'bg-danger'
              break;
            case 'success':
              bg = 'bg-success'
              break;
            case 'warning':
              bg = 'bg-warning'
              break;
            case 'info':
              bg = 'bg-info'
              break;
          }
          this.alert = {
            show: 'show',
            bg: bg,
            title: title,
            msg: msg
          }
          console.log(this.alert)
          setTimeout(() => {
            this.alert.show = 'hide'
          }, 2000);
        }
      },
      mounted() {
      }
    });
  </script>
</body>
</html>