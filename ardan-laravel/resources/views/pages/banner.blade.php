@extends('layout.layout')
@section('screen')
<div class="layout-px-spacing" id="bannerPage">
  <div class="middle-content container-xxl p-0">
    <!-- BREADCRUMB -->
    <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">CMS</a></li>
                <li class="breadcrumb-item active" aria-current="page">Banner</li>
            </ol>
        </nav>
    </div>
    <!-- /BREADCRUMB -->
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">
      <div class="col-12">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="dataTables_wrapper container-fluid dt-bootstrap4">
              <div class="dt--top-section">
                  <div class="row">
                      <div class="col-sm-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                          <div class="dt-buttons"> 
                            <button class="dt-button btn btn-secondary toggle-vis mb-1" tabindex="0" aria-controls="show-hide-col" data-bs-toggle="modal" data-bs-target="#modalForm" @click="clearForm()">
                              <span>Add New</span>
                            </button>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-md-0 mt-3">
                          <div id="show-hide-col_filter" class="dataTables_filter">
                              <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="search" class="form-control" placeholder="Search..." aria-controls="show-hide-col" v-model="paging.search">
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="table-responsive">
                  <table class="table table-hover table-striped table-bordered table-no-space">
                      <thead>
                          <tr>
                            <th scope="col" width="20%">Image</th>
                            <th scope="col" width="20%">Title</th>
                            <th scope="col" width="20%">Text</th>
                            <th scope="col" width="20%">CTA</th>
                            <th class="text-center" scope="col" width="20%"></th>
                          </tr>
                          <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
                      </thead>
                      <tbody v-if="table.items.length > 0">
                        <tr v-for="(item,index) in table.items" :key="index">
                          <td>
                            <img alt="avatar" :src="item.image_url" class="img-thumbnail w-100" />
                          </td>
                          <td>
                            <span v-text="(item.title) ? item.title : '-'"></span>
                          </td>
                          <td>
                            <span v-text="(item.text) ? item.text.substring(0,20)+'...' : '-'"></span>
                          </td>
                          <td>
                            <span v-text="(item.cta) ? item.cta : '-'"></span>
                          </td>
                          <td class="text-center">
                            <div class="action-btns">
                              <a href="javascript:void(0);" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="Edit" data-bs-toggle="modal" data-bs-target="#modalForm" @click="doUpdate(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-edit-2">
                                    <path
                                        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                    </path>
                                </svg>
                              </a>
                              <a href="javascript:void(0);" class="action-btn btn-delete bs-tooltip" data-toggle="tooltip" data-placement="top" title="Delete" data-bs-toggle="modal" data-bs-target="#modalDelete" @click="form.delete = item.id">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-trash-2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10"
                                        y2="17"></line>
                                    <line x1="14" y1="11" x2="14"
                                        y2="17"></line>
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="5" class="text-center" v-text="(form.loading) ? 'Loading...' : 'No data to show'"></td>
                        </tr>
                      </tbody>
                  </table>
              </div>
              <div class="dt--bottom-section d-sm-flex justify-content-sm-between text-center">
                <div class="dt--pages-count  mb-sm-0 mb-3">
                  <div class="dataTables_length" id="example_length">
                    <label>Results :  
                      <select name="example_length" aria-controls="example" class="form-control" v-model="paging.perPage">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div class="dt--pagination">
                  <div class="dataTables_paginate paging_simple_numbers" id="show-hide-col_paginate">
                    <ul class="pagination" v-if="table.totalPage > 0">
                      <li class="paginate_button page-item previous" id="show-hide-col_previous">
                        <a href="#" aria-controls="show-hide-col" data-dt-idx="0" tabindex="0" class="page-link" @click="paging.page = paging.page-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </a>
                      </li>
                      <li class="paginate_button page-item active" v-for="page in table.totalPage">
                        <a href="#" aria-controls="show-hide-col" class="page-link" v-text="page" @click="paging.page = page"></a>
                      </li>
                      <li class="paginate_button page-item next" id="show-hide-col_next">
                        <a href="#" aria-controls="show-hide-col" data-dt-idx="8" tabindex="0" class="page-link" @click="paging.page = paging.page + 1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CONTENT AREA -->
  </div>
  <!-- Modal Form -->
  <div class="modal fade" id="modalForm" tabindex="-1" role="dialog" aria-labelledby="modalFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFormLabel">Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="bannerImage" class="control-label">Image</label>
                    <label class="w-100">
                      <img :src="(form.data.image) ? form.data.image : 'https://placehold.co/800x400'" alt="" class="img-fluid w-100">
                      <input type="file" id="image" class="d-none" @change="previewImage($event)">
                    </label>
                    <input type="hidden" class="form-control" v-model="form.data.image" id="bannerImage">
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <div class="form-group">
                    <label for="bannerTitle" class="control-label">Title</label>
                    <input type="text" class="form-control" v-model="form.data.title" id="bannerTitle">
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <div class="form-group">
                    <label for="bannerText" class="control-label">Text</label>
                    <textarea rows="5" class="form-control" v-model="form.data.text" id="bannerText"></textarea>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <div class="form-group">
                    <label for="bannerCta" class="control-label">Placement</label>
                    <select class="form-control" v-model="form.data.cta" id="bannerCta">
                      <option :value="cta" v-text="cta" v-for="(cta,index) in opt.cta" :key="index"></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Cancel</button>
                <button type="button" class="btn btn-primary" @click="doSave()" v-text="(form.loading) ? 'Loading...' : 'Save'" :disabled="form.loading"></button>
            </div>
        </div>
    </div>
  </div>
  <!-- Modal Delete -->
  <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalDeleteLabel">Delete Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </button>
            </div>
            <div class="modal-body">
                <p class="modal-text">Are you sure to delete this data?</p>
            </div>
            <div class="modal-footer">
                <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Cancel</button>
                <button type="button" class="btn btn-danger" @click="doDelete(form.delete)" v-text="(form.loading) ? 'Loading...' : 'Delete!!!'" :disabled="form.loading"></button>
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
@endsection
@section('customScript')
<script>
let modalForm = new bootstrap.Modal(document.getElementById('modalForm'),{})
const vueDashboard = new Vue( {
  el: '#bannerPage',
  data: {
      form: {
          data: {
            image: null,
            title: null,
            text: null,
            cta: null
          },
          delete: null,
          loading: false
      },
      table: {
          items: [],
          total: 0,
          totalPage: 0
      },
      paging: {
          page : 1,
          perPage : 10,
          sortDir : 'DESC',
          sortBy : 'id',
          search : null
      },
      opt: {
        cta: ["MAIN BANNER","HOMEPAGE","ARDAN CONTENT","NEWS","EVENTS","RADIO"]
      },
      alert: {
          show: 'hide',
          bg: 'bg-primary',
          title: null,
          msg: null
      }
  },
  computed: {
    users() {
      return store.getters.users
    }
  },
  watch: {
    paging: {
      handler(val) {
        if(val.page >= 1 && val.page <= this.table.totalPage){
          this.doGet();
        }
      },
      deep: true,
    },
  },
  methods: {
      async doGet() {
        this.form.loading = true
        let payload = {...this.paging}
        try {
          let req = await Api.bannerRead(payload)
          if(req.status == 200) {
            let {data,status,msg,total,totalPage,paging} = req.data
            if(status){
              this.table.items = data
              this.table.total = total
              this.table.totalPage = totalPage
            } else {
              this.notify('error','Error',msg)
            }
          } else {
            this.notify('error','Error',req.message)
          }
          this.form.loading = false
        } catch (error) {
          this.notify('error','Error',error.message)
          this.form.loading = false
        }
      },
      async doUpdate(id) {
        this.clearForm()
        this.form.loading = true
        let payload = {
          id: id
        }
        try {
          let req = await Api.bannerGet(payload)
          if(req.status == 200) {
            let {data,status,msg} = req.data
            if(status){
              this.form.data = data
            } else {
              this.notify('error','Error',msg)
            }
          } else {
            this.notify('error','Error',req.message)
          }
          this.form.loading = false
        } catch (error) {
          this.notify('error','Error',error.message)
          this.form.loading = false
        }
      },
      async doSave() {
        this.form.loading = true
        let payload = {...this.form.data}
        try {
          let req = false
          if(payload.id) {
            req = await Api.bannerUpdate(payload,this.users.access_token)
          } else {
            req = await Api.bannerCreate(payload,this.users.access_token)
          }
          if(req.status == 200) {
            let {data,status,msg} = req.data
            if(status){
              this.notify('success','Success',msg)
              this.doGet()
              this.clearForm()
              this.hideModal('#modalForm')
            } else {
              this.notify('error','Error',msg)
            }
          } else {
            this.notify('error','Error',req.message)
          }
          this.form.loading = false
        } catch (error) {
          this.notify('error','Error',error.message)
          this.form.loading = false
        }
      },
      async doDelete(id) {
        this.form.loading = true
        let payload = {
          id: id
        }
        try {
          let req = await Api.bannerDelete(payload,this.users.access_token)
          if(req.status == 200) {
            let {data,status,msg} = req.data
            if(status){
              this.notify('success','Success',msg)
              this.doGet()
              this.clearForm()
              this.hideModal('#modalDelete')
            } else {
              this.notify('error','Error',msg)
            }
          } else {
            this.notify('error','Error',req.message)
          }
          this.form.loading = false
        } catch (error) {
          this.notify('error','Error',error.message)
          this.form.loading = false
        }
      },
      clearForm() {
        this.form.data = {
          image: null,
          title: null,
          text: null,
          cta: null
        }
        this.form.delete = null
      },
      hideModal(modal) {
        let modalForm = document.querySelector(modal)
        let modalBackdrop = document.querySelector('.modal-backdrop')
        let body = document.querySelector('body')
        modalForm.classList.remove('show')
        modalForm.removeAttribute('style')
        body.classList.remove('modal-open')
        body.removeAttribute('style')
        modalBackdrop.remove()
      },
      previewImage(e) {
        let vm = this
        let inp = e.target
        let files = e.target.files
        for(let i = 0; i < files.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = function () {
            vm.form.data.image = reader.result
            inp.type = 'text';
            inp.type = 'file';
          };
          reader.onerror = function () {
            inp.type = 'text';
            inp.type = 'file';
          };
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
        setTimeout(() => {
          this.alert.show = 'hide'
        }, 2000);
      }
  },
  mounted() {
    this.doGet()
  }
});
</script>
@endsection