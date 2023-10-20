<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark is-small has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">EchoMTG Users</h1>
          </div>
      </div>
    </section>


    <b-field class="px-3">
        <b-input placeholder="Search by username or email..."
            type="search"
            v-model="search"
            icon="magnify">
        </b-input>
    </b-field>

    <b-table
      striped
      narrowed
      :mobile-cards="false"
      :data="users"
      default-sort="last_login"
      default-sort-direction="desc"
      >
      <b-table-column field="email" sortable label="Email" v-slot="props">
        <b-icon :class="props.row.plan == 'common' ? 'has-text-grey' : 'has-text-success'" :icon="props.row.plan == 'common' ? 'account' : 'account-badge'" size="is-small" /> {{props.row.email}}
      </b-table-column>
      <b-table-column field="id" sortable label="ID" v-slot="props">
        {{props.row.id}}
      </b-table-column>
      <b-table-column field="username" sortable label="Username" v-slot="props">
        {{props.row.username}}
      </b-table-column>
       <b-table-column field="plan" sortable label="Plan" v-slot="props">
        <b-tag type="is-dark" :class="`${props.row.plan}-outline`">{{props.row.plan}}</b-tag>
      </b-table-column>
      <b-table-column field="stripe_id" sortable label="Stripe Link" v-slot="props">
        <b-tag type="is-dark"  v-if="!props.row.stripe_id && props.row.plan !== 'common'">free</b-tag>
        <a class="button is-small is-outlined" target="_blank" v-if="props.row.stripe_id" :href="`https://dashboard.stripe.com/customers/${props.row.stripe_id}`">
          <b-icon :icon="'currency-usd'" size="is-small" class="mr-1" /> {{props.row.stripe_id}}
        </a>
      </b-table-column>
      <b-table-column field="login_Count" sortable label="Logins" v-slot="props">
        {{props.row.login_Count}}
      </b-table-column>

       <b-table-column field="last_login" sortable label="Created/LastLogin" v-slot="props">
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
          title: `Admin: Users`,
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
