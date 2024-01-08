@extends('layout.layout')
@section('screen')
<div class="layout-px-spacing">
    <div class="middle-content container-xxl p-0">
        <!-- BREADCRUMB -->
        <div class="page-meta">
            <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">CMS</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Member</li>
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
                                    <div
                                        class="col-sm-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                                        <div class="dt-buttons">
                                            <button class="dt-button btn btn-secondary toggle-vis mb-1" tabindex="0"
                                                aria-controls="show-hide-col">
                                                <span>Add New</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        class="col-sm-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-md-0 mt-3">
                                        <div id="show-hide-col_filter" class="dataTables_filter">
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-search">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg>
                                                <input type="search" class="form-control" placeholder="Search..."
                                                    aria-controls="show-hide-col">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-striped table-bordered table-no-space">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%">
                                                <div class="form-check form-check-primary">
                                                    <input class="form-check-input" id="custom_mixed_parent_all"
                                                        type="checkbox">
                                                </div>
                                            </th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th class="text-center" scope="col">Status</th>
                                            <th class="text-center" scope="col"></th>
                                        </tr>
                                        <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="form-check form-check-primary">
                                                    <input class="form-check-input custom_mixed_child" type="checkbox">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="media">
                                                    <div class="avatar me-2">
                                                        <img alt="avatar" src="/resources/assets/img/profile-7.jpeg"
                                                            class="rounded-circle" />
                                                    </div>
                                                    <div class="media-body align-self-center">
                                                        <h6 class="mb-0">Shaun Park</h6>
                                                        <span>shaun.park@mail.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="mb-0">CEO</p>
                                                <span class="text-success">Management</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge badge-light-success">Online</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="action-btns">
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-view bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="View">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                            </path>
                                                            <circle cx="12" cy="12" r="3">
                                                            </circle>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-edit bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-edit-2">
                                                            <path
                                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                            </path>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                                        data-placement="top" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-trash-2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="form-check form-check-primary">
                                                    <input class="form-check-input custom_mixed_child" type="checkbox">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="media">
                                                    <div class="avatar me-2">
                                                        <img alt="avatar" src="/resources/assets/img/profile-11.jpeg"
                                                            class="rounded-circle" />
                                                    </div>
                                                    <div class="media-body align-self-center">
                                                        <h6 class="mb-0">Alma Clarke</h6>
                                                        <span>almaClarke@mail.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="mb-0">Lead Developer</p>
                                                <span class="text-secondary">Programmer</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge badge-light-secondary">Waiting</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="action-btns">
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-view bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="View">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                            </path>
                                                            <circle cx="12" cy="12" r="3">
                                                            </circle>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-edit bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-edit-2">
                                                            <path
                                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                            </path>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                                        data-placement="top" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-trash-2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="form-check form-check-primary">
                                                    <input class="form-check-input custom_mixed_child" type="checkbox">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="media">
                                                    <div class="avatar me-2">
                                                        <img alt="avatar" src="/resources/assets/img/profile-5.jpeg"
                                                            class="rounded-circle" />
                                                    </div>
                                                    <div class="media-body align-self-center">
                                                        <h6 class="mb-0">Vincent Carpenter</h6>
                                                        <span>vincent@mail.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="mb-0">HR</p>
                                                <span class="text-danger">Management</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge badge-light-danger">Offline</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="action-btns">
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-view bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="View">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                            </path>
                                                            <circle cx="12" cy="12" r="3">
                                                            </circle>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-edit bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-edit-2">
                                                            <path
                                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                            </path>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                                        data-placement="top" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-trash-2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="form-check form-check-primary">
                                                    <input class="form-check-input custom_mixed_child" type="checkbox">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="media">
                                                    <div class="avatar me-2">
                                                        <img alt="avatar" src="/resources/assets/img/profile-34.jpeg"
                                                            class="rounded-circle" />
                                                    </div>
                                                    <div class="media-body align-self-center">
                                                        <h6 class="mb-0">Xavier</h6>
                                                        <span>xavier@mail.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="mb-0">Lead Designer</p>
                                                <span class="text-info">Graphic</span>
                                            </td>

                                            <td class="text-center">
                                                <span class="badge badge-light-info">On Hold</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="action-btns">
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-view bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="View">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                            </path>
                                                            <circle cx="12" cy="12" r="3">
                                                            </circle>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-edit bs-tooltip me-2"
                                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-edit-2">
                                                            <path
                                                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                            </path>
                                                        </svg>
                                                    </a>
                                                    <a href="javascript:void(0);"
                                                        class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                                        data-placement="top" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" class="feather feather-trash-2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                            </path>
                                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div class="dt--bottom-section d-sm-flex justify-content-sm-between text-center">
                                <div class="dt--pages-count  mb-sm-0 mb-3">
                                    <div class="dataTables_length" id="example_length">
                                        <label>Results :
                                            <select name="example_length" aria-controls="example" class="form-control">
                                                <option value="7">7</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="dt--pagination">
                                    <div class="dataTables_paginate paging_simple_numbers" id="show-hide-col_paginate">
                                        <ul class="pagination">
                                            <li class="paginate_button page-item previous" id="show-hide-col_previous">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="0" tabindex="0"
                                                    class="page-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-arrow-left">
                                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                                        <polyline points="12 19 5 12 12 5"></polyline>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="1" tabindex="0"
                                                    class="page-link">1</a>
                                            </li>
                                            <li class="paginate_button page-item disabled" id="show-hide-col_ellipsis">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="2" tabindex="0"
                                                    class="page-link">…</a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="3" tabindex="0"
                                                    class="page-link">5</a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="4" tabindex="0"
                                                    class="page-link">6</a>
                                            </li>
                                            <li class="paginate_button page-item active">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="5" tabindex="0"
                                                    class="page-link">7</a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="6" tabindex="0"
                                                    class="page-link">8</a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="7" tabindex="0"
                                                    class="page-link">9</a>
                                            </li>
                                            <li class="paginate_button page-item next" id="show-hide-col_next">
                                                <a href="#" aria-controls="show-hide-col" data-dt-idx="8" tabindex="0"
                                                    class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                        height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" class="feather feather-arrow-right">
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
</div>
@endsection