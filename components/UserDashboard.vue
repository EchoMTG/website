<template>
  <span>

      <title-bar :title-stack="titleStack" />
      <hero-bar-main />

      <section class="section is-main-section">

        <tiles>
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="currency"
            prefix="$"
            :number="parseFloat(stats.current_value_market)"
            :previous-number="parseInt(stats.total_items)"
            previous-period=" Tracked Items"
            label="Collection Value"
          />
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="USD"
            :number="this.totalCardsValue"
            prefix="$"
            :previous-number="parseInt(totalCards)"
            previous-period="Individual Cards"
            label="Individual Card Value"
          />
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="usd"
            :number="parseFloat(stats.sealed_value)"
            prefix="$"
            previous-period="Sealed Items"
            :previous-number="parseInt(stats.total_sealed)"
            label="Sealed Value"
          />
          <card-widget
            class="tile is-child"
            type="is-info"
            icon="usd"
            :number="stats.change_value"
            previous-number=""
            previous-period="Last 7 days"
            suffix="%"
            label="Performance"
          />

        </tiles>

        <card-component
          title="Performance"
          icon="finance"
          header-icon="reload"
          @header-icon-click="fillChartData"
        >
          <div v-if="defaultChart.chartData" class="chart-area">
            <line-chart
              ref="bigChart"
              style="height: 100%"
              chart-id="big-line-chart"
              :chart-data="defaultChart.chartData"
              :extra-options="defaultChart.extraOptions"
            />
          </div>
        </card-component>

        <div class="columns is-desktop">
          <div class="column">
            <card-scrollable
              data-url="/data-sources/comments.json"
              title="Recent Comments"
              icon="comment-multiple-outline"
              :has-share-buttons="true"
            />
          </div>
          <div class="column">
            <card-scrollable
              data-url="/data-sources/stuff-updates.json"
              title="Updates"
              icon="animation-outline"
              :has-dismiss="true"
            />
          </div>
        </div>


      </section>
  </span>
</template>
<script>
import * as chartConfig from '@/components/Charts/chart.config'
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import ClientsTableSample from '@/components/ClientsTableSample'
import HeroBarMain from '@/components/HeroBarMain'
import CardToolbar from '@/components/CardToolbar'
import CardScrollable from '@/components/CardScrollable'
import RefreshButton from '@/components/RefreshButton'
  export default {
    name: 'UserDashboard',
    components: {
      RefreshButton,
      CardScrollable,
      CardToolbar,
      HeroBarMain,
      ClientsTableSample,
      LineChart,
      CardComponent,
      CardWidget,
      Tiles,
      TitleBar
    },
    data() {
      return {
        stats: {},
        defaultChart: {
          chartData: null,
          extraOptions: chartConfig.chartOptionsMain
        }
      }
    },
    beforeMount () {
      //window.alert('hello');
    },
    mounted () {
      this.fillChartData()
      console.log(this.stats)
      this.$buefy.snackbar.open({
        message: 'Welcome back',
        queue: false
      })
    },
    head () {
      return {
        title: 'Dashboard — EchoMTG'
      }
    },
    watch: {
      'stats.total_cards'(newValue) {
         console.log(newValue)
      }
    },
    computed: {
      titleStack () {
        return ['Admin', 'Dashboard']
      },
      totalCards () {

        return parseInt(this.stats.total_cards)
      },
      totalCardsValue(){
        let val = parseInt(this.stats.current_value_market) - parseInt(this.stats.sealed_value)
        console.log(val)
        return val
      }
    },
    async fetch() {
      let token = getCookie('token')
      let url = process.env.API_DOMAIN + 'inventory/quickstats/'
      url += `?auth=${token}`
      this.stats = await fetch(
        url
      ).then(res => res.json())
      this.stats = this.stats.stats
      console.log('stats',this.stats)

    },
    fetchOnServer: true,
    methods: {
      randomChartData (n) {
        const data = []

        for (let i = 0; i < n; i++) {
          data.push(Math.round(Math.random() * 200))
        }

        return data
      },
      fillChartData () {
        this.defaultChart.chartData = {
          datasets: [
            {
              fill: false,
              borderColor: chartConfig.chartColors.default.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: chartConfig.chartColors.default.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.randomChartData(9)
            },
            {
              fill: false,
              borderColor: chartConfig.chartColors.default.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: chartConfig.chartColors.default.info,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: chartConfig.chartColors.default.info,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.randomChartData(9)
            },
            {
              fill: false,
              borderColor: chartConfig.chartColors.default.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: chartConfig.chartColors.default.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.randomChartData(9)
            }
          ],
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
        }
      },
      actionSample () {
        this.$buefy.toast.open({
          message: 'Some action',
          type: 'is-info',
          queue: false
        })
      }
    }
  }
</script>
