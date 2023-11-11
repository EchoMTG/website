<template>
    <div class="card">
        <header class="card-header">


            <p class="card-header-title">
                <a @click="isOpen = !isOpen" class="has-text-grey">{{title}} {{this.items.length}}</a>
            </p>
            <button
                class="card-header-icon"
                aria-label="collapse item inventory tools"
                @click="isOpen = !isOpen"
                :aria-expanded="isOpen"
                aria-controls="inventoryToolBox"
                >
                <span class="icon">
                    <b-icon v-if="isOpen" icon="menu-down" aria-hidden="true"></b-icon>
                    <b-icon v-if="!isOpen" icon="menu-left" aria-hidden="true"></b-icon>
                </span>
            </button>

        </header>
         <div class="is-flex">
            <quick-add-button
              v-if="priceMid > 0 || !(priceMid > 0 && priceFoil > 0)"
              :emid="item.emid"
              :foil="0"
              :buttonText="`Add Regular`"
              size=""
              classes="m-2"
              />
            <quick-add-button
              v-if="priceFoil > 0"
              :emid="item.emid"
              :foil="1"
              :buttonText="`Add Foil`"
              size=""
              classes="m-2"
              />



          </div>
        <b-collapse
            aria-id="inventoryToolBox"
            animation="slide"
            v-model="isOpen">
            <div class="card-content p-0">

                <p class="p-5  has-text-grey-light has-text-centered is-size-6" v-if="this.items.length == 0">You don't have any {{this.item.name}} from {{this.item.expansion}} in your inventory.</p>

                <b-table
                    v-if="this.items.length > 0"
                    :data="this.items"
                    :striped="true"
                    :paginated="paginated"
                    :per-page="6"
                    :mobile-cards="false"
                    default-sort="acquiredOn"
                    default-sort-direction="ASC">
                    <b-table-column field="acquiredOn" label="Acq. Date" sortable date v-slot="props">
                        {{ props.row.acquiredOn }}
                        <img style="height:40px" :alt="item.name" v-if="props.row.user_image" :src="props.row.user_image" />
                    </b-table-column>
                    <b-table-column field="acquiredPrice" label="Acq. Price" sortable numeric v-slot="props">

                        <b-tag v-if="props.row.foil == 1" class="rainbow-background has-text-white" rounded>foil</b-tag>
                        {{cs}}{{ props.row.acquiredPrice.toLocaleString("en-US") }}
                    </b-table-column>

                    <b-table-column  v-slot="props">
                      <touch-flyout :compact="true">
                          <div class="touch-flyout-container is-flex is-flex-direction-row" >
                            <NuxtImg height="22" width="40" class="mr-auto" :src="props.row.image_cropped" />
                            <note-button class="mr-1" :inventory_item="props.row" :callback="getItems" />
                            <move-to-earnings-button class="mr-1" :inventory_item="props.row" :currency_symbol="user.currency_symbol" :callback="moveCallback"/>
                            <b-button class="mr-1" icon-left="delete" aria-label="Remove Item from Inventory" size="is-small" type="is-danger" @click="deleteItem(props.row.inventoryID)"/>
                          </div>
                      </touch-flyout>
                    </b-table-column>
                </b-table>
            </div>
        </b-collapse>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import MoveToEarningsButton from '~/components/inventory/MoveToEarningsButton.vue'
import NoteButton from '../inventory/NoteButton.vue'
import QuickAddButton from '../inventory/QuickAddButton.vue'
import TouchFlyout from '../responsive/TouchFlyout.vue'

export default {
    name: 'ItemToolBox',
    components: {
      MoveToEarningsButton,
      NoteButton,
      TouchFlyout,
        QuickAddButton
    },
    props: {
        item: {
            type: Object,
            default: () => {
                name: ''
            },
        },
        callback: {
          type: Function
        },
        open: {
          type: Boolean,
          default: true
        },
        title: {
          type: String,
          default: 'My Inventory: '
        }
    },
    data: function data() {

        return {
            items: [],
            actions: 0,
            isOpen: this.open,
            acquiredAddPrice: 0.01,
            acquiredAddFoilPrice: 0.01

        };

    },

    methods: {
        async moveCallback(){
          await this.getItems()
          if(this.callback){
            this.callback()
          }
        },

        deleteItem: function (inventoryID){
            fetch(this.removeAPIURL+inventoryID,{
                headers: {
                    'Authorization' : 'Bearer ' + this.$cookies.get('token')
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.$buefy.snackbar.open({
                    message: json.message,
                    type: 'is-warning',
                    queue: true,
                    position: 'is-top',
                })
                this.actions++;
                if(this.callback){
                  this.callback()
                }
            }).catch(function (error) {
                this.$echomtg.log(error);
            });
        },
        addAPIURL: function(foil=0){
            let acqPrice = (foil == 1) ? this.acquiredAddFoilPrice : this.acquiredAddPrice;
            return `${this.$config.API_DOMAIN}inventory/add/?quantity=1&emid=${this.emid}&foil=${foil}&acquired_price=${acqPrice}`;
        },
        addEarningsURL: function(acquiredPrice,foil=0){
            return `${this.$config.API_DOMAIN}earnings/add/emid=${this.emid}&acquired_price=${acquiredPrice}&foil=${foil}`;
        },
        addItem: function (foil=0){
            fetch(this.addAPIURL(foil),{
                headers: {
                    'Authorization' : 'Bearer ' + this.$cookies.get('token')
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.$buefy.snackbar.open({
                    message: json.message,
                    type: 'is-success',
                    queue: true,
                    position: 'is-top',
                })
                this.actions++;
            }).catch(function (error) {
                this.$buefy.snackbar.open({
                    message: error,
                    type: 'is-error',
                    position: 'is-top',
                })
            });
        },
        async getItems(){
            try {
                const res = await fetch(this.getAPIURL,{
                    headers: {
                        'Authorization' : 'Bearer ' + this.$cookies.get('token')
                    }
                })
                const data = await res.json();
                this.items = data.results;
            } catch (err){
                this.$echomtg.log(err);
            }
        }

    },
    computed: {
        ...mapState([
          'user'
        ]),
        cs() {
          return this.user.currency_symbol
        },
        paginated() {
            return this.items.length > 6 ? true : false;
        },
        getAPIURL: function(){
            return `${this.$config.API_DOMAIN}inventory/search/?emid=${this.item.emid}`;
        },
        emid: function(){
            return this.item.emid;
        },
        removeAPIURL: function(){
            return `${this.$config.API_DOMAIN}inventory/remove/?inventory_id=`;
        },
        priceFoil: function(){
            return parseFloat(this.item.foil_price)
        },
        priceMid: function(){
            return parseFloat(this.item.tcg_mid)
        },
        currencyCode: function(){
            return this.item.currencyCode
        },
        totalValue: function(){
            let totalValue = 0;
            if(typeof this.items !== 'undefined') {
                this.items.forEach(item => {
                    totalValue += item.foil == 1 ? this.price_foil : this.tcg_mid
                });
            }
            return totalValue
        },
        totalItems: function(){
            return (typeof this.items !== 'undefined') ? this.items.length : 0;
        }

    },
    watch: {
        actions:function(){
          this.getItems();
        }

    },
    created () {
        this.acquiredAddPrice = this.item.tcg_mid
        this.acquiredAddFoilPrice = this.item.foil_price
        this.getItems();
    }

}
</script>
