<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <div class="columns">
        <div v-for="plan in getPlans()" :key="plan.name" class="column pt-0 pl-0 pr-2">
          <div class="panel">
            <div class="panel-heading" :style="`background: ${plan.color}; color: ${plan.text}`">
                <span v-if="plan.prices.monthly > 0" class="is-pulled-right">${{plan.prices.monthly}}<small>/mo</small></span>
                <span v-if="plan.prices.monthly == 0" class="is-pulled-right">FREE</span>
                {{plan.label}}

            </div>
            <div class="panel-block">
              {{plan.description}}
            </div>
            <div class="panel-block  has-background-light">
              <small>Usage Limits</small>
            </div>
            <div class="panel-block">
              <div class="has-text-centered is-size-7">
                <b-icon title="Collection" size="is-small" class="has-text-lighter mr-1" icon="book-open-page-variant-outline" />
                {{plan.limits.inventory}}
                <b-icon title="Lists and Decks" size="is-small" class="has-text-lighter ml-2 mr-1" icon="archive-plus" />
                {{plan.limits.lists}}
                <b-icon title="Trade Items" size="is-small" class="has-text-lighter ml-3  mr-1" icon="hand-coin" />
                {{plan.limits.trade}}
              </div>
            </div>
            <div class="panel-block  has-background-light">
              <small>Weekly Email Reports</small>
            </div>
            <div class="panel-block">
              <div class="has-text-centered is-size-7">
                <span v-if="plan.emails.inventory">
                  <b-icon title="Collection Email Report" size="is-small" class="has-text-lighter mr-1" icon="book-open-page-variant-outline" />
                  Sunday
                </span>
                <span v-if="plan.emails.watchlist">
                  <b-icon title="Watchlist Email Report" size="is-small" class="has-text-lighter ml-2 mr-1" icon="eye-check-outline" />
                  Tuesday
                </span>
                <span v-if="plan.emails.trending">
                  <b-icon title="Trending Email Report" size="is-small" class="has-text-lighter mr-1 ml-2 " icon="trending-up" />
                  Thursday
                </span>
              </div>
            </div>
            <div class="panel-block has-background-light">
              <small>Apps</small>
            </div>
            <div class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="book-open-page-variant-outline" />
              </span>
              Collection App
            </div>
            <div class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="archive-plus" />
              </span>
              Lists / Decks
            </div>
            <div  v-if="plan.trade" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="hand-coin" />
              </span>
              Trade App
            </div>
            <div v-if="plan.sealed" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="eye-check-outline" />
              </span>
              Watchlist App
            </div>
            <div v-if="plan.sealed" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="gift" />
              </span>
              Sealed Product App
            </div>
            <div v-if="plan.earnings" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="cash-multiple" />
              </span>
              Earnings App
            </div>
            <div v-if="plan.stats" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="chart-areaspline" />
              </span>
              Statistics App
            </div>
            <div class="panel-block has-background-light">
              <small>Special Features</small>
            </div>
            <div v-if="plan.streamer" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="twitch" />
              </span>
              Streamer Perks
            </div>
            <div v-if="plan.filters" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="filter-check" />
              </span>
              Extra Inventory Filters
            </div>


            <div v-if="plan.ebay" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small"  icon="cart-arrow-up" />
              </span>
              eBay 1-Click Selling
            </div>
            <div v-if="plan.sms" class="panel-block">
              <span class="panel-icon">
                <b-icon size="is-small" icon="message-processing" />
              </span>
              SMS Price Alerts
            </div>


          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
