<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="item-variations">
      <span class="topBlend"></span>
      <span class="bottomBlend"></span>
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
                  <b-tag>Total Variations</b-tag>
                  <b-tag type="is-dark">{{this.variations.length}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-tag :type="typeColor">{{this.original.rarity}}</b-tag>
            </div>


            <div class="control">
              <b-tag>{{this.original.main_type}}</b-tag>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>Echo ID</b-tag>
                  <b-tag type="is-dark">{{this.original.emid}}</b-tag>
              </b-taglist>
            </div>
            <div class="control">
              <b-taglist attached>
                  <b-tag>TCG ID</b-tag>
                  <b-tag type="is-dark">{{this.original.tcgplayer_id}}</b-tag>
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

          <div class="column is-one-quarter" v-for="variation in variations" :v-key="`vari-${variation.emid}`">
            <div class="card has-background-light">
              <header class="card-header">
                  <p class="card-header-title">
                    {{variation.set}}
                  </p>
                  <a :href="variation.card_url" class="button card-header-icon" aria-label="open card page">
                      <b-icon icon="share" aria-hidden="true"></b-icon>
                  </a>
                </header>
              <div class="card-image">
                <figure class="image">
                  <img :src="variation.image" :alt="`${variation.name} from ${variation.expansion}`">
                </figure>
              </div>
              <footer class="card-footer">
                <a v-if="variation.tcg_mid > 0" :href="variation.purchase_link" class="card-footer-item">Buy {{cs}}{{variation.tcg_mid}}</a>
                <a v-if="variation.price_foil > 0" :href="variation.purchase_link" class="card-footer-item">Buy Foil {{cs}}{{variation.price_foil}}</a>
                <a :href="variation.card_url" class="card-footer-item">Open</a>
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
      original: {}
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
        title: `${this.original.name} Prices and Variations`,
        description: `Card Images and Prices for the Magic the Gathering card ${this.original.name}`
    }
  }

}
</script>
