<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <nav class="level is-mobile pt-2 pb-2 todaysprices">
      <div class="level-item has-text-centered" v-if="this.item.tcg_market > 0">
        <div>
          <p class="heading is-size-8">Market</p>
          <p class="title is-size-4 is-size-5-mobile">{{cs}}{{regularMarketPrice}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered" v-if="this.item.tcg_low > 0">
        <div>
          <p class="heading is-size-8">TCG Low</p>
          <p class="title is-size-4 is-size-5-mobile">{{cs}}{{regularLowPrice}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered is-hidden-mobile" v-if="this.item.tcg_mid > 0">
        <div>
          <p class="heading is-size-8">TCG Mid</p>
          <p class="title is-size-4 is-size-5-mobile">{{cs}}{{regularMidPrice}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered" v-if="this.item.tcg_mid > 0">
        <div>
          <p class="heading is-size-8">7-Day Change</p>
          <p class="title is-size-4 is-size-5-mobile">{{priceChange}}%</p>
        </div>
      </div>
      <div class="level-item has-text-centered" v-if="this.item.foil_price > 0">
        <div>
          <p class="heading is-size-8">Foil Price</p>
          <p class="title is-size-4 is-size-5-mobile  has-text-warning-dark">{{cs}}{{foilPrice}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered" v-if="this.item.foil_price > 0">
        <div>
          <p class="heading is-size-8">Foil Multiplier</p>
          <p class="title is-size-4 is-size-5-mobile has-text-warning-dark">{{foilMultipler}}X</p>
        </div>
      </div>
      <div class="level-item has-text-centered is-hidden-mobile">
        <div>
          <p class="heading is-size-8">Last Price Update</p>
          <p class="title is-4 is-5-mobile">{{this.prices.date[0]}}</p>
        </div>
      </div>
    </nav>

    <div class="columns mr-2">
      <div class="column is-one-quarter">
        <div class="cardImageContainer m-3">
          <b-image
              :src="item.image"
              placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"

          ></b-image>
        </div>
        <div class="message m-3 p-4">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div>
                  <h2 class="title is-size-5">{{item.card_name}}</h2>
                  <h3 class=" is-size-6 is-italic">{{item.types}}</h3>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <div>
                  <div class="is-size-3" v-html="this.$echomtg.replaceSymbols(item.mana_cost)"></div>
                  <div v-if="item.main_colors" class=" is-size-6 is-italic">{{item.main_colors}}</div>
                </div>
              </div>
            </div>
          </nav>

          <div class="content">
            <div class="mb-3" v-html="this.$echomtg.replaceSymbols(item.card_text)"></div>
            <p class="is-italic">{{item.flavor_text}}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <h1 class="title mb-3">{{this.item.name}} <span class="has-text-grey-light has-text-weight-light">from</span> {{this.item.expansion}}</h1>
         <b-field class="pb-3" grouped group-multiline>
            <div class="control" v-if="this.item.reserve_list == 1">
              <b-tag icon="scale-balance" type="is-info">Reserved List</b-tag>
            </div>
            <div class="control">
              <b-tag type="is-dark">{{this.item.expansion}}</b-tag>
            </div>
            <div class="control">
              <b-tag :type="typeColor">{{this.item.rarity}}</b-tag>
            </div>


            <div class="control">
              <b-tag>{{this.item.main_type}}</b-tag>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>Echo ID</b-tag>
                  <b-tag type="is-dark">{{this.item.emid}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>TCG ID</b-tag>
                  <b-tag type="is-dark">{{this.item.tcgplayer_id}}</b-tag>
              </b-taglist>
            </div>

        </b-field>
        <line-chart
          :chart-data="chartData"
          :extra-options="extraOptions"
          chart-id="cardLineChart"
        />

      </div>
      <div class="column is-one-quarter ">
          <item-tool-box :item="this.item"></item-tool-box>


      </div>
    </div>



  </div>

</template>

<script>
import SetView from '@/components/sets/SetView'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import LineChart from '@/components/Charts/LineChart'
import * as chartConfig from '@/components/Charts/chart.config'
import ItemToolBox from '@/components/items/ItemToolBox.vue'

export default {
  name: 'Expansion',
  components: {
    SetView,
    EchoBreadCrumbs,
    LineChart,
    ItemToolBox
  },
  data () {
    return {
      cs: '$',
      item: {
        name: '',
      },
      prices: {
        foil: [],
        regular: [],
        date: []
      },
      extraOptions: chartConfig.chartOptionsMain
    }
  },
  async asyncData({ params, redirect, $config }) {

    let emid = params.emid;
    let item, res, dataRes;
    let prices = {
      'date' : [],
      'regular': [],
      'foil' : []
    }

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/item/?emid=${emid}`;
    let dataEndpoint = `${$config.API_DOMAIN}data/item_history/?emid=${emid}`;
    // try to get the json
    try {
      res = await fetch(
        endpoint, {
          headers: {
            'Authorization' : 'Bearer ' + $config.S2S_KEY
          }
        }
      );
      item = await res.json();

      dataRes = await fetch(
        dataEndpoint, {
          headers: {
            'Authorization' : 'Bearer ' + $config.S2S_KEY
          }
        }
      );
      let priceData = await dataRes.json();

      prices = priceData.data;


    } catch(err){
      console.log(err, res)
    }

    // return it
    if (item) {
      return {
        item, prices
      }
    } else {
      //redirect('/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    },


  },
  computed: {
    typeColor() {
      let color = 'is-warning'
      switch (this.item.rarity.toLowerCase()){
        case 'uncommon':
          color='is-grey';
          break;
        case 'common':
          color='is-white';
          break;
        case 'rare':
          color='is-warning';
          break;
        case 'mythic rare':
        case 'mythic':
          color='is-danger';
        break;
      }
      return color;
    },
    crumbs () {
      return [
        {
          label: 'Expansions',
          url: '/sets/',
          icon: ''
        },
        {
          label: this.item.name,
          url: this.$nuxt.$route.path,
          icon: ''
        }
      ]
    },
    chartData() {
      return {
        labels: this.prices.date,
        datasets: [
          {
            label: 'Regular',
            backgroundColor: '#666666',
            fill: false,
            data: this.prices.regular
          },
           {
            label: 'Foil',
            backgroundColor: '#b08716',
            fill: false,
            data: this.prices.foil
          }
        ]
      }
    },
    regularLowPrice(){
      return this.item.tcg_low > 0 ? this.item.tcg_low.toLocaleString("en-US") : 'N/A'
    },
    regularMidPrice(){
      return this.item.tcg_mid > 0 ? this.item.tcg_mid.toLocaleString("en-US") : 'N/A'
    },
    regularMarketPrice(){
      return this.item.tcg_market > 0 ? this.item.tcg_market.toLocaleString("en-US") : 'N/A'
    },
    foilPrice(){
      return this.item.foil_price > 0 ? this.item.foil_price.toLocaleString("en-US") : 'N/A'
    },
    foilMultipler() {
      return (this.item.foil_price / this.item.tcg_mid).toFixed(2)
    },
    priceChange() {
      return this.item.change
    }
  },
  head () {
    return {
        title: `${this.item.card_name} Price ${this.item.expansion} MTG`,
        description: `Card Images and Prices for the Magic the Gathering set ${this.item.card_name}, ${this.item.expansion}`
    }
  }

}
</script>
