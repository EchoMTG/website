<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />

    <echo-bread-crumbs :data="crumbs" />


    <div class="columns is-gapless">
      <div class="column is-one-quarter">
        <div class="cardImageContainer mt-5 ml-3">
          <NuxtPicture
              quality="30"
              width="390"
              height="442"
              style="width:100%"
              :src="item.image"
              :alt="`${item.name} magic card front`"
          />

        </div>

        <div class="box has-background-black has-text-light m-3 p-4 is-overflowhidden is-hidden-touch" >
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <div>
                  <h2 class="title is-size-5 ellispis">{{item.card_name}}</h2>
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

      <div class="column is-three-fourths">

         <div class="is-flex ml-3 mt-3 py-3 is-hidden-touch">
          <h1 class="title is-size-4 p-0 m-0 is-size-6-touch">{{this.item.name}} <span class="has-text-grey-dark has-text-weight-light">prices from <nuxt-link class="has-text-grey-dark" :to="item.set_url"><i :class="getSetIconClass(this.item.set_code)" /> {{this.item.expansion}}</nuxt-link></span> </h1>
          <social-buttons
              classes="ml-auto mr-5 "
              :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
              :title="`${item.name} price has ${changeVerb} ${item.change}% to $${item.tcg_mid}`"
              :twitter="`echomtg`"
              :hashtags="`${item.set_code},${item.expansion},mtg,echomtg`"
            />
        </div>
              <b-field class="pb-0 ml-3 is-hidden-touch" grouped group-multiline>
                <div class="control" v-if="this.item.reserve_list == 1">
                  <b-tag icon="gold" class="has-background-grey-dark has-text-white">Reserved List</b-tag>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag class="has-background-black has-text-white">Rarity</b-tag>
                    <b-tag class="has-background-grey-dark has-text-white"><i :class="`${getSetIconClass(this.item.set_code)} ${this.item.rarity.replace(' ','-').toLowerCase()}-symbol`"></i> {{this.item.rarity}}</b-tag>
                  </b-taglist>
                </div>
                <div class="control">
                  <b-taglist attached>
                    <b-tag class="has-background-black has-text-white">Types</b-tag>
                    <b-tag class="has-background-grey-dark has-text-white">{{this.item.main_type}}</b-tag>
                  </b-taglist>
                </div>
                 <div class="control">
                  <b-taglist attached>
                    <b-tag class="has-background-black has-text-white">Reprints</b-tag>
                    <b-tag class="has-background-grey-dark has-text-white">{{this.variations.length}}</b-tag>
                  </b-taglist>
                </div>

              </b-field>
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="box has-background-black has-text-white">
              <!-- prices -->
              <nav class="level is-mobile pt-0 mt-0 pb-0 mb-0 todaysprices">
                <div class="level-item has-text-centered" v-if="this.item.tcg_market > 0">
                  <div>
                    <p class="heading is-size-8">Market</p>
                    <p class="title is-size-5 is-size-6-mobile">
                      <a target="_blank" class="has-text-white" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">{{cs}}{{regularMarketPrice}}</a>
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered" v-if="this.item.tcg_low > 0">
                  <div>
                    <p class="heading is-size-8">TCG Low</p>
                    <p class="title is-size-5 is-size-6-mobile">
                      <a target="_blank" class="has-text-grey" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">{{cs}}{{regularLowPrice}}</a>

                      </p>
                  </div>
                </div>
                <div class="level-item has-text-centered is-hidden-mobile" v-if="this.item.tcg_mid > 0">
                  <div>
                    <p class="heading is-size-8">TCG Mid</p>
                    <p class="title is-size-5 is-size-6-mobile">
                      <a class="has-text-grey" target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">
                        {{cs}}{{regularMidPrice}}
                      </a>
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered" v-if="this.item.tcg_mid > 0">
                  <div>
                    <p class="heading is-size-8">7-Day</p>
                    <p class="title is-size-5 is-size-6-mobile" v-if="priceChange != 0">
                      <span :class="priceChange > 0 ? `has-text-success` : `has-text-danger`">
                      <b-icon v-if="priceChange > 0" icon="triangle" size="is-small" />
                        <b-icon v-if="priceChange < 0" icon="triangle-down" size="is-small" />
                      {{priceChange}}%
                      </span>
                    </p>
                    <p class="title is-size-5 is-size-6-mobile" v-else>-</p>
                  </div>
                </div>
                <div class="level-item has-text-centered" v-if="this.item.foil_price > 0">
                  <div>
                    <p class="heading is-size-8">Foil Price</p>
                    <p class="title is-size-5 is-size-6-mobile  has-text-warning-dark">{{cs}}{{foilPrice}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered" v-if="this.item.foil_price > 0 && this.item.tcg_mid > 0">
                  <div>
                    <p class="heading is-size-8">Foil Multiple</p>
                    <p class="title is-size-5 is-size-6-mobile has-text-warning-dark">{{foilMultipler}}X</p>
                  </div>
                </div>
                <div class="level-item has-text-centered is-hidden-mobile">
                  <div>
                    <p class="heading is-size-8">Last Price Update</p>
                    <p class="title is-size-5 is-size-6-mobile">{{lastUpdateDate}}</p>
                  </div>
                </div>
              </nav>

              <client-only>
                <line-chart
                  :chart-data="chartData"
                  :chart-options="customChartConfig"
                  chart-id="cardLineChart"
                  ref="chart"
                />
              </client-only>
              <div class="card mt-3">
                <header class="card-header">
                  <p class="card-header-title ">
                    {{this.item.name}} from {{this.item.expansion}}'s Price Analysis
                  </p>
                  <button
                      class="card-header-icon"
                      aria-label="collapse price analysis"
                      @click="isPriceAnalysisOpen = !isPriceAnalysisOpen"
                      :aria-expanded="isPriceAnalysisOpen"
                      aria-controls="priceAnalysis"
                      >
                      <span class="icon">
                          <b-icon v-if="isPriceAnalysisOpen" icon="menu-down" aria-hidden="true"></b-icon>
                          <b-icon v-if="!isPriceAnalysisOpen" icon="menu-left" aria-hidden="true"></b-icon>
                      </span>
                  </button>
                </header>
                <b-collapse
                  aria-id="priceAnalysis"
                  animation="slide"
                  v-model="isPriceAnalysisOpen">
                  <div v-if="this.prices.regular !== undefined && this.prices.regular[0] != null || this.prices.regular[this.prices.regular.length - 1] != null">
                    <item-price-analysis  :prices="this.prices"  />
                  </div>
                  <div v-if="!this.authenticated" class="has-text-centered pb-4">
                    <p><a href="/login/">Login</a> or Create an Account to see more Price Details</p><create-account-modal size="is-small" />
                  </div>
                  <div v-if="this.authenticated && (this.prices.foil !== undefined && this.prices.foil[0] != null || this.prices.foil[this.prices.foil.length - 1] != null)">
                    <h3 class="title is-size-6 has-text-warning-dark ml-3 mb-2 mt-1">Foil Price Analysis </h3>
                    <item-price-analysis :prices="this.prices" type="foil" />
                  </div>
                </b-collapse>
              </div>

            </div>
            <!-- variations and history -->
            <div v-if="variations.length > 1">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    {{variations.length}} Total Variations/Printings of {{this.item.name}}
                  </p>
                  <a :href="this.item.card_url" class="button card-header-icon" aria-label="more options">

                    See All Variations
                  </a>
                </header>
                <b-table
                  :data="variations"
                  default-sort="tcg_mid"
                  default-sort-direction="DESC"
                  :bordered="true"
                  :striped="true"
                  :mobile-cards="false"

                >
                    <b-table-column v-slot="props">
                      <b-icon :class="getSetIconClass(props.row.set_code)"></b-icon>
                    </b-table-column>
                    <b-table-column field="set" label="Expansion" sortable v-slot="props">
                      <item-inspector-wrapper :name="variationName(props.row.set, props.row.name)" :item="props.row" />
                    </b-table-column>

                    <b-table-column field="tcg_mid" label="Price" sortable number v-slot="props">
                        <span v-if="props.row.tcg_mid">{{cs}}{{ props.row.tcg_mid.toLocaleString("en-US") }}</span>
                    </b-table-column>
                    <b-table-column  field="foil_price" label="Foil" sortable number v-slot="props">
                        <span class="has-text-warning-dark" v-if="props.row.foil_price">{{cs}}{{ props.row.foil_price.toLocaleString("en-US") }}</span>
                    </b-table-column>
                </b-table>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
             <div class="card has-background-black">
                <header class="card-header">
                  <a class="card-header-title "  @click="isBuylistOpen = !isBuylistOpen">
                    EchoMTG Buylist Metrics and Tools
                  </a>
                  <button
                      class="card-header-icon"
                      aria-label="collapse Metrics and Tools"
                      @click="isBuylistOpen = !isBuylistOpen"
                      :aria-expanded="isBuylistOpen"
                      aria-controls="buylist"
                      >
                      <span class="icon">
                          <b-icon v-if="isBuylistOpen" icon="menu-down" aria-hidden="true"></b-icon>
                          <b-icon v-if="!isBuylistOpen" icon="menu-left" aria-hidden="true"></b-icon>
                      </span>
                  </button>
                </header>
                <b-collapse
                  aria-id="buylist"
                  animation="slide"
                  v-model="isBuylistOpen">
                    <b-button @click="openExternalLink(item.purchase_link_tcg)" icon-left="cart-arrow-right" class="mx-3 mb-2" type="is-dark" size="is-small">Buy on TCGplayer {{cs}}{{item.tcg_low}}</b-button>
                    <b-button v-if="item.multiverseid < 10000000" @click="openExternalLink(item.crawlurl)" icon-left="share" class="mx-3 mb-2" type="is-dark" size="is-small">Open on Wizard's Gatherer</b-button>
                    <br class="is-clearfix" />
                    <small class="ml-4 is-size-7 has-text-grey">Buylist Metrics</small>
                    <hr class="mx-0 my-1"/>
                  <div v-if="authenticated && user.planObject.access_level >= 3" class="pb-2">

                    <div class="is-flex px-4 has-text-warning"><span>Paper Foil</span> <span class="ml-auto">{{cs}}{{item.foil_buylist_assumption}}</span></div>
                    <div class="is-flex px-4"><span>Paper Regular</span> <span class="ml-auto">{{cs}}{{item.buylist_assumption}}</span></div>
                  </div>
                  <div class="px-3 pb-2" v-else>
                    <nuxt-link class="is-size-7" to="/plans">Upgrade to Mythic for EchoMTG Buylist Metrics</nuxt-link>
                  </div>
                </b-collapse>
             </div>

          <b-field grouped group-multiline v-if="user.planObject.access_level >= 3">
            <div class="control">
              <b-taglist attached>
                  <b-tag type="is-black">ECHO</b-tag>
                  <b-tag type="is-dark">{{this.item.emid}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag type="is-black">TCG</b-tag>
                  <b-tag type="is-dark">{{this.item.tcgplayer_id}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag type="is-black">WOTC</b-tag>
                  <b-tag type="is-dark">{{this.item.multiverseid}}</b-tag>
              </b-taglist>
            </div>
          </b-field>
            <client-only>
                <item-tool-box :open="false" :title="`My Inventory: `" v-if="authenticated" :item="this.item"></item-tool-box>
                <item-list-box :open="false" :title="`My Decks/Lists`" v-if="authenticated" :item="this.item"></item-list-box>
              </client-only>
              <card-ad image="https://assets.echomtg.com/images/product/collection-app-2023.png" v-if="!authenticated" />

          </div>
        </div>
      </div>

    </div>



  </div>

</template>

<script>
import { mapState } from 'vuex'
import SetView from '@/components/sets/SetView'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

import * as chartConfig from '@/components/Charts/chart.config'
import ItemToolBox from '@/components/items/ItemToolBox.vue'
import ItemListBox from '@/components/items/ItemListBox.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue';
import ItemPriceAnalysis from '~/components/items/ItemPriceAnalysis.vue';
import SetTag from '~/components/magic/SetTag.vue'
import CardAd from '@/components/cta/CardAd.vue'
import SocialButtons from '@/components/cta/SocialButtons.vue'
import CreateAccountModal from '@/components/user/CreateAccountModal.vue'

export default {
  name: 'Expansion',
  components: {
    SetView,
    EchoBreadCrumbs,
    SetTag,
    ItemToolBox,
    ItemInspectorWrapper,
    ItemPriceAnalysis,
    ItemListBox,
    CardAd,
    CreateAccountModal,
    SocialButtons
  },
  data () {
    return {
      isPriceAnalysisOpen: true,
      isBuylistOpen: true,
      item: {
        name: '',
      },
      variations: [],
      prices: {
        foil: [],
        regular: [],
        date: []
      },

    }
  },
  async asyncData({ params, redirect, $echomtg, $config }) {

    let emid = params.emid_mtg;
    let item, res, dataRes, variations;
    let prices = {
      'date' : [],
      'regular': [],
      'foil' : []
    }

    // fetch the item
    let endpoint = `${$config.API_DOMAIN}data/item/?emid=${emid}`;
    // pricing
    let dataEndpoint = `${$config.API_DOMAIN}data/item_history/?emid=${emid}&days=1000`;

    // try to get the json
    try {
      res = await fetch(
        endpoint, {
          headers: $echomtg.getS2SHeadersNoJSON()
        }
      );
      item = await res.json();

      dataRes = await fetch( dataEndpoint,
        {
          headers: $echomtg.getS2SHeadersNoJSON()
        }
      );
      let priceData = await dataRes.json();

      if(priceData.status == "success"){
        prices = priceData.data;
      }

      // fetching other editions
      let variationname = item.card_url.split('/')[2];
      let variationsEndpoint = `${$config.API_DOMAIN}data/item_variations/?name=${variationname}`;


      const vRes = await fetch(
        variationsEndpoint, {
          headers: $echomtg.getS2SHeadersNoJSON()
        }
      );
      let vData = await vRes.json();

      variations = vData.data.variations;


    } catch(err){
      console.log(err, res)
    }

    // return it
    if (item) {
      return {
        item, prices, variations
      }
    } else {
      //redirect('/sets/')
    }
  },
  methods: {
    makeSetPath(code, path_part){
      return `/mtg/sets/${code}/${path_part}/`
    },
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code)
    },
    variationName(setname,itemname) {
      let name = setname;
      if(itemname.split('(')[1]){
        name += ' (' + itemname.split('(')[1].replace(')','')+')'
      }
      return name;
    },
    openExternalLink(url){
      window.open(url,'_blank')
    }

  },
  computed: {
    customChartConfig(){
      let customChart = chartConfig.chartOptionsMain

      customChart.scales.x.grid = {
          color: '#333',

      }
      customChart.scales.x.ticks = {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
      }
      customChart.scales.y = {}
       customChart.scales.y.grid = {
          display: true ,
          color: '#222',
      }

      customChart.plugins = {
        legend: {
          position: 'chartArea'
        }
      }

      return customChart;
    },
    cs() {
      return this.user.currency_symbol
    },
    changeVerb(){
      return this.item.change > 0 ? 'gone up' : 'dropped'
    },
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
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        },
        {
          label: 'Sets',
          url: '/mtg/sets/',
          icon: ''
        },
        {
          label: this.item.expansion,
          url: this.item.set_url,
          icon: ''
        },
        {
          label: this.item.name.split('(')[0],
          url: this.item.card_url,
          icon: ''
        },
        {
          label: `${this.item.name} ${this.item.set_code} `,
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
            borderColor: '#666666',
            fill: false,
            data: this.prices.regular
          },
           {
            label: 'Foil',
            backgroundColor: '#b08716',
            borderColor: '#b08716',
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
    },
    lastUpdateDate() {
      if(undefined == this.item.last_updated) return 'N/A';
      return this.$moment(this.item.last_updated).format('l');
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  head () {
    return {
        title: `${this.item.card_name } Price ${this.item.expansion} MTG`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: this.item.image_cropped },
          {
            hid: 'description',
            name: 'description',
            content:  `Card Images and Prices for the Magic the Gathering set ${this.item.card_name}, ${this.item.expansion}`
          },
          {
            hid:'',
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://www.echomtg.com' + this.$route.path
          }
        ]

    }
  }

}
</script>
