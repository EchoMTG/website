<template>
    <div :class="cardClass">
        <img v-if="!toggleShowFull" class="popoverImage" @click="imageTrigger()" :src="item.image" alt="Placeholder image" style="margin-bottom: -7px" />
        <div v-if="toggleShowFull">
            <div class="columns">
                <div class="column is-one-third">
                    <a :href="itemURL">
                        <img class="popoverImage" :src="item.image" alt="Placeholder image" style="margin-bottom: -7px"  />
                    </a>
                </div>
                <div class="column is-two-thirds ">
                    <div class="mr-3 ml-2">
                        <p class="subtitle is-size-5 mt-3 mb-0">
                            {{item.name}}
                        </p>
                        <p class="subtitle is-size-6 mb-1">{{item.types}}</p>

                        <div class="content is-small" v-html="this.$echomtg.replaceSymbols(item.card_text)" />

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
            <a v-if="hasRegular" :href="item.purchase_link" class="card-footer-item">Buy Regular ${{item.tcg_mid}}</a>
            <a v-if="hasFoil" :href="item.purchase_link" class="card-footer-item">Buy Foil ${{item.foil_price}}</a>

            <a v-if="item.card_url" :href="item.variation_url" class="card-footer-item">All Variations</a>
            <a :href="itemURL" class="card-footer-item">Open Item Page</a>
        </footer>
    </div>
</template>
<script>
import WatchlistQuickAddButton from '../watchlist/WatchlistQuickAddButton.vue'


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
        itemURL() {
          if(this.item.echo_url) return this.item.echo_url.replace('https://www.echomtg.com','')
          return this.item.card_url;
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
