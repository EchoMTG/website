<template>
  <div>
    <nuxt v-if="user?.user_level && parseInt(user.user_level) >= 3" keep-alive />

    <echo-bread-crumbs :data="crumbs" />

    <nav class="level is-mobile pt-2 pb-2 todaysprices">
      <div class="level-item has-text-centered" v-if="this.item.tcg_market > 0">
        <div>
          <p class="heading is-size-8">Market</p>
          <p class="title is-size-4 is-size-5-mobile">
            <a target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">{{cs}}{{regularMarketPrice}}</a>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered" v-if="this.item.tcg_low > 0">
        <div>
          <p class="heading is-size-8">TCG Low</p>
          <p class="title is-size-4 is-size-5-mobile">
            <a target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">{{cs}}{{regularLowPrice}}</a>

            </p>
        </div>
      </div>
      <div class="level-item has-text-centered is-hidden-mobile" v-if="this.item.tcg_mid > 0">
        <div>
          <p class="heading is-size-8">TCG Mid</p>
          <p class="title is-size-4 is-size-5-mobile">
            <a target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">
              {{cs}}{{regularMidPrice}}
            </a>
          </p>
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
      <div class="level-item has-text-centered" v-if="this.item.foil_price > 0 && this.item.tcg_mid > 0">
        <div>
          <p class="heading is-size-8">Foil Multiplier</p>
          <p class="title is-size-4 is-size-5-mobile has-text-warning-dark">{{foilMultipler}}X</p>
        </div>
      </div>
      <div class="level-item has-text-centered is-hidden-mobile">
        <div>
          <p class="heading is-size-8">Last Price Update</p>
          <p class="title is-4 is-5-mobile">{{lastUpdateDate}}</p>
        </div>
      </div>
    </nav>

    <div class="columns mr-2">
      <div class="column is-one-quarter ">
        <div class="cardImageContainer m-3">
          <b-image
              lazy
              :src="item.image"
              :alt="`${item.name} magic card front`"
              placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
          />

        </div>
        <div class="has-text-centered">
          <social-buttons
              :url="`https://www.echomtg.com${this.$nuxt.$route.path}`"
              :title="`${item.name} price has ${changeVerb} ${item.change}% to $${item.tcg_mid}`"
              :twitter="`echomtg`"
              :hashtags="`${item.set_code},${item.expansion},mtg,echomtg`"
            />
        </div>
        <div class="message m-3 p-4 is-overflowhidden">
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
      <div class="column is-half">
        <h1 class="title mb-3">{{this.item.name}} <span class="has-text-grey-light has-text-weight-light">from</span> {{this.item.expansion}}</h1>
        <b-field class="pb-3" grouped group-multiline>
          <div class="control" v-if="this.item.reserve_list == 1">
            <b-tag icon="scale-balance" type="is-info">Reserved List</b-tag>
          </div>
          <div class="control">
            <set-tag :code="this.item.set_code" :name="this.item.expansion" :url="this.item.set_url" />
          </div>
          <div class="control">
            <b-tag :class="`${this.item.rarity.replace(' ','-').toLowerCase()}-background has-text-weight-bold`">{{this.item.rarity}}</b-tag>
          </div>
          <div class="control">
            <b-tag type="is-black">{{this.item.main_type}}</b-tag>
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
          <div class="control">
            <b-taglist attached>
                <b-tag>Multiverse ID</b-tag>
                <b-tag type="is-dark">{{this.item.multiverseid}}</b-tag>
            </b-taglist>
          </div>
        </b-field>
        <client-only>
          <line-chart
            :chart-data="chartData"
            :chart-options="extraOptions"
            chart-id="cardLineChart"
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
      <div class="column is-one-quarter ">
        <client-only>
          <item-tool-box v-if="authenticated" :item="this.item"></item-tool-box>
          <item-list-box v-if="authenticated" :item="this.item"></item-list-box>
        </client-only>
        <card-ad image="https://assets.echomtg.com/images/product/collection-app-2023.png" v-if="!authenticated" />
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
      cs: '$',
      isPriceAnalysisOpen: true,
      item: {
        name: '',
      },
      variations: [],
      prices: {
        foil: [],
        regular: [],
        date: []
      },
      extraOptions: chartConfig.chartOptionsMain

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
    let dataEndpoint = `${$config.API_DOMAIN}data/item_history/?emid=${emid}`;

    // try to get the json
    try {
      res = await fetch(
        endpoint, {
          headers: $echomtg.getS2SGetHeaders()
        }
      );
      item = await res.json();

      dataRes = await fetch( dataEndpoint, 
        {
          headers: $echomtg.getS2SGetHeaders()
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
          headers: $echomtg.getS2SGetHeaders()
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
    }

  },
  computed: {
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
      if(undefined == this.prices.date) return 'N/A';
      return this.prices.date[this.prices.date.length - 1];
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
