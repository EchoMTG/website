<template>
  <div v-if="authenticated">
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark is-small has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title  is-size-6-touch">EchoMTG Applications Stats</h1>

          </div>
      </div>
    </section>

    <div class="container">
      <div class="level is-mobile">
         <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Users</p>
            <p class="title is-size-6-touch">{{data_totals.users}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Inventory</p>
            <p class="title is-size-6-touch">{{data_totals.earnings}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Earnings</p>
            <p class="title is-size-6-touch">{{data_totals.earnings}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Notes</p>
            <p class="title is-size-6-touch">{{data_totals.notes}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Comments</p>
            <p class="title is-size-6-touch">{{data_totals.comments}}</p>
          </div>
        </div>
      </div>

    </div>
  <hr />


  </div>
</template>

<script>
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import * as chartConfig from '@/components/Charts/chart.config'

export default {
  name: 'admin',
  components: {
    EchoBreadCrumbs,
  },
  data () {
    return {
      loading: false,
      data_totals: {
        "inventory": 29465932,
        "items": 80500,
        "earnings": 364549,
        "tweet_queue": 5,
        "price_update_queue": 1,
        "users": 45629,
        "comments": 1021,
        "notes": 126978
      },
      stats: null,
    }
  },

  async fetch(){

      if(this.user.user_level < 3){
        this.$nuxt.context.error({
          statusCode: 404,
          message: 'Page Not Found'
        });
      } else {

        this.loading    = true;
        this.data_totals = (await this.getDataTotals()).totals

        this.loading    = false;
      }
  },

  methods: {
     async getDataTotals(){
      let url = `${this.$config.API_DOMAIN}super/data_totals/`;
      const res = await fetch(url, {
        headers: this.$echomtg.getUserHeaders(),
      });
      return await res.json();
    }

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
          label: 'Admin',
          url: '/admin/',
          icon: ''
        },
        {
          label: 'Totals',
          url: '/admin/data_totals/',
          icon: ''
        },
      ]
    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `Admin: Data Totals`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  ``
            }
          ]
      }
    }
}
</script>
