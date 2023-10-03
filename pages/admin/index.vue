<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">App Stats</h1>
              <h3 class="subtitle">
                Echo Application Statistics
              </h3>
          </div>
      </div>
    </section>

    <div class="container">
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total Items</p>
            <p class="title">0</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Current Value</p>
            <p class="title">0</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Current Value (tcg low)</p>
            <p class="title">0</p>
          </div>
        </div>

        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Cards Value</p>
            <p class="title">0</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Sealed Value</p>
            <p class="title">0</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Packs Value</p>
            <p class="title">0</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column" style="height: 200px">
          <h2 class="title is-size-4 has-text-centered" >Quantity Distribution of Collection Item Types</h2>
          <!-- <pie-chart  :chart-data="distributionData" :chart-options="chartOptionsBar" /> -->
        </div>
        <div class="column">
          <h2 class="title is-size-4 has-text-centered">Financial Distribution of Collection Item Types</h2>
          <!-- <bar-chart :chart-data="distributionValueData" :chart-options="chartOptionsBar" /> -->
        </div>
      </div>
      <hr />

    </div>

    <h2 class="title is-size-4">{{latestUsers.meta.total}} new users in the last {{latestUsers.meta.days}} days</h2>
    <b-table
      striped
      narrowed
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
        {{props.row.plan}}
      </b-table-column>
       <b-table-column :key="plan" label="Created/LastLogin" v-slot="props">
        {{props.row.date_created}}/{{props.row.last_login}}
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
      latestUsers: {
        results: [],
        meta: {
          total: 0,
          days: 2
        }
      },
      stats: null,

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
      }]


    }
  },


  async fetch(){
      if(!this.authenticated) return;
      this.loading    = true;


      this.latestUsers = await this.getLatestUsers(2)
      console.log(this.latestUsers)

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
