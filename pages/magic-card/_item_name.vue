<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="item-variations">
      <span class="topBlend"></span>
      <img class="cover-image" :src="this.original.image_cropped" :alt="this.original.name" />
      <div class="container">
        <h1 class="title has-text-white is-size-1 has-text-shadow pt-4 has-text-weight-bold">
          <span v-html="this.$echomtg.replaceSymbols(this.original.mana_cost)"></span>
          {{this.original.name}} <span class="has-text-grey-lighter has-text-weight-light">all Printings and Prices</span>

        </h1>

        <b-field class="pb-3" grouped group-multiline>
            <div class="control" v-if="this.original.reserve_list == 1">
              <b-tag icon="scale-balance" type="is-info">Reserved List</b-tag>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>Total Printings</b-tag>
                  <b-tag type="is-dark">{{this.variations.length}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>Rarity</b-tag>
                  <b-tag :type="getRarityColor(this.original.rarity)">{{this.original.rarity}}</b-tag>
              </b-taglist>
            </div>
             <div class="control">
              <b-taglist attached>
                  <b-tag>Type</b-tag>
                   <b-tag type="is-dark">{{this.original.main_type}}</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                  <b-tag>Price Range</b-tag>
                  <b-tag type="is-dark">{{cs}}{{lowestPrice}} - {{cs}}{{highestPrice}}</b-tag>
              </b-taglist>
            </div>
             <div class="control" v-if="lowestPrice != 'N/A'">
              <b-taglist attached>
                  <b-tag>Lowest Price</b-tag>
                  <b-tag type="is-dark">{{cs}}{{lowestPrice}}</b-tag>
              </b-taglist>
            </div>
            <div class="control" v-if="lowestFoilPrice != 'N/A'">
              <b-taglist attached>
                  <b-tag>Lowest Foil</b-tag>
                  <b-tag class="has-text-white has-background-warning-dark">{{cs}}{{lowestFoilPrice}}</b-tag>
              </b-taglist>
            </div>
            <div class="control" v-if="highestPrice != 'N/A'">
              <b-taglist attached>
                  <b-tag>Highest Price</b-tag>
                  <b-tag type="is-dark">{{cs}}{{highestPrice}}</b-tag>
              </b-taglist>
            </div>

            <div class="control" v-if="highestFoilPrice != 'N/A'">
              <b-taglist attached>
                  <b-tag>Highest Foil</b-tag>
                  <b-tag class="has-text-white has-background-warning-dark">{{cs}}{{highestFoilPrice}}</b-tag>
              </b-taglist>
            </div>




        </b-field>

        <div class="message p-4 pt-2 mb-4">
          <div class="content">
            <div class="mb-3" v-html="this.$echomtg.replaceSymbols(this.original.card_text)"></div>
            <p class="is-italic">{{this.original.flavor_text}}</p>
          </div>
        </div>

        <div class="columns is-multiline">

          <div class="column is-one-quarter" v-for="variation in variationsSorted" :v-key="`vari-${variation.emid}`">
            <div class="card has-background-light">
              <header class="card-header">
                  <p class="card-header-title pb-1 ellipsis">
                    <span :class="getSetIconClass(variation.set_code)"></span>
                    {{variation.set}}
                  </p>
                  <a :href="variation.card_url" class="button card-header-icon" aria-label="open card page">
                      <b-icon icon="share" aria-hidden="true"></b-icon>
                  </a>
                </header>

                <nav class="level m-0 p-0">
                  <div v-if="variation.tcg_mid > 0" class="level-item">{{cs}}{{variation.tcg_mid.toLocaleString("en-US")}}</div>
                  <div v-if="variation.foil_price > 0" class="level-item has-text-warning-dark">{{cs}}{{variation.foil_price.toLocaleString("en-US")}}</div>
                </nav>

              <div class="card-image">
                <figure class="image">
                  <a :href="variation.card_url">
                    <img :src="variation.image" :alt="`${variation.name} from ${variation.expansion}`">
                  </a>
                </figure>
              </div>
              <footer class="card-footer">
                <a v-if="variation.tcg_mid > 0" :href="variation.purchase_link" class="card-footer-item">Buy {{cs}}{{variation.tcg_mid.toLocaleString("en-US")}}</a>
                <!-- <a v-if="variation.foil_price > 0" :href="variation.purchase_link" class="card-footer-item has-text-warning">Buy Foil {{cs}}{{variation.foil_price.toLocaleString("en-US")}}</a> -->
                <a :href="variation.card_url" class="card-footer-item">More Details</a>
              </footer>
            </div>
          </div>

        </div>

        <!-- <b-image
                :src="this.original.image"
                placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"

            ></b-image> -->
      </div>
    </div>




  </div>

</template>

<script>
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'ItemVariations',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      cs: '$',
      variations: {},
      original: {},
      sortField: 'price',
      sortDirection: 'DESC'
    }
  },
  async asyncData({ params, redirect, $config }) {

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/item_variations/?name=${params.item_name}`;
    let variations, original, res, data = []
    // try to get the json
    try {
      res = await fetch(
        endpoint, {
          headers: {
            'Authorization' : 'Bearer ' + $config.S2S_KEY
          }
        }
      );
      data = await res.json();

      variations = data.data.variations
      original = data.data.original


    } catch(err){
      console.log(err, res)
    }

    // return it
    if (variations.length > 0) {
      return {
        variations, original
      }
    } else {
      redirect('/sets/')
    }
  },
  methods: {
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' mr-1'
    },
    getRarityColor(rarity) {
      let color = 'is-warning'
      switch (rarity.toLowerCase()){
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

  },
  computed: {
    variationsSorted(){
      return this.variations
    },
    lowestPrice(){
      if(this.variations.filter(v => v.tcg_mid > 0).length == 0) return 'N/A';
      let obj = this.variations.filter(v => v.tcg_mid > 0).reduce(function(prev, curr) {
        return prev.tcg_mid < curr.tcg_mid ? prev : curr;
      });
      return obj.tcg_mid;

    },
    highestPrice(){
      if(this.variations.filter(v => v.tcg_mid > 0).length == 0) return 'N/A';
     let obj = this.variations.filter(v => v.tcg_mid > 0).reduce(function(prev, curr) {
        return prev.tcg_mid > curr.tcg_mid ? prev : curr;
      });
      return obj.tcg_mid;
    },
    lowestFoilPrice(){
      if(this.variations.filter(v => v.foil_price > 0).length == 0) return 'N/A';
      let obj = this.variations?.filter(v => v.foil_price > 0).reduce(function(prev, curr) {
        return prev.foil_price < curr.foil_price ? prev : curr;
      });
      return obj.foil_price;
    },
    highestFoilPrice(){
      if(this.variations.filter(v => v.foil_price > 0).length == 0) return 'N/A';
      let obj = this.variations.filter(v => v.foil_price > 0).reduce(function(prev, curr) {
        return prev.foil_price > curr.foil_price ? prev : curr;
      });
      return obj.foil_price;
    },
    crumbs () {
      return [
        {
          label: 'Expansions',
          url: '/sets/',
          icon: ''
        },
         {
          label: this.original.name,
          url: this.$nuxt.$route.path,
          icon: ''
        },
      ]
    },

  },
  head () {
    return {
        title: `${this.original.name} Printings, Prices, and Variations`,
        meta: [
          { hid: 'og:image', property: 'og:image', content: this.original.image_cropped },
          {
            hid: 'description',
            name: 'description',
            content:  `Card Images and Prices for the Magic the Gathering card ${this.original.name}`
          }
        ]

    }
  }

}
</script>
