<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">Financials</h1>
              <h3 class="subtitle">
                Information on paid users
              </h3>
          </div>
      </div>
    </section>

    <div class="container">
      <div class="level">
         <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total Paid last {{paidMeta.days_between}} Days</p>
            <p class="title">{{paidMeta.total}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Avg. Paid Per Month</p>
            <p class="title">{{paidMeta.average_per_month}}</p>
          </div>
        </div>

      </div>
      <hr />
      <div class="columns">
        <div class="column" style="height: 200px">
          <h2 class="title is-size-4 has-text-centered" >User Plan Distribution</h2>
          <client-only>
            <pie-chart  :chart-data="plansData" :chart-options="chartOptions" />
          </client-only>
        </div>

      </div>

    </div>

    <h2 class="title is-size-4">{{paidMeta.total}} new users in the last {{paidMeta.days_between}} days</h2>
    <b-table
    v-if="paidUsers.length > 0"
      striped
      narrowed
      :data="paidUsers"
      >
      <b-table-column :key="plan" label="Plan" v-slot="props">
        <b-tag :class="`${props.row?.plan ? props.row.plan : '' }-background`">{{props.row.plan}}</b-tag>
      </b-table-column>
      <b-table-column :key="referrer_url" label="Referrer" v-slot="props">
        {{props.row.referrer_url}}
      </b-table-column>
      <b-table-column :key="username" label="User" v-slot="props">
        <strong>{{props.row.username}}</strong> <span>{{props.row.email}}</span>
      </b-table-column>

       <b-table-column :key="month_created" label="Month Created" v-slot="props">
        <b-tag>{{props.row.month_created}}</b-tag>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import * as chartConfig from '@/components/Charts/chart.config'

export default {
  name: 'financials',
  components: {
    EchoBreadCrumbs,
  },
  data () {
    return {
      loading: false,
      paidMeta: {},
      paidUsers:[],
      stats: null,

      colorDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      plansDataset: [{
        'data' : [],
        'backgroundColor' : []
      }],
      plansLabels: [],
      distributionValueDataset: [{
        'label': 'Financial Value',
        'data' : [],
        'backgroundColor' : []
      }]


    }
  },


  async fetch(){
      this.loading    = true;
      const data = await this.getLatestPaidUsers();


      this.paidUsers = data.results
      this.paidMeta = data.meta
      this.plansDataset[0].data = Object.values(data.plan);
      this.plansLabels = Object.keys(data.plan);



      this.loading    = false;
  },
  watch: {
    authenticated() {
      this.$fetch();
    }
  },

  methods: {

    async getLatestPaidUsers(date_start=false, date_end=false){
      return await this.$echomtg.getReq(`super/paid_users/`);
    },

  },

  computed: {
    plansData(){
      console.log('data',this.plansDataset)
      return {
        datasets: this.plansDataset,
        labels: this.plansLabels
      }
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
