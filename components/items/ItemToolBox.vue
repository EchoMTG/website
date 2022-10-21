<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Your Inventory
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <b-icon icon="menu-down" aria-hidden="true"></b-icon>
            </span>
            </button>
        </header>
        <div class="card-content p-0">

            <p class="p-5  has-text-grey-light has-text-centered is-size-6" v-if="this.items.length == 0">You don't have any {{this.item.name}} from {{this.item.expansion}} in your inventory.</p>
            
            <b-table
                v-if="this.items.length > 0"
                :data="this.items"
                striped
                default-sort="acquiredOn"
                default-sort-direction="ASC">
                <b-table-column field="acquiredOn" label="Acq. Date" sortable date v-slot="props">
                    {{ props.row.acquiredOn }}
                    <img style="height:40px" :alt="item.name" v-if="props.row.user_image" :src="props.row.user_image" />
                </b-table-column>
                <b-table-column field="acquiredPrice" label="Acq. Price" sortable numeric v-slot="props">
                    <b-tag v-if="props.row.foil == 1" class="has-background-warning-dark has-text-white" rounded>foil</b-tag>
                    {{cs}}{{ props.row.acquiredPrice.toLocaleString("en-US") }}
                </b-table-column>
                
                <b-table-column v-slot="props">
                    <a class="button is-small"  @click="soldItem(props.row.acquiredPrice,props.row.inventoryID,props.row.foil)"><i class="fa fa-usd"></i></a>
                    <a class="button is-small" @click="deleteItem(props.row.inventoryID)"><i class="fa fa-trash"></i></a>
                </b-table-column>
            </b-table>
        </div>
        <footer class="card-footer">
         
            <a style="border-right: none;" v-if="priceMid > 0 || !(priceMid > 0 && priceFoil > 0)" class="card-footer-item has-text-black" @click="addItem(0)">
                <b-icon icon="plus"></b-icon> Regular</a>
                <input 
                v-if="priceMid > 0 || priceFoil > 0" 
                class="input card-footer-item is-shadowless m-0"
                style="border-bottom: none;border-left: none;border-top: none; border-radius: 0; height: auto" 
                v-model="acquiredAddPrice" 
            />
            <a style="border-right: none;" v-if="priceFoil > 0" class="card-footer-item has-text-warning-dark" @click="addItem(1)">
                <b-icon icon="plus"></b-icon>  Foil
            </a>
            <input 
                v-if="priceMid > 0 || priceFoil > 0" 
                class="input card-footer-item is-shadowless m-0"
                style="border: none; border-radius: 0; height: auto" 
                v-model="acquiredAddFoilPrice" 
            />

        </footer>
    </div>
</template>
<script>
export default {
    name: 'ItemToolBox',
    props: {
        item: {
            type: Object,
            default: () => {
                name: ''
            },
        },
    },
    data: function data() {

        return {
            items: [],
            actions: 0,
            cs: '$',
            acquiredAddPrice: 0.01,
            acquiredAddFoilPrice: 0.01

        };

    },

    methods: {

        soldItem: function (acquiredPrice,inventoryID,foil=0){
            
            fetch(this.addEarningsURL(acquiredPrice,inventoryID),{
                headers: {
                    'Authorization' : 'Bearer ' + this.$cookies.get('token')
                }
            }).then( (response) => {
                return response.json();
            }).then((json) => {
                this.$echomtg.createGrowl(json.message);
                this.actions++;
                this.deleteItem(inventoryID);
            }).catch(function (error) {
                this.$echomtg.createGrowl(error);
            });
        },
        deleteItem: function (inventoryID){
            fetch(this.removeAPIURL+inventoryID,{
                headers: {
                    'Authorization' : 'Bearer ' + this.$cookies.get('token')
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.$echomtg.createGrowl(json.message);
                this.actions++;
            }).catch(function (error) {
                this.$echomtg.createGrowl(error);
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
                this.$echomtg.createGrowl(json.message);
                this.actions++;
            }).catch(function (error) {
                this.$echomtg.createGrowl(error);
            });
        },
        getItems: function(){
            fetch(this.getAPIURL,{
                headers: {
                    'Authorization' : 'Bearer ' + this.$cookies.get('token')
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
                 this.items = json.results;
            }).catch(function (error) {
                this.$echomtg.createGrowl(error);
            });
        }

    },
    computed: {
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