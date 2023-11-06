<template>
    <div :class="cardClass">

        <nuxt-link v-if="!toggleShowFull" :to="itemURL">
          <b-image  :alt="`${item.name} magic image`" @click="imageTrigger()"  width="200" quality="70" class="popoverImage" custom-class="expandedImage"	 :src="item.image ? item.image : placeholder"  />
        </nuxt-link>
        <div v-if="toggleShowFull">
            <div class="columns">
                <div class="column is-one-third">
                    <nuxt-link :to="itemURL">
                        <b-image   width="200" quality="70"  class="popoverImage" custom-class="expandedImage"	 :src="item.image ? item.image : placeholder" :alt="`${item.name} magic image`"  />
                    </nuxt-link>
                </div>
                <div class="column is-two-thirds ">
                    <div class="mr-3 ml-2">
                        <p class="subtitle is-size-5 mt-3 mb-0">
                            {{item.name}}
                        </p>
                        <p class="subtitle is-size-6 mb-1">{{item.types}}</p>

                        <div class="content is-small" v-html="this.$echomtg.replaceSymbols(item.card_text)"></div>

                        <div class="columns" v-if="this.$echomtg.isLoggedIn()">
                          <div class="column">
                            <h2 class="subtitle is-size-5">Inventory</h2>
                             <b-button v-if="hasRegular"  type="is-dark is-small" icon-left="plus" @click="inventoryQuickAdd(item.emid)">
                              Add Regular
                            </b-button>
                           <b-button v-if="hasFoil" type="is-warning is-small" icon-left="plus" @click="inventoryQuickAdd(item.emid,1)">
                              Add Foil
                            </b-button>
                          </div>
                          <div class="column">
                            <watchlist-quick-add-button :emid="item.emid" />
                          </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <footer class="card-footer" v-if="toggleShowFull">
            <a v-if="hasRegular" :href="item.purchase_link" class="card-footer-item">Buy Regular {{currency_symbol}}{{item.tcg_mid}}</a>
            <a v-if="hasFoil" :href="item.purchase_link" class="card-footer-item">Buy Foil {{currency_symbol}}{{item.foil_price}}</a>

            <a v-if="item.card_url" :href="item.variation_url" class="card-footer-item">All Variations</a>
            <a :href="itemURL" class="card-footer-item">Open Item Page</a>
        </footer>
    </div>
</template>
<style lang="scss" scoped>
    .expandedImage {
        margin-bottom: -7px;
    }
</style>
<script>
import WatchlistQuickAddButton from '../watchlist/WatchlistQuickAddButton.vue'
import { mapState } from 'vuex'

export default {
    name: 'ItemInspector',
    components: {
      WatchlistQuickAddButton
    },
    data: function data() {
        return {
            toggleShowFull: false
        }
    },
    props: {
      item: {
          type: Object,
          default: function () {
              return { name: 'card name' }
          },
          required: true
      },
      showFull: {
        type: Boolean,
        default: false
      },
      closeToBottom: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
        this.toggleShowFull = this.showFull
    },
    watch: {
        showFull() {
            this.toggleShowFull = this.showFull
        }
    },
    computed: {
      ...mapState([
        'quickstats'
      ]),
      currency_symbol() {
        return this.quickstats.currency_symbol ? this.quickstats.currency_symbol  : '$';
      },
      placeholder() {
        return 'https://assets.echomtg.com/magic/cards/magic-card-back.jpg'
      },
      hasFoil() {
          return this.item.foil_price == null ? false : true;
      },
      hasRegular() {
          return this.item.tcg_mid == null ? false : true;
      },
      cardClass() {
          let full = this.toggleShowFull ? 'full' : '';
          let ctb = this.closeToBottom ? 'closeToBottom' : '';
          return `card itemInspectorCard ${ctb} ${full}`;
      },
      itemURL(){
        return this.$echomtg.itemURL(this.item)
      }


    },
    methods: {
        imageTrigger(){
            if(this.toggleShowFull == true){
                this.$router.push(this.itemURL)
            } else {
                this.toggleShowFull = true
            }
        },

        inventoryQuickAdd: function(emid,foil=0) {
            this.$echomtg.inventoryQuickAdd(emid, foil)
        },
    }

}
</script>
