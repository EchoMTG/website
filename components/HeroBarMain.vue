<template>
  <section class="hero is-hero-bar is-main-hero">
    <div class="hero-body">
      <div class="level">
        <div class="level-left">

          <div class="level-item is-hero-avatar-item">


            <div class="image is-user-avatar" style="max-width:200px">
              <img alt="User Avatar" :src="getAvatar()">
            </div>
          </div>
          <div class="level-item is-hero-content-item">
            <div>
              <h1 class="title is-spaced mb-2 is-size-5-touch">
                Greetings <b class="is-capitalized">{{ user.username }}!</b>
              </h1>
              <div class="is-flex mb-3">
                <nuxt-link to="/apps/inventory/" class="is-block button is-dark is-small mr-1" title="Profile">
                  <b-icon icon="book-open-page-variant-outline"  custom-size="default" />
                  <span>Manage Inventory</span>
                </nuxt-link>
                <nuxt-link :to="`/apps/trades/${this.$echomtg.tradesUserHash(user.id)}/`" class="is-block button is-light is-small mr-1" title="Profile">
                  <b-icon icon="briefcase-arrow-left-right"  custom-size="default" />
                  <span>View Trades</span>
                </nuxt-link>
                <nuxt-link to="/apps/import/" class="is-block button is-info is-small" title="Profile">
                  <b-icon icon="download"  custom-size="default" />
                  <span>Import Inventory</span>
                </nuxt-link>
            </div>

              <h3 class="subtitle mt-1 is-size-7 has-text-grey	">
                It's <b>{{this.$moment().format('MMMM Do YYYY')}}</b> and your <b>{{quickstats.total_items}} items</b> <br/>
              are estimated to be worth <b>{{quickstats.currency_symbol}}{{quickstats.current_value}}</b>.
                <!-- Last login: <b>{{ user.last_login }}</b> -->
              </h3>


            </div>
          </div>
        </div>
        <div class="level-right is-hidden-touch">
          <div class="level-item">
            <div v-if="quickstats.total_items > 5" class="tile">
              <div class="tile is-child pr-3">
                <card-widget
                    type="is-info-dark"
                    icon="book-open-page-variant-outline"
                    prefix="$"
                    :number="parseFloat(quickstats.current_value)"
                    :previous-number="parseInt(quickstats.total_items)"
                    previous-period="Tracked Items"
                    label="Collection Value"
                  />
              </div>
              <div class="tile is-child pr-3">
                <card-widget
                  type="is-warning-dark"
                  icon="cards"
                  :number="parseFloat(quickstats.current_value - quickstats.sealed_value)"
                  prefix="$"
                  :previous-number="parseInt(quickstats.total_cards)"
                  previous-period="Single Cards"
                  label="Single Card Value"
                />
              </div>
              <div class="tile is-child">
                <card-widget
                  type="is-success-dark"
                  icon="gift"
                  :number="parseFloat(quickstats.sealed_value)"
                  prefix="$"
                  previous-period="Sealed Items"
                  :previous-number="parseInt(quickstats.total_sealed)"
                  label="Sealed Value"
                />
              </div>
            </div>
            <getting-started v-if="quickstats.total_items <= 5"/>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CardWidget from '@/components/CardWidget'
import GettingStarted from '@/components/onboarding/GettingStarted'

export default {

  name: 'HeroBarMain',
   components: {
      CardWidget,
      GettingStarted
    },
  methods: {
    getAvatar () {
      if (this.user.avatar) {
        return this.user.avatar
      }

      return `https://assets.echomtg.com/interface/echomtg-mage-avatar.png`
    }
  },
  computed: {
    ...mapState(['user','quickstats'])
  }
}
</script>
