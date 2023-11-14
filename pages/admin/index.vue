<template>
  <div v-if="authenticated">
    <echo-bread-crumbs :data="crumbs" />

    <section class="hero is-dark is-small has-background-grey-dark mb-5">
      <div class="hero-body">
          <div class="container">
              <h1 class="title  is-size-6-touch">Lastest Users</h1>

          </div>
      </div>
    </section>

    <div class="container">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Users</p>
            <p class="title is-size-6-touch">{{latestUsers.meta.total}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Avg Per Day</p>
            <p class="title is-size-6-touch">{{(latestUsers.meta.total / days).toFixed(2)}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Total Paid</p>
            <p class="title is-size-6-touch">{{totalPaid}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Conversion %</p>
            <p class="title is-size-6-touch">{{((totalPaid / latestUsers.meta.total) * 100).toFixed(2)}}%</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-7-touch">Timeframe</p>
            <p class="title is-size-6-touch">
              <b-select v-model="days">
                <option v-for="day in 30" v-bind:key="`index${day}`" :value="day">{{day}}</option>
              </b-select>
            </p>
          </div>
        </div>

      </div>

    </div>
  <hr />
  <h3 class="title is-size-4 ml-3">
    {{latestUsers.meta.total}} new users in the last {{days}} days
  </h3>

    <b-table
      striped
      narrowed
      :loading="loading"
      :mobile-cards="false"
      :data="latestUsers.results"
      :row-class="(row, index) => row.plan !== 'common' && 'has-background-success'"
      >
      <b-table-column field="username" label="Username" v-slot="props">
        {{props.row.username}} [{{props.row.id}}]
      </b-table-column>
      <b-table-column field="card_count" label="Items" v-slot="props">
        {{props.row.card_count}}
      </b-table-column>
      <b-table-column field="referrer_url" label="Referrer" v-slot="props">
        {{props.row.referrer_url}} {{props.row.device_type}} {{props.row.platform}}
      </b-table-column>
      <b-table-column field="capture_url" label="Entry/Capture" v-slot="props">
        <code>{{props.row.entry_url}}</code> <code>{{props.row.capture_url}}</code>
      </b-table-column>

      <b-table-column field="email" label="Email" v-slot="props">
        {{props.row.email}}
      </b-table-column>
       <b-table-column field="plan" label="Plan" v-slot="props">
        <b-tag :class="`${props.row.plan}-background`">{{props.row.plan}}</b-tag>
      </b-table-column>
       <b-table-column field="date_created" label="Created/LastLogin" v-slot="props">
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
      days: 2,
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
  watch: {
    async days() {
      this.latestUsers = await this.getLatestUsers(this.days)
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
        this.latestUsers = await this.getLatestUsers(this.days)


        this.loading    = false;
      }
  },

  methods: {
    async getLatestUsers(days=1){
      this.loading = true;
      let url = `${this.$config.API_DOMAIN}super/latest_signups/?days=${days}`;
      const res = await fetch(url, {
        headers: this.$echomtg.getUserHeaders(),
      });
      this.loading = false;
      return await res.json();

    },

  },

  computed: {

    crumbs() {
      return [
        {
          label: 'Admin',
          url: '/admin/',
          icon: ''
        },
      ]
    },
    totalPaid(){
      return this.latestUsers.results.filter(item => item.plan != 'common').length
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
