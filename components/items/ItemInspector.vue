<template>
    <div :class="cardClass">

        <nuxt-link v-if="!toggleShowFull" :to="itemURL">
          <b-image  :alt="`${item.name} magic image`" @click="imageTrigger()"  width="200" quality="70" class="popoverImage" custom-class="expandedImage"	 :src="item.image ? item.image : placeholder"  />
        </nuxt-link>
        <div v-if="toggleShowFull">
            <div class="columns">
                <div class="column is-one-third">
                    <nuxt-link :to="itemURL">
                        <b-image width="200" quality="70"  class="popoverImage" custom-class="expandedImage"	 :src="item.image ? item.image : placeholder" :alt="`${item.name} magic image`"  />
                    </nuxt-link>
                </div>
                <div class="column is-two-thirds ">
                    <div class="mr-3 ml-2">
                        <p class="subtitle is-size-4 mt-3 mb-0">
                            {{item.name}}
                        </p>
                        <p class="subtitle has-text-grey is-size-7 mb-1">{{item.types}}</p>

                        <div class="content is-small" v-html="this.$echomtg.replaceSymbols(item.card_text)"></div>

                        <div v-if="this.$echomtg.isLoggedIn()">
                          <hr class="mb-3" />
                          <quick-add-button class="mr-2" buttonText="Add Regular" v-if="hasRegular" :emid="item.emid" :foil="0" />
                          <quick-add-button class="mr-2" buttonText="Add Foil" v-if="hasFoil" :emid="item.emid" :foil="1" />
                          <watchlist-quick-add-button :emid="item.emid" />
                        </div>
                        <hr class="mt-3 mb-3" />
                        <a v-if="hasRegular"
                          :href="item.purchase_link"
                          class="button is-small is-success mr-2">
                          <b-icon icon="cart" size="is-small" class="mr-1" />
                          Buy Regular {{currency_symbol}}{{item.tcg_mid}}
                        </a>
                        <a
                          v-if="hasFoil"
                          :href="item.purchase_link"
                          class="button is-small is-success">
                          <b-icon icon="cart" size="is-small" class="mr-1" />
                          Buy Foil {{currency_symbol}}{{item.foil_price}}</a>
                          <br class="is-clearfix" />
                          <small>
                          <affiliate-overlay-disclaimer/>
                          </small>
                          <hr class="mt-1 mb-3" />
                          <a :href="itemURL" class="button is-small">
                            <b-icon icon="magnify-plus-outline" size="is-small" class="mr-2" />Open Item Details
                          </a>
                          <a v-if="variationURL !== ''" :href="variationURL" class="button is-small mr-2">
                            <b-icon icon="shape" size="is-small" class="mr-1" />
                            See All Variations
                          </a>


                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
    .expandedImage {
        margin-bottom: -7px;
        border-radius: 20px;
    }
</style>
<script>
import WatchlistQuickAddButton from '../watchlist/WatchlistQuickAddButton.vue'
import { mapState } from 'vuex'
import QuickAddButton from '../inventory/QuickAddButton.vue'
import AffiliateOverlayDisclaimer from '../legal/AffiliateOverlayDisclaimer.vue'

export default {
    name: 'ItemInspector',
    components: {
      WatchlistQuickAddButton,
        QuickAddButton,
        AffiliateOverlayDisclaimer
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
      variationURL(){
        if(this.item.variation_url){
          return this.item.variation_url;
        }
        if(this.item.card_url){
          return this.item.card_url
        }
        return ''
      },
      itemURL(){
        if(this.item.echo_url){
          return this.item.echo_url;
        }
        if(this.item.url){
          return this.item.url
        }
        return ''
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
