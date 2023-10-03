<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title has-text-white">
               MTG Stock Market
            </h1>
            <h3 class="subtitle has-text-white">
                Shakers and movers for each magic the gathering set!
            </h3>
          </div>
          <div class="column is-one-third" v-if="!authenticated">
           <h4 class="title is-size-5 has-text-white">Start Tracking Your Collection</h4>
           <create-account-modal />
          </div>
        </div>
        <div class="is-flex">
        <b-select v-model="year" class=" mr-3">
          <option value="">Select Year</option>
          <option>---</option>
          <option v-for="year in years" v-bind:key="year" :value="year">
            {{year}}
          </option>
        </b-select>
        <b-field class="is-flex-grow-2">
          <b-input class="is-fullwidth" placeholder="Search by name or set code..."
              type="search"
              v-model="search"
              icon="magnify">
          </b-input>
        </b-field>

      </div>
      </div>

    </section>

    <section>
      <div class="columns is-multiline is-gapless">
        <div class="column is-one-third" v-for="set in sets.data" v-bind:key="set.id">
          <div class="has-background-black has-text-white is-flex py-2">
            <img :src="set.set_image" :alt="`${set.name} set symbol`" style="height:24px" class="mr-2 ml-2"  />
            <h2 class="has-text-white is-flex-grow-1 ">
              <nuxt-link :to="set.echo_set_url">{{set.name}}</nuxt-link>
            </h2>
            <div class="has-text-right mr-2 has-text-grey">{{set.date}}</div>
          </div>
          <table class="table is-striped is-fullwidth is-narrow">
            <tbody>
              <tr v-for="card in set.items" v-bind:key="card.emid">
                <td class="is-flex">
                  <b-icon size="is-small" icon="triangle-small-up" class="has-text-success" v-if="parseFloat(card.price_change) > 0" />
                  <b-icon size="is-small" icon="circle-medium" class="has-text-grey" v-if="parseFloat(card.price_change) == 0 || card.price_change == ''" />
                  <b-icon size="is-small" icon="triangle-small-down" class="has-text-danger" v-if="parseFloat(card.price_change) < 0" />

                  <item-inspector-wrapper classes="is-flex-grow-1" :item="card" />
                  <span :class="parseFloat(card.price_change) > 0 ? 'has-text-success has-text-right' : 'has-text-danger has-text-right'" v-if="parseFloat(card.price_change) !== 0 || card.price_change != null">{{card.price_change}}%</span>
                </td>
                <td><span v-if="card.tcg_mid > 0 ">{{quickstats.currency_symbol}}{{card.tcg_mid}}</span></td>
                <td><span class="has-text-warning-dark" v-if="card.foil_price > 0 ">{{quickstats.currency_symbol}}{{card.foil_price}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </section>

  </div>

</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ItemCard from '~/components/items/ItemCard.vue';
import CreateAccountModal from '~/components/user/CreateAccountModal.vue';
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue';

export default {
  name: 'market',
  components: {
    EchoBreadCrumbs,
    ItemCard,
    CreateAccountModal,
    ItemInspectorWrapper
  },
  data () {
    return {
      sets: {},
      search: '',
      year: '',
      loading: true
    }
  },
  watch: {
    search(){
      this.$fetch()
    },
    year(){
      this.$fetch()
    },
  },
  async fetch() {
    this.loading=true
    // get sets, filter by release date > current date
    this.sets = await this.$echomtg.getMarketData(0,50,1,this.search,this.year);
    this.loading=false

  },
  computed: {
    ...mapState([
      'authenticated',
      'user',
      'quickstats'
    ]),
    years() {
      const thisyear = new Date().getFullYear();
      const firstyear = 1993
      let arr = []
      for(let i=firstyear;i <= thisyear; i++ ){
        arr.push(i)
      }
      return arr;
    },
    crumbs () {
      return [
        {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        },
      {
          label: 'Market',
          url: '/mtg/market/',
          icon: ''
        },

      ]
    },
  },
  head () {
      return {
          title: `MTG Stock Market Financial data for the Magic:the Gathering Trading Game`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Track cards in each expansion and individually watch and manage your inventory alongside financial data.`
            }
          ]

      }
    }
}
</script>
