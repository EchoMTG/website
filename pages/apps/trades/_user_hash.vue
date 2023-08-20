<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

     <div class="tradelist table-container ">
            <div class="columns is-gapless">
                <div class="column is-two-thirds">
                    <div class="container p-5">
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
                    </div>

                    <b-table
                      :data="trades"
                      :loading="loading"

                      paginated
                      backend-pagination
                      :total="total"
                      :per-page="perPage"
                      @page-change="onPageChange"
                      aria-next-label="Next page"
                      aria-previous-label="Previous page"
                      aria-page-label="Page"
                      aria-current-label="Current page"

                      backend-sorting
                      :default-sort-direction="defaultSortOrder"
                      :default-sort="[sortField, sortOrder]"
                      @sort="onSort">

                      <b-table-column field="name" label="Name" sortable v-slot="props">
                        <a :href="props.row.echo_url" :title="`Open ${props.row.name} Page`">
                          <b-image
                              lazy
                              :src="props.row.image_cropped"
                                custom-class="mr-3"
                                placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                                style="height: 50px; width:70px; float: left; margin-right: 4px;" />
                        </a>
                        <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
            <!-- <i class="has-text-warning-dark is-pulled-left mr-2 ss  ss-htr ss-3x rainbow-text" style="font-size: 24px; font-weight: bold" v-if="props.row.foil == 1">
            </i> -->
                        <item-inspector-wrapper :showsetsymbol="true" :item="props.row" />

                      </b-table-column>
                      <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="tcg_mid" label="Today" numeric sortable v-slot="props">
                        <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
                        {{props.row.foil_price}}
                        </span>
                        <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
                        {{props.row.tcg_market}}
                        </span>
                      </b-table-column>
                      <!-- <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="price_change" label="7-Day" numeric sortable v-slot="props">
                        <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)">
                          {{ props.row.price_change }} %
                        </span>
                      </b-table-column> -->

                      <!-- <template slot="detail" slot-scope="props">
                              <tr>
                                <td colspan="9" style="max-height: 300px">
                                  <section >
                                    <div class="columns">
                                      <div class="column is-one-fifth">
                                        <b-image
                                          :alt="props.row.name"
                                          :src="props.row.image"
                                          placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                                          />
                                      </div>
                                      <div class="column is-two-fifths">
                                        <quick-graph
                                          :emid="props.row.emid"
                                          :foil="props.row.foil"
                                          />
                                      </div>
                                      <div class="column is-two-fifths">
                                        <item-list-box :item="props.row" />
                                      </div>
                                    </div>
                                  </section>
                                </td>
                              </tr>
                            </template> -->


                  </b-table>

                    <!-- <table class="table tradelistTable is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th v-for="title in columnTitles" v-bind:key="title.sort">{{title.name}}</th>
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
                                            <h6 class="title is-7">{{trade.name}}</h6>
                                            <p class="subtitle is-7">{{trade.expansion}}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
                <!-- trade proposal -->
                <div class="column proposal has-background-light">
                    <div class="container p-4">
                        <h4 class="title is-4">Tally</h4>
<!--                        <textarea class="textarea" v-model="proposalMessage" placeholder="Your Message Here"></textarea>-->
                        <br />
                        <div class="content tradeProposalList">{{proposalList}}</div>
                    </div>
                </div>
            </div>
        </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import SetTag from '~/components/magic/SetTag.vue'

export default {
  name: 'Tradelist',
  components: {
    EchoBreadCrumbs,
    SetTag,
    ItemInspectorWrapper
  },
  data() {

      return {
          trades: [],
          user: {},
          loading: true,
          limit: 100,
          start: 0,
          total: 0,
          loading: false,
          sortField: 'date_acquired',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 20,
          totalTrades: 0,
          currency_symbol: '$',
          currency_conversion: 1,
          userHash: '',
          min_price: null,
          max_price: null,
          proposalMessage: null,
          selectedItems: [],
          search: '',
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
                  name: 'Item Info',
                  sort: 'name'
              },

          ]

      };

  },

  methods: {

      // get tradelist
      // populate it
      // setup filters

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

              if(this.search == '') return true

              return trade.name.toLowerCase().includes(this.search.toLowerCase())
          }).filter(trade => {
              if(this.min_price == '' || this.min_price == null) return true
              return trade.current_price >= parseFloat(this.min_price)
          }).filter(trade => {
              if(this.max_price == '' || this.max_price == null) return true
              return trade.current_price <= parseFloat(this.max_price)
          })
      },
      onPageChange(page) {
            this.page = page
            this.loadAsyncData()
        },

        onSort(field, order) {
            this.sortField = field
            this.sortOrder = order
            this.loadAsyncData()
        },
        async loadAsyncData() {
                // line these up to custom dropdown
                const params = [
                    'api_key=bb6f51bef07465653c3e553d6ab161a8',
                    'language=en-US',
                    'include_adult=false',
                    'include_video=false',
                    `sort_by=${this.sortField}.${this.sortOrder}`,
                    `page=${this.page}`
                ].join('&')

                let json = await this.$echomtg.tradesView(this.userHash)
                this.trades = json.trades.trades;
                console.log(this.trades)

                //  !!!
                // // get total items, fill out variable below to turn on the searchable and


               // this.loading = true
                // this.$http.get(`https://api.themoviedb.org/3/discover/movie?${params}`)
                //     .then(({ data }) => {
                //         // api.themoviedb.org manage max 1000 pages
                //         this.data = []
                //         let currentTotal = data.total_results
                //         if (data.total_results / this.perPage > 1000) {
                //             currentTotal = this.perPage * 1000
                //         }
                //         this.total = currentTotal
                //         data.results.forEach((item) => {
                //             item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
                //             this.data.push(item)
                //         })
                //         this.loading = false
                //     })
                //     .catch((error) => {
                //         this.data = []
                //         this.total = 0
                //         this.loading = false
                //         throw error
                //     })
            },

  },


  async asyncData({ params, redirect, $config, $echomtg }) {

    let userHash = params.user_hash;

    // try to get the json
    try {

      let json = await $echomtg.tradesView(userHash)

      console.log(json)

      if(json.hasOwnProperty('trades')){

          let trades = json.trades.trades
          console.log(trades)
          let user = json.trades.user
          user.hash = json.trades.user_hash
          let totalTrades = json.trades.total_cards
          let currency_symbol = json.trades.currency_symbol
          return {
            trades, user, totalTrades, currency_symbol, userHash
          }
      }
    } catch (err) {
      redirect('/')
    }


  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''
        },
        {
          label: 'Trades',
          url: '/apps/trades/',
          icon: 'briefcase-arrow-left-right'
        },
        {
          label: `${this.user.username}'s Trade List`,
          url: this.$route.path,
          icon: ''
        }
      ]
    },
    proposalList: function(){
        let message = ''
        let total = 0
        this.selectedItems.forEach(item => {
            message += `1x ${item.name}\n`
            total += parseFloat(item.current_price)
        })
        message += `\nTotal: ${(this.currency_symbol)}${total.toFixed(2)}`

        return message

    }
  },
  head () {
      return {
          title: `Tradelist: share your collection items with the public`,
          description: `A collector tools for sharing tradable items in their inventory`
      }
    }
}
</script>
