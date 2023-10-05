<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">EchoMTG Applications Stats</h1>

          </div>
      </div>
    </section>

    <div class="container">
      <div class="level">
         <div class="level-item has-text-centered">
          <div>
            <p class="heading">Users</p>
            <p class="title">{{data_totals.users}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Inventory</p>
            <p class="title">{{data_totals.earnings}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Earnings</p>
            <p class="title">{{data_totals.earnings}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Notes</p>
            <p class="title">{{data_totals.notes}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Comments</p>
            <p class="title">{{data_totals.comments}}</p>
          </div>
        </div>
      </div>

    </div>
  <hr />
  <h3 class="title is-size-4 ml-3">
                {{latestUsers.meta.total}} new users in the last {{latestUsers.meta.days}} days
              </h3>


    <b-table
      striped
      narrowed
      :mobile-cards="false"
      :data="latestUsers.results"
      :row-class="(row, index) => row.plan !== 'common' && 'has-background-success'"
      >

      <b-table-column :key="card_count" label="Items" v-slot="props">
        {{props.row.card_count}}
      </b-table-column>
      <b-table-column :key="referrer_url" label="Referrer" v-slot="props">
        {{props.row.referrer_url}}
      </b-table-column>
      <b-table-column :key="username" label="Username" v-slot="props">
        {{props.row.username}}
      </b-table-column>
      <b-table-column :key="email" label="Email" v-slot="props">
        {{props.row.email}}
      </b-table-column>
       <b-table-column :key="plan" label="Plan" v-slot="props">
        <b-tag :class="`${props.row.plan}-background`">{{props.row.plan}}</b-tag>
      </b-table-column>
       <b-table-column :key="plan" label="Created/LastLogin" v-slot="props">
        <b-tag>{{props.row.date_created}}</b-tag> <b-tag type="is-dark" v-if="props.row.last_login !== props.row.date_created">{{props.row.last_login}}</b-tag>
      </b-table-column>



    </b-table>
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
      latestUsers: {
        results: [],
        meta: {
          total: 0,
          days: 2
        }
      },
      stats: null,



    }
  },


  async fetch(){
      if(!this.authenticated) return;
      this.loading    = true;


      this.latestUsers = await this.getLatestUsers(2)
      this.data_totals = (await this.getDataTotals()).totals

      this.loading    = false;
  },
  watch: {
    authenticated() {
      this.$fetch();
    }
  },

  methods: {

    async getLatestUsers(days=1){
      let url = `${this.$config.API_DOMAIN}super/latest_signups/?days=${days}`;
      const res = await fetch(url, {
        headers: this.$echomtg.getUserHeaders(),
      });
      return await res.json();
    },
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
      ]
    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `Admin: Dashboard`,
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
