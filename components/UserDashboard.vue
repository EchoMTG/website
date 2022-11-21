<template>
  <span>

      <echo-bread-crumbs :data="crumbs" />
      <hero-bar-main />

      <section v-if="$fetchState.pending">
        Loading Dashboard
      </section>
      <section v-else class="section is-main-section">

        <tiles>
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="currency"
            prefix="$"
            :number="parseFloat(stats.current_value)"
            :previous-number="parseInt(stats.total_items)"
            previous-period=" Tracked Items"
            label="Collection Value"
          />
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="USD"
            :number="totalCardsValue"
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
              :chart-options="defaultChart.extraOptions"
            />
          </div>
        </card-component>
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
import ClientsTableSample from '@/components/ClientsTableSample'
import HeroBarMain from '@/components/HeroBarMain'
import CardToolbar from '@/components/CardToolbar'
import CardScrollable from '@/components/CardScrollable'
import RefreshButton from '@/components/RefreshButton'
import EchoBreadCrumbs from './navigation/EchoBreadCrumbs.vue'
  export default {
    name: 'UserDashboard',
    components: {
      RefreshButton,
      CardScrollable,
      CardToolbar,
      HeroBarMain,
      ClientsTableSample,
      CardComponent,
      CardWidget,
      Tiles,
      TitleBar,
        EchoBreadCrumbs
    },
    data() {
      return {
        stats: {

        },
        history: {
          data: []
        },
        defaultChart: {
          chartData: null,
          extraOptions: chartConfig.chartOptionsMain
        }
      }
    },
    mounted () {
      this.fillChartData()
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
    computed: {
      titleStack () {
        return ['Admin', 'Dashboard']
      },
      totalCards () {

        return parseInt(this.stats.total_cards)
      },
      totalCardsValue(){
        let val = parseInt(this.stats.current_value) - parseInt(this.stats.sealed_value)
        return val
      },
      crumbs: () => [
        {
          url: '/',
          label: 'Dashboard',
          icon: ''
        }
      ],
      ...mapState([
      'isAsideVisible',
      'isAsideExpanded',
      'isAsideMobileExpanded'
      ]),

    },
    watch: {
    '$route.query': '$fetch'
    },
    async fetch() {

      let token = this.$cookies.get('token');
      let url = this.$config.API_DOMAIN + 'inventory/quickstats/';
      url += `?auth=${token}`;
      this.stats = await fetch(url).then(res => res.json())
      this.stats = this.stats.stats
      let historyURL = this.$config.API_DOMAIN + `inventory/history/?auth=${token}`;

      this.history = await fetch(historyURL).then(res => res.json())
      this.fillChartData();
    },
    fetchKey: 'dashboard',
    fetchOnServer: false,
    methods: {
      historyChartLabels () {
        let labels = []
        if(this.history.data.length > 0){
          for(var i=0; i < this.history.data.length; i++){
            labels.push(this.history.data[i].ts)
          }
        }
        return labels;
      },
      historyValue () {
        let values = []
        if(this.history.data.length > 0){
          for(var i=0; i < this.history.data.length; i++){
            values.push(this.history.data[i].recorded_value)
          }
        }
        return values;
      },
      historyBoughtValue () {
        let values = []
        if(this.history.data.length > 0){
          for(var i=0; i < this.history.data.length; i++){
            values.push(this.history.data[i].invested_value)
          }
        }
        return values;
      },
      fillChartData () {

        this.defaultChart.chartData = {
          labels: this.historyChartLabels(),
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
              data: this.historyValue()
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
              data: this.historyBoughtValue()
            }
          ],

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
