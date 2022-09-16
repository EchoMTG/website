
Vue.component('tradelist', {
    props: ['userHash'],
    data: function data() {

        return {
            trades: [],
            user: {},
            limit: 50,
            start: 0,
            totalTrades: 0,
            currency_symbol: '$',
            currency_conversion: 1,
            min_price: null,
            max_price: null,
            proposalMessage: null,
            selectedItems: [],
            search: '',
            sortOrder: 'DESC',
            sortMetric: 'name',
            condition_price_modifiers: [
                {condition: 'NM', discount: 1},
                {condition: 'SP', discount: 0.9},
                {condition: 'MP', discount: 0.8},
                {condition: 'P', discount: 0.7},
                {condition: 'D', discount: 0.5},
                {condition: 'GRADED', discount: 1.2}
            ],
            columnTitles: [
                {
                    name: 'Pricing',
                    sort: 'current_price'
                },
                {
                    name: 'Foil',
                    sort: 'foil'
                },
                {
                    name: 'Condition',
                    sort: 'condition'
                },
                {
                    name: 'Card Info',
                    sort: 'name'
                },

            ]

        };

    },

    methods: {

        // get tradelist
        // populate it
        // setup filters
        getTrades: async function (){
            var apiURL = api_url + 'trades/view/'
            apiURL += `?user=${this.userHash}`
            let res = await fetch(apiURL)
            let json = await res.json();
            createGrowl(json.message)
            if(json.hasOwnProperty('trades')){
                this.trades = json.trades.trades
                this.user = json.trades.user
                this.user.hash = json.trades.user_hash
                this.totalTrades = json.trades.total_cards
                this.currency_symbol = json.trades.currency_symbol
            }

        },
        addToList: function(itemToAdd){

            this.selectedItems.forEach(item => {
                if(item.inventory_id == itemToAdd.inventory_id){
                    alert('already added')
                }
            })
            this.selectedItems.push(itemToAdd)

        },
        getFilteredTradeResults: function() {
            return this.trades.filter(trade => {
                console.log(trade)
                if(this.search == '') return true

                return trade.name.toLowerCase().includes(this.search.toLowerCase())
            }).filter(trade => {
                if(this.min_price == '' || this.min_price == null) return true
                return trade.current_price >= parseFloat(this.min_price)
            }).filter(trade => {
                if(this.max_price == '' || this.max_price == null) return true
                return trade.current_price <= parseFloat(this.max_price)
            })
        }

    },
    computed: {
        proposalList: function(){
            let message = ''
            let total = 0
            this.selectedItems.forEach(item => {
                message += `1x ${item.name}\n`
                total += parseFloat(item.current_price)
            })
            message += `\nTotal: ${this.currency_symbol}${total}`

            return message

        }
    },
    watch: {
        

    },
    created () {
        this.getTrades();
    },
    template: `
        <div class="tradelist table-container ">
            <div class="columns">
                <div class="column is-two-thirds">
                    <h4 class="title is-4">{{user.username}}'s {{trades.length}} items for trade</h4>
                    <div class="tradefilterBar">
                    <div class="columns">
                        <div class="column">
                            <input class="input is-rounded is-small" v-model="search" placeholder="search..">
                        </div>
                        <div class="column">
                            <input class="input is-rounded is-small" v-model="min_price" placeholder="min price">
                        </div>
                        <div class="column">
                            <input class="input is-rounded is-small" v-model="max_price" placeholder="max price">
                        </div>
                    </div>
                 </div>
                    <table class="table tradelistTable is-fullwidth is-hoverable">
                        <thead class="has-background-black">
                            <tr>
                                <th v-for="title in columnTitles">{{title.name}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="trade in getFilteredTradeResults()" :key="trade.inventory_id" @click="addToList(trade)">
                                <td>{{currency_symbol}}{{trade.current_price}}</td>
                                <td>{{trade.foil}}</td>
                                <td>{{trade.condition}}</td>
                                <td>
                                    <div class="columns">
                                        <div class="column is-narrow">
                                            <img class="tradeThumbnail" :alt="trade.name" :src="trade.image_cropped">
                                        </div>
                                        <div class="column">
                                            <h6>{{trade.name}}</h6>
                                            <p>{{trade.expansion}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- trade proposal -->
                <div class="column proposal">
                    <div class="">
                        <h4 class="title is-4">Tally</h4>
<!--                        <textarea class="textarea" v-model="proposalMessage" placeholder="Your Message Here"></textarea>-->
                        <br />
                        <div class="content tradeProposalList">{{proposalList}}</div>
                    </div>
                </div>
            </div>
        </div>
    `

});

