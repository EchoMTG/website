<template>
  <div class="homepage">
    <section class="section is-title-bar has-background-black">
      <div class="level">

        <div class="level-item has-text-centered">
          <h3 class="title is-3 mb-0 has-text-white">EchoMTG Proudly Tracks <span class="has-text-primary">${{millions}} Million</span> in Player Inventory</h3>
        </div>

      </div>
    </section>
    <div class="columns">
      <div class="column is-7 p-6 echo-header-text">
        <h1 class="title is-1 has-text-white">Start getting weekly updates on your Magic the Gathering collection!</h1>
        <p class="subtitle has-text-grey-lighter has-shadow is-4">Free membership gives you access to digital binder collection tools and user-only pricing features.</p>
      </div>
      <div class="column is-5">

        <UserSignUpForm  class="mt-6" />
      </div>
    </div>
    <tiles class="mr-5">

      <div class="card has-background-blac ml-5 k">
          <div class="cardContent has-text-centered m-3">
            <b-icon icon="currency-usd" custom-class="" type="is-success" size="is-large" />

            <h2 class="title mt-3 is-4 has-text-white">
              Collection tracking focused on financials
            </h2>
          </div>
      </div>
      <div class="card has-background-black">
          <div class="cardContent has-text-centered m-3">
            <b-icon icon="tools" custom-class="" type="is-success" size="is-large" />

            <h2 class="title mt-3 is-4 has-text-white">
              List, Decks, Watchlists and many more tools.
            </h2>
          </div>
      </div>
      <div class="card has-background-black">
          <div class="cardContent has-text-centered m-3">
            <b-icon icon="chart-areaspline" custom-class="" type="is-success" size="is-large" />

            <h2 class="title mt-3 is-4 has-text-white">
              7-day Gain/Loss Calculations
            </h2>
          </div>
      </div>mdi-email-fast-outline
      <div class="card has-background-black">
          <div class="cardContent has-text-centered m-3">
            <b-icon icon="chart-areaspline" custom-class="" type="is-success" size="is-large" />

            <h2 class="title mt-3 is-4 has-text-white">
             Weekly Automated Assessment Emails
            </h2>
          </div>
      </div>
    </tiles>

  </div>
</template>
<style scoped>
.echo-header-text{
  text-shadow: 0 0 4px black, 0 0 10px black,0 0 30px black;
}
</style>
<script>
import Tiles from '@/components/Tiles'
import UserSignUpForm from './blocks/UserSignUpForm'

export default {
  name: 'DefaultHomepage',
  data () {
    return {
      millions: 200
    }
  },
  components: {
      Tiles,
      UserSignUpForm
    },
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    hasClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>