export default {
  name: 'Billing',
  components: {
    Tiles,
    HeroBar,
    TitleBar
  },
  head () {
    return {
      title: 'Plans — EchoMTG'
    }
  },
  data() {
    return {

      customer: {},
      plan: '',

    }
  },
  async asyncData({ redirect, $echomtg }) {

  },
  mounted(){
    console.log('user from store',this.user)
  },
  methods: {

    getStripeAmount(amount){
      if(amount == 0) return 0;
      return amount / 100;
    },

    async addCard(){
      this.isCardModalActive = false
      const res = await this.$echomtg.addUserCreditCard(this.card_number,this.card_exp_month,this.card_exp_year,this.card_cvc);
      this.$buefy.snackbar.open({
          message: res.message,
          type: `is-${res.status}`,
          position: 'is-top',
      })
      await this.refreshData();
    },

    async refreshData(){

    },
    getDateFromUnixTimestamp(unix_timestamp){
      return new Date(unix_timestamp * 1000).toLocaleDateString("en-US");
    },
    getBillingDayFromUnixTimestamp(unix_timestamp){
      return new Date(unix_timestamp * 1000).getDate();
    },
    getPlans() {
      return [
        {
          name: 'common',
          label: 'Common',
          color: 'white',
          text: 'black',
          description: 'For testing out EchoMTG, tracking some cards, and interactiving with the community.',
          data: this.commonFeatures,
          prices: {
            monthly: 0,
            yearly: 0
          },
          emails: {
            watchlist: false,
            trending: false,
            inventory: true,
          },
          sealed: false,
          streamer: false,
          earnings: false,
          watchlist: true,
          insurance: false,
          lists: true,
          stats: false,
          filters: false,
          sms: false,
          trade: false,
          images: false,
          ebay: false,
          limits: {
            trade: 50,
            lists: 5,
            inventory: 360,
            watchlist: 3,
          }
        },
        {
          name: 'uncommon',
          label: 'Uncommon',
          color: 'gray',
          text: 'black',
          description: 'If your collection worth over $1000? Is it growing? Time to know your asset.',
          data: this.commonFeatures,
          prices: {
            monthly: 2.50,
            yearly: 25
          },
          emails: {
            watchlist: true,
            trending: false,
            inventory: true,
          },
          sealed: false,
          streamer: true,
          stats: false,
          earnings: false,
          insurance: false,
          watchlist: true,
          lists: true,
          filters: false,
          sms: false,
          trade: true,
          images: false,
          ebay: false,
          limits: {
            trade: 50,
            lists: 25,
            inventory: 5400,
            watchlist: 100,
          }
        },
        {
          name: 'rare',
          label: 'Rare',
          color: 'gold',
          text: 'black',
          description: 'If you have a single binder or deck worth over $1000 dollars than this is the plan for you.',
          data: this.commonFeatures,
          prices: {
            monthly: 3.50,
            yearly: 35
          },
          emails: {
            watchlist: true,
            trending: true,
            inventory: true,
          },
          sealed: true,
          streamer: true,
          stats: false,
          earnings: true,
          watchlist: true,
          insurance: false,
          lists: true,
          filters: false,
          sms: false,
          trade: true,
          images: false,
          ebay: false,
          limits: {
            trade: 1000,
            lists: 50,
            inventory: 11520,
            watchlist: 500,
          }
        },
        {
          name: 'mythic',
          label: 'Mythic',
          text: 'black',
          color: 'orange',
          description: 'For players and collectors with over $5K in inventory who need more tools.',
          data: this.commonFeatures,
          prices: {
            monthly: 7.75,
            yearly: 75
          },
          emails: {
            watchlist: true,
            trending: true,
            inventory: true,
          },
          sealed: true,
          earnings: true,
          watchlist: true,
          stats: true,
          streamer: true,
          lists: true,
          filters: true,
          insurance: false,
          sms: false,
          trade: true,
          images: false,
          ebay: false,
          limits: {
            trade: 3000,
            lists: 200,
            inventory: 36000,
            watchlist: 500,
          }
        },
        {
          name: 'reserved',
          label: 'Reserved',
          color: 'maroon',
          text: 'white',
          description: 'For fanatic collectors w/over $20K in cards and sealed product who the tools and extra space.',
          data: this.commonFeatures,
          prices: {
            monthly: 10.00,
            yearly: 100
          },
          emails: {
            watchlist: true,
            trending: true,
            inventory: true,
          },
          sealed: true,
          earnings: true,
          streamer: true,
          watchlist: true,
          filters: true,
          lists: true,
          insurance: true,
          stats: true,
          sms: true,
          trade: true,
          images: true,
          ebay: false,
          limits: {
            trade: 10000,
            lists: 400,
            inventory: 500000,
            watchlist: 1000,
          }
        },
        {
          name: 'pro',
          label: 'Pro',
          color: 'black',
          text: 'white',
          description: 'You fanatically collect, have a store, a collection over $50K, and or you actively sell on eBay.',
          data: this.commonFeatures,
          prices: {
            monthly: 15.00,
            yearly: 150
          },
          emails: {
            watchlist: true,
            trending: true,
            inventory: true,
          },
          sealed: true,
          stats: true,
          earnings: true,
          streamer: true,
          watchlist: true,
          insurance: true,
          filters: true,
          lists: true,
          sms: true,
          ebay: true,
          trade: true,
          images: true,
          limits: {
            trade: 25000,
            lists: 500,
            inventory: 1000000,
            watchlist: 5000,
          }
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Subscription Plans']
    },

    ...mapState(['user'])
  }
}
</script>
