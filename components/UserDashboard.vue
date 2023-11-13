<template>
  <span>

      <hero-bar-main  v-if="!newUser" />

      <div class="has-background-black">
        <section v-if="!newUser" class="mx-5 my-2">
          <div class="columns">
            <div class="column">
              <popular-items />
            </div>
            <div class="column">
              <invite-friend />
            </div>
          </div>
        </section>
        <div v-if="newUser" style="max-width: 960px; margin: 0 auto;">
          <welcome></welcome>
        </div>
        <section v-if="!newUser && $fetchState.pending">
          Loading Dashboard
        </section>
        <section v-else-if="!newUser && quickstats.total_items > 5" class="mx-5 my-2">
          <card-component
            title="Collection Performance History"
            icon="finance"
          >
            <client-only>
              <div v-if="defaultChart.chartData" class="chart-area">
                <line-chart
                  ref="bigChart"
                  style="height: 100%"
                  chart-id="big-line-chart"
                  :chart-data="defaultChart.chartData"
                  :chart-options="defaultChart.extraOptions"
                />
              </div>
            </client-only>
          </card-component>
        </section>
      </div>
  </span>
</template>
<script>
import * as chartConfig from '@/components/Charts/chart.config'
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import HeroBarMain from '@/components/HeroBarMain'
import CardToolbar from '@/components/CardToolbar'
import RefreshButton from '@/components/RefreshButton'
import EchoBreadCrumbs from '@/components/navigation/EchoBreadCrumbs.vue'
import PopularItems from '@/components/onboarding/PopularItems.vue'
import Welcome from '@/components/onboarding/Welcome.vue'
import InviteFriend from '@/components/cta/InviteFriend.vue'


  export default {
    name: 'UserDashboard',
    components: {
      RefreshButton,
      CardToolbar,
      HeroBarMain,
      CardComponent,
      CardWidget,
      Tiles,
      TitleBar,
      EchoBreadCrumbs,
      PopularItems,
      InviteFriend,
      Welcome
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

        return parseInt(this.quickstats.total_cards)
      },
      newUser() {
        return parseInt(this.user.id) == 0
      },
      totalCardsValue(){
        let val = parseInt(this.quickstats.current_value) - parseInt(this.quickstats.sealed_value)
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
      'isAsideMobileExpanded',
      'quickstats',
      'user',
      'authenticated'
      ]),

    },
    watch: {
    '$route.query': '$fetch'
    },
    async fetch() {
      const quickstats = await this.$echomtg.inventoryQuickStats();
      if(quickstats.status == 'success'){
        this.$store.commit('quickstats',quickstats.stats);
      }
      let token = this.$cookies.get('token');

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
            labels.push(this.$moment.unix(this.history.data[i].ts).format("MM/DD/YYYY"))
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
              label: 'Market Value',
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
              label: 'Purchase Price (Acquired for Value)',
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
