@extends('layout.layout')
@section('screen')
<div class="layout-px-spacing" id="contentPage">
  <div class="middle-content container-xxl p-0">
    <!-- BREADCRUMB -->
    <div class="page-meta">
      <nav class="breadcrumb-style-one" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">CMS</a></li>
          <li class="breadcrumb-item active" aria-current="page">Content</li>
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
                      <button class="dt-button btn btn-secondary toggle-vis mb-1" tabindex="0"
                        aria-controls="show-hide-col"
                        @click="clearForm();modal.form.show()">
                        <span>Add New</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-md-0 mt-3">
                    <div id="show-hide-col_filter" class="dataTables_filter">
                      <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-search">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="search" class="form-control" placeholder="Search..." aria-controls="show-hide-col"
                          v-model="paging.search">
                      </label>
                    </div>
                  </div>
                  <div class="col-6 mt-3">
                    <div class="row">
                      <div class="col-12 control-label">Sort By</div>
                      <div class="col-6">
                        <select class="form-control" v-model="paging.sortBy" id="pagingSortBy">
                          <option :value="opt.value" v-text="opt.label" v-for="(opt,index) in opt.sortBy" :key="index">
                          </option>
                        </select>
                      </div>
                      <div class="col-6">
                        <select class="form-control" v-model="paging.sortDir" id="pagingSortDir">
                          <option :value="opt.value" v-text="opt.label" v-for="(opt,index) in opt.sortDir" :key="index">
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 mt-3">
                    <div class="row">
                      <div class="col-12 control-label">Content Type</div>
                      <div class="col-12">
                        <select class="form-control" v-model="paging.type" id="pagingType">
                          <option value="all">All</option>
                          <option :value="opt" v-text="opt" v-for="(opt,index) in opt.type" :key="index">
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 mt-3 d-flex justify-content-md-end align-items-end">
                    <button class="btn btn-danger btn-sm" type="button"
                      @click="form.delete = checked.ids;modal.delete.show()" :disabled="checked.ids.length == 0">Delete
                      Selected</button>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-striped table-bordered table-no-space">
                  <thead>
                    <tr>
                      <th scope="col">
                        <input type="checkbox" v-model="checked.all" @change="checkAll()">
                      </th>
                      <th scope="col" width="5%">Image</th>
                      <th scope="col" width="20%">Title</th>
                      <th scope="col" width="20%">Type</th>
                      <th class="text-center" scope="col" width="20%"></th>
                    </tr>
                    <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
                  </thead>
                  <tbody v-if="table.items.length > 0">
                    <tr v-for="(item,index) in table.items" :key="index">
                      <td>
                        <input type="checkbox" v-model="checked.ids" :value="item.id">
                      </td>
                      <td>
                        <div class="bg-dark">
                          <img alt="avatar" :src="item.image_url" class="img-thumbnail w-100 bg-dark rounded" />
                        </div>
                      </td>
                      <td>
                        <span v-text="(item.title) ? item.title : '-'"></span>
                      </td>
                      <td>
                        <span v-text="(item.type) ? item.type : '-'"></span>
                      </td>
                      <td class="text-center">
                        <div class="action-btns">
                          <a href="javascript:void(0);" class="action-btn btn-pin bs-tooltip me-2"
                            data-toggle="tooltip" data-placement="top" title="Pin" @click="doPin(item.id,index)">
                            <svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 47.94 47.94" xml:space="preserve">
                              <path :style="`fill:${item.pin ? '#ED8A19' : '#aaa'};`" d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                                c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                                c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                                c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                                c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                                C22.602,0.567,25.338,0.567,26.285,2.486z"/>
                              </svg>
                          </a>
                          <a href="javascript:void(0);" class="action-btn btn-edit bs-tooltip me-2"
                            data-toggle="tooltip" data-placement="top" title="Edit" data-bs-toggle="modal"
                            data-bs-target="#modalForm" @click="doUpdate(item.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="feather feather-edit-2">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                              </path>
                            </svg>
                          </a>
                          <a href="javascript:void(0);" class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                            data-placement="top" title="Delete" @click="form.delete = item.id;modal.delete.show()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="feather feather-trash-2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                              </path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="5" class="text-center" v-text="(form.loading) ? 'Loading...' : 'No data to show'">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="dt--bottom-section d-sm-flex justify-content-sm-between text-center">
                <div class="dt--pages-count  mb-sm-0 mb-3">
                  <div class="dataTables_length" id="example_length">
                    <label>Results :
                      <select name="example_length" aria-controls="example" class="form-control"
                        v-model="paging.perPage">
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
                        <a href="#" aria-controls="show-hide-col" data-dt-idx="0" tabindex="0" class="page-link"
                          @click="paging.page = paging.page-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-arrow-left">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                          </svg>
                        </a>
                      </li>
                      <li class="paginate_button page-item active" v-for="page in table.totalPage">
                        <a href="#" aria-controls="show-hide-col" class="page-link" v-text="page"
                          @click="paging.page = page"></a>
                      </li>
                      <li class="paginate_button page-item next" id="show-hide-col_next">
                        <a href="#" aria-controls="show-hide-col" data-dt-idx="8" tabindex="0" class="page-link"
                          @click="paging.page = paging.page + 1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-arrow-right">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
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
  <div class="modal fade" id="modalForm" tabindex="-1" role="dialog" aria-labelledby="modalFormLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalFormLabel">Form</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
              </path>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for="contentImage" class="control-label">Image</label>
                <label class="w-100 bg-dark">
                  <img :src="(form.data.image) ? form.data.image : 'https://placehold.co/500x300'" alt=""
                    class="img-fluid w-100">
                  <input type="file" id="image" class="d-none" @change="previewImage($event)">
                </label>
                <input type="hidden" class="form-control" v-model="form.data.image" id="contentImage">
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="contentTitle" class="control-label">Title</label>
                <input type="text" class="form-control" v-model="form.data.title" id="contentTitle">
              </div>
              <div class="form-group mt-3">
                <label for="contentUrl" class="control-label">Url</label>
                <textarea class="form-control" v-model="form.data.url" id="contentUrl" rows="10"></textarea>
              </div>
              <div class="form-group mt-3">
                <label class="control-label">Type</label>
                <select type="text" class="form-control" v-model="form.data.type" id="contentType">
                  <option :value="opt" v-text="opt" v-for="(opt,index) in opt.type" :key="index"></option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Cancel</button>
          <button type="button" class="btn btn-primary" @click="doSave()"
            v-text="(form.loading) ? 'Loading...' : 'Save'" :disabled="form.loading"></button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Delete -->
  <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDeleteLabel">Delete Data</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
              </path>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p class="modal-text">Are you sure to delete this data?</p>
        </div>
        <div class="modal-footer">
          <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Cancel</button>
          <button type="button" class="btn btn-danger" @click="doDelete(form.delete)"
            v-text="(form.loading) ? 'Loading...' : 'Delete!!!'" :disabled="form.loading"></button>
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
  const vueContent = new Vue( {
    el: '#contentPage',
    data: {
        form: {
            data: {
              image: null,
              title: null,
              url: null,
              type: null
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
            search : null,
            type: 'all'
        },
        alert: {
            show: 'hide',
            bg: 'bg-primary',
            title: null,
            msg: null
        },
        opt: {
          type: ['Instagram','Tiktok','Youtube'],
          sortBy: [
            {label: "Title",value: "title"},
            {label: "Type",value: "type"},
            {label: "Creation",value: "id"},
          ],
          sortDir: [
            {label: "A-Z", value:"ASC"},
            {label: "Z-A", value:"DESC"},
          ]
        },
        modal: {
          form: null,
          delete: null
        },
        checked: {
          all: false,
          ids: []
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
            this.doGet();
        },
        deep: true,
      },
    },
    methods: {
        checkAll(){
          if(this.checked.all){
            this.checked.ids = this.table.items.map(item => item.id)
          } else {
            this.checked.ids = []
          }
        },
        async doGet() {
          this.form.loading = true
          let payload = {...this.paging}
          if(payload.type == 'all'){
            payload.type = null
          }
          try {
            let req = await Api.contentRead(payload)
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
            let req = await Api.contentGet(payload)
            if(req.status == 200) {
              let {data,status,msg} = req.data
              if(status){
                this.form.data = data
                this.modal.form.show()
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
              req = await Api.contentUpdate(payload,this.users.access_token)
            } else {
              req = await Api.contentCreate(payload,this.users.access_token)
            }
            if(req.status == 200) {
              let {data,status,msg} = req.data
              if(status){
                this.notify('success','Success',msg)
                this.doGet()
                this.clearForm()
                this.modal.form.hide()
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
        async doPin(id,index){
          this.form.loading = true
          let payload = {
            id: id
          }
          try {
            let req = await Api.contentPin(payload,this.users.access_token)
            if(req.status == 200) {
              let {data,status,msg,pin} = req.data
              if(status){
                this.notify('success','Success',msg)
                this.table.items[index].pin = pin
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
            let req = await Api.contentDelete(payload,this.users.access_token)
            if(req.status == 200) {
              let {data,status,msg} = req.data
              if(status){
                this.notify('success','Success',msg)
                this.doGet()
                this.clearForm()
                this.modal.delete.hide()
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
            url: null,
            type: null
          }
          this.form.delete = null
          this.checked.all = false
          this.checked.ids = []
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
        },
        initModal() {
          this.modal = {
            form: new bootstrap.Modal(document.getElementById('modalForm')),
            delete: new bootstrap.Modal(document.getElementById('modalDelete'))
          }
        },
    },
    mounted() {
      this.doGet()
      this.initModal()
    }
  });
</script>
@endsection