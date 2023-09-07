<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad
      title="You Must be Logged in to Use the Stats App"
      image="https://assets.echomtg.com/images/product/earnings-app-2023.png"
      v-if="!authenticated" />
      <!-- Need app block for 3 and up -->
      <feature-locked-full v-if="authenticated" :levelRequired="3" :title="`Statistic Feature Locked`" />



      <feature-gate :gateLevel="3" :showAd="false">
        <section class="hero is-success">
          <div class="hero-body">
              <div class="container">
                  <h1 class="title">
                    Collection Statistics
                  </h1>
                  <h3 class="subtitle">
                    Earnings, Inventory, and list reports.
                  </h3>
              </div>
          </div>
        </section>
        <div class="container">
          <div class="columns">
            <div class="column">
              <pie-chart :chart-data="distributionData" :chart-options="chartOptions" />
            </div>
            <div class="column">
              <bar-chart :chart-data="barChartDistributionData" :chart-options="chartOptions" />
            </div>
          </div>
        </div>
      </feature-gate>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import FullAd from '~/components/cta/FullAd.vue'
import FeatureLockedFull from '~/components/cta/FeatureLockedFull.vue'
import FeatureGate from '~/components/user/FeatureGate.vue'

export default {
  name: 'Earnings',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    FullAd,
    FeatureLockedFull,
    FeatureGate
  },
  data () {
    return {
      loading: false,
      earnings: null,
      stats: null,
      quickstats: null,
      chartOptions: {
          legend: {
              display: false
          }
      },
      chartsColors: {
          'Black': 'rgba(38,38,38, 1)',
          'Blue': 'rgba(12,128,236, 1)',
          'Red': 'rgba(193,5,5, 1)',
          'White': 'rgba(255,255,178, 1)',
          'Green': 'rgba(54,124,73, 1)',
          'Colorless': 'rgba(180,169,144, 1)',
          'Multicolor': 'rgba(246,188,6, 1)',
          'Gold': 'rgba(246,188,6, 1)',
          'ManaCurve': 'rgba(200,200,200, 1)'
      },
      colorDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      distributionDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      distributionLabels: [
        'Individual Cards','Unopened Packs', 'Sealed Product'
      ]
    }
  },
  async fetch(){
      if(!this.authenticated) return;

      this.loading    = true;
      this.earnings   = (await this.getEarningsStats()).stats
      this.quickstats = (await this.$echomtg.inventoryQuickStats()).stats
      this.stats      = (await this.$echomtg.inventoryStats()).stats

      console.log('earnings',this.earnings)
      console.log('quick stats',this.quickstats)
      console.log('stats',this.stats)

      this.distributionDataset[0].data = [
        parseInt(this.quickstats.total_cards),
        parseInt(this.quickstats.total_packs),
        parseInt(this.quickstats.total_sealed)
      ];
      this.distributionDataset[0].backgroundColor = [
          'brown',
          'silver',
          'black',
      ];
      console.log(this.distributionDataset)

      this.loading    = false;
  },
  watch: {
    authenticated() {
      this.$fetch();
    }
  },
  methods: {

    async getEarningsStats(){
      return await this.$echomtg.getEarningsStats();
    },

  },

  computed: {
    distributionData(){
      return { datasets: this.distributionDataset, labels:this.distributionLabels }
    },
    barChartDistributionData(){
      return { datasets: this.distributionDataset, labels:this.distributionLabels }
    },
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''
        },
        {
          label: 'Statistics',
          url: '/apps/statistics/',
          icon: 'chart-pie'
        }
      ]
    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `Statistics: Gain Insight into your Your Collection`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Graphs and charts breaking down your trading card collections statistics.`
            }
          ]
      }
    }
}
</script>
