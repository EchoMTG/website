<template>
  <span>

      <echo-bread-crumbs :data="crumbs" />
      <hero-bar-main />

      <section class="mx-5 my-2">
        <div class="columns">
          <div class="column">
            <div class="message is-light p-4">
              <h2 class="has-text-weight-bold mb-2">Gain Bonus Storage by Sharing EchoMTG with a Friend</h2>
              <form method="post" class="level">
                  <b-input icon="email" type="text" class="level-item mr-2"	name="share_email" placeholder="friend@gmail.com"  />

                  <b-button icon-right="arrow-right-bold" label="Share Now" class="level-item" type="is-info" onclick="ga('send', 'event', 'Share Button', 'click');" />
              </form>
              <hr/>

              <form>
                <fieldset>
                  <label>Your custom share link. Copy the link below, and share.</label>
                  <input class="form-text" type="text" :value="`https://www.echomtg.com/r/${user.referrer_code}/`" />
                </fieldset>
              </form>
            </div>
          </div>
          <div class="column">
          </div>
        </div>
      </section>

      <section v-if="$fetchState.pending">
        Loading Dashboard
      </section>
      <section v-else class="section is-main-section">
        <card-component
          title="Collection Performance History"
          icon="finance"
          header-icon="reload"
          @header-icon-click="fillChartData"
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
      console.log(this.user)
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
