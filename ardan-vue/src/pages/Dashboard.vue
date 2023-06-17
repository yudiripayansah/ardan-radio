<template>
<div>
  <h1 class="mb-5">{{$route.name}}</h1>
  <b-card>
    <b-row>
      <b-col cols="6" class="mb-5">
        <div class="bg-light-info px-6 py-8 rounded-xl">
          <span class="svg-icon svg-icon-3x svg-icon-info d-block my-2">
            <inline-svg src="media/svg/icons/General/User.svg" />
          </span>
          <router-link to="/pasien" class="text-info font-weight-bold font-size-h6 mt-2">
            <h2><b>{{dashboard.anggota}}</b></h2>
            <h4>Anggota</h4>
          </router-link>
        </div>
      </b-col>
      <b-col cols="6" class="mb-5">
        <div class="bg-light-success px-6 py-8 rounded-xl">
          <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
            <inline-svg src="media/svg/icons/Shopping/Dollar.svg" />
          </span>
          <router-link to="/hasil-test" class="text-success font-weight-bold font-size-h6 mt-2">
            <h2><b>{{dashboard.outstanding}}</b></h2>
            <h4>Outstanding</h4>
          </router-link>
        </div>
      </b-col>
      <b-col cols="6" class="mb-5">
        <div class="bg-light-danger px-6 py-8 rounded-xl">
          <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
            <inline-svg src="media/svg/icons/Shopping/Money.svg" />
          </span>
          <router-link to="/hasil-test-antibody" class="text-danger font-weight-bold font-size-h6 mt-2">
            <h2><b>{{dashboard.simpanan}}</b></h2>
            <h4>Tabungan</h4>
          </router-link>
        </div>
      </b-col>
      <b-col cols="6" class="mb-5">
        <div class="bg-light-warning px-6 py-8 rounded-xl">
          <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
            <inline-svg src="media/svg/icons/Communication/Urgent-mail.svg" />
          </span>
          <router-link to="/hasil-test-antigen" class="text-warning font-weight-bold font-size-h6 mt-2">
            <h2><b>{{dashboard.par}}</b></h2>
            <h4>PAR</h4>
          </router-link>
        </div>
      </b-col>
      <b-col cols="12" class="py-3 border-top">
        <h3 class="mb-3">Pencairan</h3>
        <apexchart type="line" height="350" :options="chart.chartOptions" :series="chart.series"></apexchart>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
import axios from '@/core/plugins/axios'
export default {
  name: "dashboard",
  components: {

  },
  data() {
    return {
      dashboard: {
        anggota: '10.000',
        outstanding: 'Rp 4.657.897.500',
        par: '0%',
        simpanan: 'Rp 10.768.456.200'
      },
      chart: {
        series: [{
            name: 'TEAM A',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
          }, {
            name: 'TEAM B',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
          }, {
            name: 'TEAM C',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
          }
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
          },
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },
          
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
          },
          labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
            '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
          ],
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            title: {
              text: 'Points',
            },
            min: 0
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;
          
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    // this.getDashboard()
  },
  methods: {
    getDashboard() {
      
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
  }
};
</script>
