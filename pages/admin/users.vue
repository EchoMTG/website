<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">App Users</h1>
              <h3 class="subtitle">
                Search through Users by email or username
              </h3>
          </div>
      </div>
    </section>


    <b-field class="px-3">
        <b-input placeholder="Search by list name..."
            type="search"
            v-model="search"
            icon="magnify">
        </b-input>
    </b-field>

    <b-table
      striped
      narrowed
      :data="users"
      >
      <b-table-column :key="email" label="Email" v-slot="props">
        <b-icon :class="props.row.plan == 'common' ? 'has-text-grey' : 'has-text-success'" :icon="props.row.plan == 'common' ? 'account' : 'account-badge'" size="is-small" /> {{props.row.email}}
      </b-table-column>
      <b-table-column :key="referrer_url" label="Referrer" v-slot="props">
        {{props.row.referrer_url}}
      </b-table-column>
      <b-table-column :key="username" label="Username" v-slot="props">
        {{props.row.username}}
      </b-table-column>

       <b-table-column :key="plan" label="Plan" v-slot="props">
        {{props.row.plan}}
      </b-table-column>
      <b-table-column :key="plan" label="Stripe Link" v-slot="props">
        <a v-if="props.row.stripe_id" :href="`https://dashboard.stripe.com/customers/${props.row.stripe_id}`">
          <b-icon :icon="'currency-usd'" size="is-small" /> {{props.row.stripe_id}}
        </a>
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
  name: 'users',
  components: {
    EchoBreadCrumbs,
  },
  data () {
    return {
      loading: false,
      users: [],
      search: ''
    }
  },


  async fetch(){
      if(!this.authenticated) return;
      this.loading    = true;


      this.users = (await this.getUsers()).results
      console.log(this.users)

      this.loading    = false;
  },
  watch: {
    authenticated() {
      this.$fetch();
    },
    search(){

      this.$fetch();
    }
  },

  methods: {

    async getUsers(start=0,limit=100){
      let url = `${this.$config.API_DOMAIN}super/users/?start=${start}&limit=${limit}&search=${this.search}`;
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
