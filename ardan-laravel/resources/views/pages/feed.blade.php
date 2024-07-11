@extends('layout.layout')
@section('screen')
<div class="layout-px-spacing" id="feedsPage">
  <div class="middle-content container-xxl p-0">
    <!-- BREADCRUMB -->
    <div class="page-meta">
      <nav class="breadcrumb-style-one" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">CMS</a></li>
          <li class="breadcrumb-item active" aria-current="page">Feeds</li>
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
                        aria-controls="show-hide-col" @click="clearForm();modal.form.show()">
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
                      <div class="col-12 control-label">Social Type</div>
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
                      <th scope="col" width="5%">Created By</th>
                      <th scope="col" width="5%">Image</th>
                      <th scope="col" width="20%">Title</th>
                      <th scope="col" width="20%">Category</th>
                      <th scope="col" width="20%">Type</th>
                      <th scope="col" width="20%">Reports</th>
                      <th scope="col" width="20%">Status</th>
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
                        <span v-text="(item.user) ? item.user.name : '-'"></span>
                      </td>
                      <td>
                        <div class="bg-dark" v-if="item.image">
                          <img alt="avatar" :src="item.image_url" class="img-thumbnail w-100 bg-dark rounded" />
                        </div>
                        <span v-else>-</span>
                      </td>
                      <td>
                        <span v-text="(item.title) ? item.title : '-'"></span>
                      </td>
                      <td>
                        <span v-text="(item.category) ? item.category : '-'"></span>
                      </td>
                      <td>
                        <span v-text="(item.type) ? item.type : '-'"></span>
                      </td>
                      <td>
                        <span class="badge badge-danger" v-text="(item.reports) ? item.reports.length : '-'"
                          v-if="item.reports.length > 0"
                          @click="modal.report.show();pagingReport.id_feed = item.id"></span>
                        <span v-text="(item.reports) ? item.reports.length : '-'" v-else></span>
                      </td>
                      <td>
                        <span v-text="(item.status) ? item.status : '-'"></span>
                      </td>
                      <td class="text-center">
                        <div class="action-btns">
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
                      <td colspan="8" class="text-center" v-text="(form.loading) ? 'Loading...' : 'No data to show'">
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
                <label for="feedsImage" class="control-label">Image</label>
                <label class="w-100 bg-dark">
                  <img :src="(form.data.image) ? form.data.image : 'https://placehold.co/500x300'" alt=""
                    class="img-fluid w-100">
                  <input type="file" id="image" class="d-none" @change="previewImage($event)">
                </label>
                <input type="hidden" class="form-control" v-model="form.data.image" id="feedsImage">
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="feedsTitle" class="control-label">Title</label>
                <input type="text" class="form-control" v-model="form.data.title" id="feedsTitle">
              </div>
              <div class="form-group mt-3">
                <label for="feedsText" class="control-label">Text</label>
                <ckeditor :editor="ckeditor.editor" v-model="form.data.text" :config="ckeditor.editorConfig"></ckeditor>
              </div>
              <div class="form-group mt-3">
                <label class="control-label">Category</label>
                <div class="form-check" v-for="(cat,index) in opt.category" :key="index">
                  <input class="form-check-input" type="checkbox" :value="cat" v-model="form.data.category"
                    :id="`cat-${cat}`">
                  <label class="form-check-label" :for="`cat-${cat}`" v-text="cat"></label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="feedsType" class="control-label">Type</label>
              <select class="form-control" v-model="form.data.type" id="feedsType">
                <option :value="type" v-text="type" v-for="(type,index) in opt.type" :key="index"></option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Cancel</button>
          <button type="button" class="btn btn-secondary" @click="form.data.status='DRAFT';doSave()"
            v-text="(form.loading) ? 'Loading...' : 'Draft'" :disabled="form.loading"></button>
          <button type="button" class="btn btn-primary" @click="form.data.status='PUBLISHED';doSave()"
            v-text="(form.loading) ? 'Loading...' : 'Publish'" :disabled="form.loading"></button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal report -->
  <div class="modal fade" id="modalReport" tabindex="-1" role="dialog" aria-labelledby="modalreportLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalreportLabel">Report</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
              </path>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-hover table-striped table-bordered table-no-space">
              <thead>
                <tr>
                  <th scope="col" width="5%">Report By</th>
                  <th scope="col" width="20%">Reason</th>
                  <th scope="col" width="20%">Date</th>
                </tr>
                <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
              </thead>
              <tbody v-if="tableReport.items.length > 0">
                <tr v-for="(item,index) in tableReport.items" :key="index">
                  <td>
                    <span v-text="(item.user) ? item.user.name : '-'"></span>
                  </td>
                  <td>
                    <span v-text="(item.text) ? item.text : '-'"></span>
                  </td>
                  <td>
                    <span v-text="(item.created_on) ? item.created_on : '-'"></span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="8" class="text-center" v-text="(tableReport.loading) ? 'Loading...' : 'No data to show'">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="dt--bottom-section d-sm-flex justify-content-sm-end text-center">
            <div class="dt--pagination">
              <div class="dataTables_paginate paging_simple_numbers" id="show-hide-col_paginate">
                <ul class="pagination" v-if="tableReport.totalPage > 0">
                  <li class="paginate_button page-item previous" id="show-hide-col_previous">
                    <a href="#" aria-controls="show-hide-col" data-dt-idx="0" tabindex="0" class="page-link"
                      @click="pagingReport.page = pagingReport.page-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                    </a>
                  </li>
                  <li class="paginate_button page-item active" v-for="page in tableReport.totalPage">
                    <a href="#" aria-controls="show-hide-col" class="page-link btn" v-text="page"
                      @click="pagingReport.page = page"></a>
                  </li>
                  <li class="paginate_button page-item next" id="show-hide-col_next">
                    <a href="#" aria-controls="show-hide-col" data-dt-idx="8" tabindex="0" class="page-link"
                      @click="pagingReport.page = pagingReport.page + 1">
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
        <div class="modal-footer">
          <button class="btn" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Close</button>
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
  Vue.use( CKEditor );
  const vueDashboard = new Vue( {
    el: '#feedsPage',
    data: {
        ckeditor: {
          editor: ClassicEditor,
          editorConfig: {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
            heading: {
              options: [
                  { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                  { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                  { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                  { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                  { model: 'heading7', view: 'h7', title: 'Heading 6', class: 'ck-heading_heading6' },
              ]
            }
          }
        },
        form: {
            data: {
              id_user: null,
              image: null,
              title: null,
              text: '',
              category: [],
              type: null,
              status: 'PUBLISHED'
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
        tableReport: {
            items: [],
            total: 0,
            totalPage: 0,
            loading: false
        },
        pagingReport: {
            page : 1,
            perPage : 10,
            sortDir : 'DESC',
            sortBy : 'id',
            search : null,
            id_feed: null
        },
        alert: {
            show: 'hide',
            bg: 'bg-primary',
            title: null,
            msg: null
        },
        opt: {
          category: [],
          type: ["POST","SHARING"],
          sortBy: [
            {label: "Title",value: "title"},
            {label: "Category",value: "category"},
            {label: "Creation",value: "id"},
          ],
          sortDir: [
            {label: "A-Z", value:"ASC"},
            {label: "Z-A", value:"DESC"},
          ]
        },
          modal: {
            form: null,
            delete: null,
            report: null
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
      pagingReport: {
        handler(val) {
          this.doGetReport();
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
        async doGetCategory() {
          this.opt.category = []
          this.form.loading = true
          let payload = {
            page : 1,
            perPage: '~',
            sortDir : 'DESC',
            sortBy : 'id',
            search : null,
            type: 'Feeds'
          }
          try {
            let req = await Api.categoryRead(payload)
            if(req.status == 200) {
              let {data,status,msg,total,totalPage,paging} = req.data
              if(status){
                data.map((item) => {
                  this.opt.category.push(item.title)
                })
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
        async doGetReport() {
          this.tableReport.loading = true
          let payload = {...this.pagingReport}
          try {
            let req = await Api.reportRead(payload)
            if(req.status == 200) {
              let {data,status,msg,total,totalPage,paging} = req.data
              if(status){
                this.tableReport.items = data
                this.tableReport.total = total
                this.tableReport.totalPage = totalPage
              } else {
                this.notify('error','Error',msg)
              }
            } else {
              this.notify('error','Error',req.message)
            }
            this.tableReport.loading = false
          } catch (error) {
            this.notify('error','Error',error.message)
            this.tableReport.loading = false
          }
        },
        async doGet() {
          this.form.loading = true
          let payload = {...this.paging}
          try {
            if(payload.type == 'all'){
              payload.type = null
            }
            let req = await Api.feedsRead(payload)
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
            let req = await Api.feedsGet(payload)
            if(req.status == 200) {
              let {data,status,msg} = req.data
              if(status){
                data.category = (data.category) ? data.category.split(',') : []
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
          payload.category = payload.category.join(',')
          payload.id_user = (payload.id_user) ? payload.id_user : this.users.id
          try {
            let req = false
            if(payload.id) {
              req = await Api.feedsUpdate(payload,this.users.access_token)
            } else {
              req = await Api.feedsCreate(payload,this.users.access_token)
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
        async doDelete(id) {
          this.form.loading = true
          let payload = {
            id: id
          }
          try {
            let req = await Api.feedsDelete(payload,this.users.access_token)
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
            id_user: null,
            image: null,
            title: null,
            text: '',
            category: [],
            type: null,
            status: 'PUBLISHED'
          }
          this.form.delete = null
          this.checked.all = false
          this.checked.ids = []
        },
          initModal() {
            this.modal = {
              form: new bootstrap.Modal(document.getElementById('modalForm')),
              delete: new bootstrap.Modal(document.getElementById('modalDelete')),
              report: new bootstrap.Modal(document.getElementById('modalReport')),
            }
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
      this.doGetCategory()
      this.initModal()
    }
  });
</script>
@endsection