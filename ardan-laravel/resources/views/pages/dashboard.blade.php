@extends('layout.layout')
@section('screen')
<div class="layout-px-spacing" id="dashboardPage">
  <div class="middle-content container-xxl p-0">
    <div class="row layout-top-spacing">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="row widget-statistic">
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
            <div class="widget widget-one_hybrid widget-followers">
              <div class="widget-heading">
                <div class="w-title">
                  <div class="w-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-users">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div class="">
                    <p class="w-value">1000</p>
                    <h5 class="">Total Users</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
            <div class="widget widget-one_hybrid widget-referral">
              <div class="widget-heading">
                <div class="w-title">
                  <div class="w-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-users">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div class="">
                    <p class="w-value">345</p>
                    <h5 class="">Male User</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
            <div class="widget widget-one_hybrid widget-engagement">
              <div class="widget-heading">
                <div class="w-title">
                  <div class="w-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-users">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div class="">
                    <p class="w-value">241</p>
                    <h5 class="">Female User</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 layout-spacing">
            <div class="widget widget-one_hybrid widget-followers">
              <div class="widget-heading">
                <div class="w-title">
                  <div class="w-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-users">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div class="">
                    <p class="w-value">1000</p>
                    <h5 class="">On Radio Stream</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-six">
          <div class="">
            <h6 class="">Page View Statistics</h6>
          </div>
          <div class="row">
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">Home</p>
                <p class="w-stats">423,964</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="total-users"></div>
              </div> --}}
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">Social</p>
                <p class="w-stats">7,929</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="paid-visits"></div>
              </div> --}}
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">News</p>
                <p class="w-stats">423,964</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="total-users"></div>
              </div> --}}
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">Content</p>
                <p class="w-stats">7,929</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="paid-visits"></div>
              </div> --}}
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">Events</p>
                <p class="w-stats">423,964</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="total-users"></div>
              </div> --}}
            </div>
            <div class="col-6 col-sm-6 col-md-2">
              <div class="w-detail">
                <p class="w-title">Radio</p>
                <p class="w-stats">7,929</p>
              </div>
              {{-- <div class="w-chart-render-one">
                <div id="paid-visits"></div>
              </div> --}}
            </div>
          </div>
        </div>

      </div>

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-chart-three">
          <div class="widget-heading">
            <div class="">
              <h5 class="">Banner Click and Views</h5>
            </div>
          </div>

          <div class="widget-content">
            <div id="uniqueVisits"></div>
          </div>
        </div>
      </div>

    </div>

  </div>

</div>
@endsection
@section('customScript')
<!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS -->
<script src="/resources/plugins/src/apex/apexcharts.min.js"></script>
<script src="/resources/assets/js/dashboard/dash_1.js"></script>
<!-- BEGIN PAGE LEVEL PLUGINS/CUSTOM SCRIPTS -->
<script>
  const vueDashboard = new Vue( {
    el: '#dashboardPage',
    data: {
      
    },
    methods: {
    },
    mounted() {
    }
});
</script>
@endsection