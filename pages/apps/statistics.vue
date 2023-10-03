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
        <section class="hero is-dark has-background-grey-dark mb-5">
          <div class="hero-body">
              <div class="container">
                  <h1 class="title">
                    <strong class="is-capitalized">{{user.username}}'s</strong> Collection Statistics
                  </h1>
                  <h3 class="subtitle">
                    Earnings, Inventory, and list reports.
                  </h3>
              </div>
          </div>
        </section>

        <div class="container">
          <div class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Total Items</p>
                <p class="title">{{ quickstats?.total_items }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Current Value</p>
                <p class="title">{{quickstats?.currency_symbol}}{{ quickstats?.current_value }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Current Value (tcg low)</p>
                <p class="title">{{quickstats?.currency_symbol}}{{ quickstats?.current_value_low }}</p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Cards Value</p>
                <p class="title">{{quickstats?.currency_symbol}}{{ quickstats?.cards_value }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Sealed Value</p>
                <p class="title">{{quickstats?.currency_symbol}}{{ quickstats?.sealed_value }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Packs Value</p>
                <p class="title">{{quickstats?.currency_symbol}}{{ quickstats?.packs_value }}</p>
              </div>
            </div>
          </div>
          <hr />
          <div class="columns">
            <div class="column" style="height: 200px">
              <h2 class="title is-size-4 has-text-centered" >Quantity Distribution of Collection Item Types</h2>
              <pie-chart  :chart-data="distributionData" :chart-options="chartOptionsBar" />
            </div>
            <div class="column">
              <h2 class="title is-size-4 has-text-centered">Financial Distribution of Collection Item Types</h2>
              <bar-chart :chart-data="distributionValueData" :chart-options="chartOptionsBar" />
            </div>
          </div>
          <hr />
          <div class="container">
            <h2 class="title is-size-4 has-text-centered">Color/Rarity Value Distribution for Magic: the Gathering</h2>
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Colorless ({{ stats?.colorless.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.colorless.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[0]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">White ({{ stats?.white.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.white.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[1]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Blue ({{ stats?.blue.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.blue.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[2]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Black ({{ stats?.black.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.black.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[3]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Red ({{ stats?.red.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.red.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[4]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Green ({{ stats?.green.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.green.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[5]}; height: 3px;`"></div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Multicolor ({{ stats?.multicolor.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.multicolor.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[6]}; height: 3px;`"></div>
                </div>
              </div>

              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Land ({{ stats?.land.total_cards }} items)</p>
                  <p class="title">{{quickstats?.currency_symbol}}{{ stats?.land.current_value }}</p>
                  <div :style="`background: ${rarityDistributionDataset[0]?.backgroundColor[7]}; height: 3px;`"></div>
                </div>
              </div>


            </div>


            <bar-chart :chart-data="rarityData" :chart-options="chartOptionsRarity" />
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
import * as chartConfig from '@/components/Charts/chart.config'

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
      colorDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      distributionDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      distributionValueDataset: [{
        'label': 'Financial Value',
        'data' : [],
        'backgroundColor' : []
      }],
      distributionLabels: [
        'Individual Cards','Unopened Packs', 'Sealed Product'
      ],
      rarityDistributionDataset: [{
        'label': 'Mythic',
        'data' : [],
        'backgroundColor' : [

          chartConfig.allChartColors.grey,
          chartConfig.allChartColors.yellow,
          chartConfig.allChartColors.blue,
          chartConfig.allChartColors.black,
          chartConfig.allChartColors.red,
          chartConfig.allChartColors.green,
          chartConfig.allChartColors.gold,
          chartConfig.allChartColors.brown
        ]
      }],
      rarityLabels: [
      'Colorless','White', 'Blue', 'Black', 'Red', 'Green', 'Multicolor','Lands'
      ]


    }
  },


  async fetch(){
      if(!this.authenticated) return;

      this.loading    = true;
      this.earnings   = (await this.getEarningsStats()).stats
      this.quickstats = (await this.$echomtg.inventoryQuickStats()).stats
      this.stats      = (await this.$echomtg.inventoryStats()).stats


      // type distribution
      this.distributionDataset[0].data = [
        parseInt(this.quickstats.total_cards),
        parseInt(this.quickstats.total_packs),
        parseInt(this.quickstats.total_sealed)
      ];
      this.distributionDataset[0].backgroundColor = [
          chartConfig.allChartColors.lightgrey,
          chartConfig.allChartColors.grey,
          chartConfig.allChartColors.darkgrey,
      ];
      // type value
      this.distributionValueDataset[0].data = [
        parseFloat(this.quickstats.cards_value),
        parseFloat(this.quickstats.packs_value),
        parseFloat(this.quickstats.sealed_value)
      ];
      this.distributionValueDataset[0].backgroundColor = this.distributionDataset[0].backgroundColor;

      // Rarity Distribution
      this.rarityDistributionDataset[0].data = [
        this.stats.colorless.mythics_value,
        this.stats.white.mythics_value,
        this.stats.blue.mythics_value,
        this.stats.black.mythics_value,
        this.stats.red.mythics_value,
        this.stats.green.mythics_value,
        this.stats.multicolor.mythics_value,
        this.stats.land.mythics_value
      ]

      this.rarityDistributionDataset.push({
        label: 'Rare',
        data: [
          this.stats.colorless.rares_value,
          this.stats.white.rares_value,
          this.stats.blue.rares_value,
          this.stats.black.rares_value,
          this.stats.red.rares_value,
          this.stats.green.rares_value,
          this.stats.multicolor.rares_value,
          this.stats.land.rares_value
        ],
        backgroundColor: this.rarityDistributionDataset[0].backgroundColor
      })
      this.rarityDistributionDataset.push({
        label: 'Uncommon',
        data: [
          this.stats.colorless.uncommons_value,
          this.stats.white.uncommons_value,
          this.stats.blue.uncommons_value,
          this.stats.black.uncommons_value,
          this.stats.red.uncommons_value,
          this.stats.green.uncommons_value,
          this.stats.multicolor.uncommons_value,

          this.stats.land.uncommons_value
        ],
        backgroundColor: this.rarityDistributionDataset[0].backgroundColor
      })
      this.rarityDistributionDataset.push({
        label: 'Common',
        data: [
          this.stats.colorless.commons_value,
          this.stats.white.commons_value,
          this.stats.blue.commons_value,
          this.stats.black.commons_value,
          this.stats.red.commons_value,
          this.stats.green.commons_value,
          this.stats.multicolor.commons_value,
          this.stats.land.commons_value
        ],
        backgroundColor: this.rarityDistributionDataset[0].backgroundColor
      })



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
    distributionValueData(){
      return { datasets: this.distributionValueDataset, labels:this.distributionLabels }
    },
    rarityData(){
      return { datasets: this.rarityDistributionDataset, labels:this.rarityLabels }
    },
    chartOptions(){
      return chartConfig.chartOptionsMain
    },
    chartOptionsBar(){
      return chartConfig.chartOptionsBar
    },
    chartOptionsRarity(){
      return {
        ...chartConfig.chartOptionsBar,

        legend: {
          label: {
            color: '#000000'
          }
        }

      }
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
