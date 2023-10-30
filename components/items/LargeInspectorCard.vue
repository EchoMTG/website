<template>
  <div class="card" style="overflow:hidden;">
    <div class="columns is-gapless">
      <div class="is-one-third column" style="border-radius: 20px; overflow:hidden;">
        <b-image
          style="width: 100%;"
          class="inspectorLargeImage"
          placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
          width="600"
          :src="getImage"
          :alt="`${item?.name} card image`" />
      </div>
      <div class="inspector-text column is-two-thirds" >
          <div class="p-5">
            <!-- controls -->
            <div class="is-flex is-align-content-center	 is-align-items-center	 mb-5">
              <b-button class="mr-auto" type="is-dark" icon-left="arrow-left" outlined v-if="priorInspectorItem != null" @click="previousItem">Previous Item</b-button>
              <a target="_blank" class="is-block" :href="item.echo_url" ><b-icon icon="open-in-new" size="is-small" class="mr-1"/> Explore Item Page</a>
              <b-button class="ml-auto" icon-right="arrow-right"  type="is-dark" outlined v-if="nextInspectorItem != null" @click="nextItem">Next Item</b-button>
            </div>
            <!-- meta -->
            <p class="title is-4 mb-5">{{item?.name}} <span style="opacity: .4">{{item?.set}}</span></p>
            <p class="subtitle is-6">{{item?.types}} - {{item?.rarity}} - Unique List ID: {{listItemId}} </p>
            <!-- prices -->

            <div :class="'level is-rounded py-3 ' + (isDarkModeActive == 1 ? 'has-background-black' : 'has-background-light')" style="border-radius:10px;">
              <div class="level-item has-text-centered is-hidden-mobile" v-if="this.item.tcg_mid > 0">
                <div>
                  <p class="heading is-size-8">TCG Mid</p>
                  <p class="title is-size-5 is-size-6-mobile">
                    <a class="has-text-grey" target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">
                      {{cs}}{{item.tcg_low}}
                    </a>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered is-hidden-mobile" v-if="this.item.tcg_mid > 0">
                <div>
                  <p class="heading is-size-8">TCG Mid</p>
                  <p class="title is-size-5 is-size-6-mobile">
                    <a class="has-text-grey" target="_blank" title="Buy on TCGPlayer" rel="nofollow" :href="this.item.purchase_link_tcg">
                      {{cs}}{{item.tcg_mid}}
                    </a>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered" v-if="this.item.foil_price > 0">
                <div>
                  <p class="heading is-size-8">Foil Price</p>
                  <p class="title is-size-5 is-size-6-mobile  has-text-warning-dark">{{cs}}{{item.foil_price}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-8">Alternates</p>
                  <p class="title is-size-5 is-size-6-mobile">{{totalVariations}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading is-size-8">Buy Online</p>
                  <a :href="item.purchase_link" target="_blank" rel="nofollow" class="button is-dark is-small">Buy on TCGplayer</a>
                </div>
              </div>
            </div>
            <!-- variations -->
            <div class="inspectorVariations" v-if="totalVariations > 0">
              <div class="is-flex is-align-content-center	is-align-items-center inspectorControls mb-3" v-if="totalVariations > 5">

                <b-button icon-left="arrow-down" :type="isDarkModeActive == 1 ? 'is-dark' : ''" size="is-small" class="mr-auto" :disabled="variationStart == 0" @click="variationPrevious">Previous 5</b-button>
               <p class="has-text-grey is-size-7">Total Variations {{variationStart}}-{{(variationStart+variationLimit)}} of {{totalVariations}}</p>
                <b-button icon-right="arrow-up" :type="isDarkModeActive == 1 ? 'is-dark' : ''" size="is-small" class="ml-auto" :disabled="(variationStart+variationLimit) >= totalVariations" @click="variationNext">Next 5</b-button>
              </div>
              <div class="columns">
                <template v-for="(variation, index) in variations">

                  <div class="column is-one-fifth is-relative inspectorVariations" :key="variation.id" v-if="variationStart <= index && (variationStart+variationLimit) > index " >

                    <a target="_blank" :href="variation.card_url">

                      <b-image
                        style="border-radius:10px; width: 100%"
                        lazy
                        placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                        :src="variation?.image ? variation.image : ''"
                        width="320"
                        :alt="`${variation.name} ${variation.set}`" />

                      <div :class="'message is-flex py-1 px-3 mb-1 ' + (isDarkModeActive == 1 ? 'has-background-black' : 'has-background-light')">
                        <div v-if="variation.tcg_mid > 0" :class="isDarkModeActive == 1 ? 'has-text-white' : 'has-text-black'">{{cs}}{{variation.tcg_mid}}</div>
                        <div v-if="variation.foil_price > 0" class="ml-auto has-text-warning-dark">{{cs}}{{variation.foil_price}}</div>
                      </div>
                      <p class="has-text-white is-size-7 has-text-centered">{{variation.set}}</p>
                    </a>
                    <b-button
                        v-if="listItemId != null"
                        @click="swap(listItemId,variation.emid  )"
                        icon-left="swap-vertical"
                        class="is-dark swapButton"


                        >Swap</b-button>
                  </div>
                </template>
              </div>
            </div>
            <div class="pt-5 has-text-centered">
                <span class="mr-4">Shortcut Keys</span>
                <b-button size="is-small" icon-left="arrow-down" />
                <b-button size="is-small" icon-left="arrow-up" />
                <b-button size="is-small" icon-left="arrow-left" />
                <b-button size="is-small" icon-left="arrow-right" />
                <b-button size="is-small" icon-left="keyboard-return"> Return</b-button>
                <b-button @click="closeFocus()" size="is-small" icon-left="keyboard-esc"></b-button>
            </div>




          </div>



          </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  name: 'LargeInspectorCard',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: 'snap'
        }
      }
    },
    swap: {
      type: Function,
      default: null
    },
    listItemId: {
      type: Number,
      default: null
    },
    nextInspectorItem: {
      type: Function,
      default: null
    },
    priorInspectorItem: {
      type: Function,
      default: null
    }
  },
  data: () => {
    return {
      variations: [],
      variationStart: 0,
      variationLimit: 5,
      splicedVariations: []
    }
  },
  async mounted(){
    await this.fetchVariations()
    document.addEventListener("keydown", this.keybinds);
  },
  destroyed(){
    document.removeEventListener("keydown", this.keybinds)
  },
  watch: {
    item: {
      async handler(val){
        await this.fetchVariations()
      },
      deep: true
    },
    variationStart() {

    }
  },
  computed: {
    ...mapState([
      'isDarkModeActive'
    ]),
    cs() {
      return '$'
    },
    getImage(){
      let image = this.item.image ? this.item.image : this.item.image_url;
      return image ? image : ''
    },
    totalVariations(){
      return this.variations ? this.variations.length : 0
    },


  },
  methods: {
    keybinds(event){
      // left
      if (event.isComposing || event.keyCode === 37) {
          this.previousItem();
          return true;
      }
      // right
      if (event.isComposing || event.keyCode === 39) {
          this.nextItem();
          return true;
      }
      // up
      if (event.isComposing || event.keyCode === 40) {
          this.variationPrevious();
          return true;
      }
      // down
      if (event.isComposing || event.keyCode === 38) {
          this.variationNext();
          return true;
      }
    },
    async fetchVariations(){
      const res = await this.$echomtg.getVariations(this.item.name.replace(/ \((.*?)$/,''))

      this.variations = res.data?.variations ? res.data.variations : [];
      if(this.variations.length < 5) {
        this.variationLimit = this.variations.length;
      }

    },
    variationPrevious(){
      if(this.variationStart >= this.variationLimit){
        this.variationStart -= 5
      }
    },
    variationNext(){

      if((this.variationStart + this.variationLimit) < this.totalVariations ){
        this.variationStart += 5
      }
    },
    previousItem(){
      this.variations = []
      this.variationLimit = 5
      this.variationStart = 0
      if(this.priorInspectorItem){
        this.priorInspectorItem()
      }
    },
    nextItem(){
      this.variations = []
      this.variationLimit = 5
      this.variationStart = 0
      if(this.nextInspectorItem){
        this.nextInspectorItem()
      }


    },

  }
}
</script>
