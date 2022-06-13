
var api_url = (window.location.hostname == 'dev.echomtg.com') ? 'https://dev.echomtg.com/api/' : 'https://www.echomtg.com/api/';

Vue.component('item-toolbox-view', {
    data: function data() {

        return {
            items: [],
            actions: 0,
            acquiredPrice: 0

        };

    },

    methods: {

        soldItem: function (acquiredPrice,inventoryID,foil=0){

            fetch(this.addEarningsURL(acquiredPrice,inventoryID)).then( (response) => {
                return response.json();
            }).then((json) => {
                createGrowl(json.message);
                this.actions++;
                this.deleteItem(inventoryID);
            }).catch(function (error) {
                createGrowl(error);
            });
        },
        deleteItem: function (inventoryID){
            fetch(this.removeAPIURL+inventoryID).then((response) => {
                return response.json();
            }).then((json) => {
                createGrowl(json.message);
                this.actions++;
            }).catch(function (error) {
                createGrowl(error);
            });
        },
        addAPIURL: function(foil=0){
            return `/api/inventory/add/?quantity=1&emid=${this.emid}&foil=${foil}&acquired_price=${this.acquiredPrice}`;
        },
        addEarningsURL: function(acquiredPrice,foil=0){
            return `/api/earnings/add/emid=${this.emid}&acquired_price=${acquiredPrice}&foil=${foil}`;
        },
        addItem: function (foil=0){
            fetch(this.addAPIURL(foil)).then((response) => {
                return response.json();
            }).then((json) => {
                createGrowl(json.message);
                this.actions++;
            }).catch(function (error) {
                createGrowl(error);
            });
        },
        getItems: function(){
            fetch(this.getAPIURL).then((response) => {
                return response.json();
            }).then((json) => {
                 this.items = json.results;
            }).catch(function (error) {
                createGrowl(error);
            });
        }

    },
    computed: {
        getAPIURL: function(){
            return "/api/inventory/search/?emid="+this.$parent.emid;
        },
        emid: function(){
            return this.$parent.emid;
        },
        removeAPIURL: function(){
            return "/api/inventory/remove/?inventory_id=";
        },
        priceFoil: function(){
            return parseFloat(this.$parent.priceFoil)
        },
        priceMid: function(){
            return parseFloat(this.$parent.priceMid)
        },
        currencyCode: function(){
            return this.$parent.currencyCode
        },
        totalValue: function(){
            let totalValue = 0;
            if(typeof this.items !== 'undefined') {
                this.items.forEach(item => {
                    totalValue += item.foil == 1 ? this.priceFoil : this.priceMid
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
    template: `
        <div class="itemToolbox">
            <div class="addBox" style="padding: 5px; text-align: center;">
                 <input v-if="priceMid > 0 || priceFoil > 0" class="input is-small rounded is-rounded" style="max-width:70px; padding: 0px 5px; " v-model="acquiredPrice">

                <a v-if="priceMid > 0 || !(priceMid > 0 && priceFoil > 0)" class="button small black" @click="addItem(0)"><i class="fa fa-plus"></i> Normal</a>
                <a v-if="priceFoil > 0" class="button small black foil" @click="addItem(1)"><i class="fa fa-plus"></i> Foil</a>
            </div>
            <table class="table is-striped is-narrow" style="margin-bottom: 0px;">
                <thead>
                    <tr>
                        <th>Acq. Price</th><th colspan="2">Acq. Date</th>
                    </tr>
                </thead>
                <tr v-for="item in items" >
                    <td>
                        <span v-if="item.foil == 1" class="foil foiled" style="border: 1px solid grey; border-radius: 3px; padding: 0px 3px;">F</span>
                        {{currencyCode}}{{item.acquiredPrice}}
                    </td>
                    <td>{{item.acquiredOn}}</td>
                    <td>
                        <a class="button black small" style="color: green" @click="soldItem(item.acquiredPrice,item.inventoryID,item.foil)"><i class="fa fa-usd"></i></a>
                        <a class="button black small" style="color:red" @click="deleteItem(item.inventoryID)"><i class="fa fa-trash"></i></a>
                    </td>
                    
                </tr>
                <tfoot>
                    <tr>
                        <th>Total ({{totalItems}})</th><th colspan="2" style="text-align: right">{{currencyCode}}{{totalValue}}</th>
                    </tr>
                </tfoot>   
            </table> 
        
        </div>
    `,
    created () {
        this.acquiredPrice = this.$parent.priceMid
        this.getItems();
    }

});



