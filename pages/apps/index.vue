<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Magic: the Gathering Collector Tools </h1>
      <p>EchoMTG offer many tools for you to track all the card and products in the magic the gathering universe</p>

    </div>

    <div class="columns is-multiline m-3">
      <div class="column is-one-quarter" v-for="(tool,index) in tools" :key="`${tool.name}${index}`">
        <div class="card">

          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <b-icon :icon="tool.icon" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{tool.name}}</p>
              </div>
            </div>

            <div class="content">
              {{tool.description}}
            </div>
          </div>
          <footer class="card-footer">
            <a :href="tool.url" class="card-footer-item">Open the {{tool.name}} Tool</a>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Apps',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      test: null,
      userhash: null
    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''

        }
      ]
    },
    tools() { return [
        {
          name: `Inventory`,
          description: `Track your collection, single cards and sealed items, by acquired price and date.`,
          icon: `animation`,
          url: `/apps/inventory/`
        },
        {
          name: `Decks and Lists`,
          description: `Create lists and decks of cards, it will automatically match cards you own to your lists. Lists can be shared.`,
          icon:  `clipboard-list`,
          url: `/apps/lists/`
        },
        {
          name: `Sealed`,
          description: `Gain insight to the unopened product in your collection with the sealed tool.`,
          icon: `wallet-giftcard`,
          url: `/apps/sealed/`
        },
        {
          name: `Watchlist`,
          description: `Track the price movement of specific magic items.`,
          icon:  `eye`,
          url: `/apps/watchlist/`
        },
        {
          name: `Tradelist`,
          description: `Mark inventory items for trade to access a publically available tradelist.`,
          icon:  `handshake`,
          url: this.authenticated ? `/apps/trades/${this.$echomtg.tradesUserHash(this.user.id)}/` : `/apps/trades/`
        },
        {
          name: `Earnings`,
          description: `Track you item sales.`,
          icon:  `cash-multiple`,
          url: `/apps/earnings/`
        },
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  head () {
      return {
          title: `Collector Tools for Magic the Gathering`,
          description: `A suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
      }
    }
}
</script>
