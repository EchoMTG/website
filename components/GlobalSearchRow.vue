<template>
  <div ref="main" :class="this.className">
    <i v-if="!showimage" :class="this.iconClassName"></i>
    <div v-if="showimage" class="searchImage">
        <div class="mana" v-html="manacost"></div>
        <i v-if="game == 1" :class="this.iconClassName"></i>
        <NuxtImg :src="croppedImage" width="140" :alt="name" />
    </div>

    <div class="itemName is-flex is-flex-direction-column">
        <div>
            <h4><a @click="gotopage(url)">{{name}}</a></h4>
            <div :class="this.previewOpenClass" >
                <div class="icon" @click="togglePreview">
                   <b-icon icon="image" class="is-left" size="is-small" />
                </div>
                <div class="cardPreview" ref="previewDiv">
                    <img :src="this.cardImage" @click="togglePreview">
                </div>
            </div>
        </div>
        <div>
            <p>{{setName}}</p>
        </div>
    </div>
    <div v-if="showprice" class="is-flex is-flex-direction-column searchRowPrices">
        <div>
            <span v-if="regularPrice > 0" class="has-text-info">{{currencysymbol}}{{regularPrice}}</span>
        </div>
        <div>
            <span v-if="foilPrice > 0"  class="has-text-warning">{{currencysymbol}}{{foilPrice}}</span>
        </div>
    </div>

    <div v-if="!showimage" v-html="manacost"></div>
    <div v-if="showinventorybuttons" class="is-flex is-flex-direction-column is-hidden-mobile inventoryButtons">
        <div  v-if="regularPrice > 0 || foilPrice == 0" class="field has-addons">
            <p class="control">
                <button @click="addRowToInventory(0)" class="button is-small is-outlined is-info">
                     <b-icon icon="plus" size="is-small" />
                    <span>Reg.</span>
                </button>
            </p>
            <p class="control">
                <input class="input is-info is-small  has-background-dark has-text-grey-light searchInput searchQuantity"
                v-model="quantity"
                  maxlength="3"
                  />
            </p>
            <p class="control">
                <input class="input is-info is-small has-background-dark has-text-grey-light searchInput searchAcquiredPrice"
                onclick="this.select()"
                v-model="priceAcquired"
                />
            </p>
        </div>
        <div v-if="foilPrice > 0" class="field has-addons is-small">

            <p class="control">
                <button @click="addRowToInventory(1)" class="button is-small is-outlined is-warning">
                    <b-icon icon="plus" size="is-small" />
                    <span>Foil</span>
                </button>
            </p>
            <p class="control">
                <input class="input is-warning is-small searchInput has-background-dark has-text-grey-light searchQuantity"
                v-model="quantityFoil"
                  maxlength="3"
                  />
            </p>
            <p class="control">
                <input class="input is-warning is-small searchInput has-background-dark has-text-grey-light searchAcquiredPrice"
                onclick="this.select()"
                v-model="priceAcquiredFoil" />
            </p>

        </div>
    </div>
    <div v-if="!showinventorybuttons"  class="searchRowUtilities">
        <button v-html="callbackname" class="button is-small is-outlined" v-if="callbackname != ''" @click="primaryCallback()"></button>
    </div>

</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'GlobalSearchRow',
    props: [
        'currencysymbol',
        'name',
        'emid',
        'setCode',
        'game',
        'item',
        'setName',
        'callbackname',
        'showinventorybuttons',
        'manacost',
        'url',
        'showimage',
        'image',
        'image_cropped',
        'showprice',
        'selected',
        'previewopen',
        'acquiredprice',
        'gotopage'
    ],
    data: function data() {
        return {
            quantityFoil: 1,
            quantity: 1,
            priceAcquired: this.acquiredprice,
            priceAcquiredFoil: this.acquiredprice,
        };

    },
    methods: {
        primaryCallback: function (){
            this.$emit('primaryCallback');
        },
        togglePreview: function (){
            this.$refs.previewDiv.classList.toggle('isSelected')
        },
        addRowToInventory: async function(foil=0){

            let ap = foil == 0 ? parseFloat(this.priceAcquired) : parseFloat(this.priceAcquiredFoil);
            let qty = foil == 0 ? this.quantity : this.quantityFoil;
            let options = {
                foil: foil,
                acquired_price: ap,
                quantity: qty
            }

            const res = await this.$echomtg.inventoryAdd(this.emid, options)

            this.$buefy.snackbar.open({
              message: res.message,
              type: 'is-warning',
              queue: false,
              duration: 10000,
              position: 'is-bottom-right',
              pauseOnHover: true,
              actionText: 'UNDO',
              onAction: async () => {
                  const deleted = await this.$echomtg.inventoryDeleteItem(res.inventory_id);
                  this.$buefy.snackbar.open({
                    message: `${res.inventory_id} ${deleted.message}`,
                    type: 'is-danger',
                    queue: false
                  });
              }
            })


            // refocus search
            this.$parent.$refs['searchInput'].focus()

            const quickstats = await this.$echomtg.inventoryQuickStats();
            if(quickstats.status == 'success'){
              this.$store.commit('quickstats',quickstats.stats);
            }

           let inventory = [...this.currentInventoryPage]
           console.log({...res.card,...options})

           inventory.unshift({...res.card,...options})

          this.$store.commit('currentInventoryPage',inventory);

        }
    },
    computed: {
        ...mapState(['currentInventoryPage']),
        className: function() {

            let hasImage = this.showimage ? `searchHasImage` : ``;
            let selected = this.selected ? `isSelected` : ``;
            return `searchRow ${hasImage} ${selected}`;
        },
        iconClassName: function() {

            let stl = this.setCode.toLowerCase()
            return `ss ss-${stl} ss-echo ss-2x`;
        },
        previewOpenClass: function(){
          return (this.previewopen) ? 'previewIcon open' : 'previewIcon'
        },
        croppedImage: function(){
            return this.image_cropped
        },

        cardImage: function(){
            return this.image
        },
        regularPrice: function(){
            let price = (this.item.tcg_market > 0) ? this.item.tcg_market : this.item.tcg_mid;
            if(this.acquiredprice == 0) this.priceAcquired = price;
            return price > 0 ? price : 0
        },
        foilPrice: function(){
            let price = (this.item.foil_price > 0) ? this.item.foil_price : 0;
            if(this.acquiredprice == 0) this.priceAcquiredFoil = price;
            return price;
        }
    }

}

</script>
