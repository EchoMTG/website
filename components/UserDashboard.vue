<template>
  <span>
      <title-bar :title-stack="titleStack" />
      <hero-bar-main />
      <section class="section is-main-section">
        <tiles>
          <card-widget
            class="tile is-child"
            type="is-primary"
            icon="account-multiple"
            :number="512"
            :previous-number="384"
            previous-period="July, 2019"
            label="Clients"
          />
          <card-widget
            class="tile is-child"
            type="is-info"
            icon="cart-outline"
            :number="7770"
            :previous-number="7000"
            previous-period="July, 2019"
            prefix="$"
            label="Sales"
          />
          <card-widget
            class="tile is-child"
            type="is-success"
            icon="chart-timeline-variant"
            :number="256"
            :previous-number="384"
            previous-period="July, 2019"
            suffix="%"
            label="Performance"
          />
          <card-widget
            class="tile is-child"
            type="is-danger"
            icon="bell"
            :number="32"
            :previous-number="64"
            label="Alerts"
            previous-period="July, 2019"
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

        <card-component
          title="Clients"
          icon="account-multiple"
          class="has-table has-mobile-sort-spaced"
          :has-button-slot="true"
        >
          <refresh-button slot="button" />
          <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
              <button class="button is-active" @click="actionSample">
                Active
              </button>
              <button class="button" disabled>
                Recent
              </button>
              <button class="button" disabled>
                Archived
              </button>
            </div>
            <form slot="right" @submit.prevent="actionSample">
              <div class="field has-addons">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Sample field..."
                  >
                </div>
                <div class="control">
                  <button type="submit" class="button is-primary">
                    <b-icon icon="dots-horizontal" custom-size="default" />
                  </button>
                </div>
              </div>
            </form>
          </card-toolbar>
          <clients-table-sample data-url="/data-sources/clients.json" />
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
        mountains: [],
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
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())

    },
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
