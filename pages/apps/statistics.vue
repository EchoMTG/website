<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad 
      title="You Must be Logged in to Use the Stats App" 
      image="https://assets.echomtg.com/images/product/earnings-app-2023.png"
      v-if="!authenticated" />
      <span v-if="authenticated">
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
     


    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import SoldPriceInput from '~/components/earnings/SoldPriceInput.vue'
import AcquiredPriceInput from '~/components/earnings/AcquiredPriceInput.vue'
import DateInput from '~/components/earnings/DateInput.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import FullAd from '~/components/cta/FullAd.vue'

export default {
  name: 'Earnings',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DateInput,
    SoldPriceInput,
    AcquiredPriceInput,
    FullAd
  },
  data () {
    return {
      loading: false,
      stats: {
        acquired_value: 0,
        sold_value: 0,
        gainLoss: 0

      }
    }
  },
  async fetch(){
      if(!this.authenticated) return;
      
      this.loading = true;
      await this.getEarningsStats()
      await this.getEarnings();
      this.loading = false;
  },
  methods: {
    
    async getEarningsStats(){
      let data = await this.$echomtg.getEarningsStats();
      this.stats = data.stats;
      this.total = data.stats.total_cards;
    },
   
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {

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
          icon: 'pie-chart'
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
