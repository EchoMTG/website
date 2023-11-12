<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

     <div class="tradelist table-container ">
            <div class="columns is-gapless">
                <div class="column is-four-fifths">
                    <div class="container p-5">
                      <h4 class="title is-4"><strong class="is-capitalized">{{tradeUser.username}}</strong> has {{totalTrades}} items for Trade. Search and Tally what you're interested in.</h4>


                      <div class="tradefilterBar">
                        <nav class="level p-2">
                          <div class="level-left">

                            <b-input
                              class="level-item"
                              icon="magnify"
                              size="is-small"
                              v-model="search"
                              :placeholder="`Search ${tradeUser.username}'s trades...`" />

                            <set-selector class="level-item is-hidden-mobile"  :callback="setExpansion" />

                            <b-select class="level-item is-hidden-mobile"  placeholder="Reserve List" size="is-small" v-model="reserve_list">
                                <option selected value="false">Reserve List</option>
                                <option disabled>---</option>
                                <option value="false">Show All</option>
                                <option value="true">Only Reserve</option>
                            </b-select>

                            <b-field class="level-item" style="margin-bottom: 0 !important;">
                              <p class="control">
                                  <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                                    <strong>{{currency_symbol}} &gt;</strong>
                                  </b-button>
                              </p>
                              <b-input
                                v-model="min_price"
                                size="is-small"
                                style="max-width: 50px;"
                                placeholder="2.10"
                                class="mr-2"
                                />

                                <b-field class="level-item" style="margin-bottom: 0 !important;">
                                  <p class="control">
                                      <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                                        <strong>{{currency_symbol}} &lt;</strong>
                                      </b-button>
                                  </p>
                                  <b-input
                                    style="max-width: 50px;"
                                    v-model="max_price"
                                    size="is-small"
                                    placeholder="9.20"
                                    />
                                </b-field>
                            </b-field>

                          </div>
                          <div class="level-right">
                            <b-button class="level-item" type="is-dark" size="is-small" icon-left="close" v-if="hasFilters" @click="clearFilters()">Clear Filters</b-button>
                          </div>
                        </nav>
                      </div>
                    </div>

                    <b-table
                      :height="tableHeight"
                      :debounce-search="0"

                      :data="trades"
                      :loading="isLoading"

                      :paginated="true"
                      backend-pagination
                      :total="totalTrades"
                      :per-page="perPage"
                      @page-change="onPageChange"
                      aria-next-label="Next page"
                      aria-previous-label="Previous page"
                      aria-page-label="Page"
                      aria-current-label="Current page"

                      narrowed

                      :checked-rows.sync="selectedItems"
                      :checkable="!isUserOwner"


                      detailed
                      custom-detail-row
                      @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
                      :show-detail-icon="$device.isDesktop ? true : false"
                      ref="table"
                      detail-key="inventory_id"


                      striped
                       :sticky-header="true"
                      backend-sorting
                      :default-sort-direction="defaultSortOrder"
                      :default-sort="[sortField, sortOrder]"
                      @sort="onSort">

                      <b-table-column field="name" label="Name" sortable v-slot="props">
                        <a class="is-pulled-left mr-3" style="position: relative; overflow: hidden;"  :href="props.row.echo_url.replace('https://www.echomtg.com','')" :title="`Open ${props.row.name} Page`">
                          <b-image
                              lazy
                              :src="props.row.image_cropped"
                              custom-class=""
                              placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                              style="height: 32px; width:44px;"
                              />
                              <div v-if="props.row.foil == 1" class="rainbow-background" style="position: absolute; opacity: .3; top: 0; right: 0; bottom: 0; left: 0;"></div>
                              <i v-if="props.row.foil == 1" class=" ss  ss-htr ss-3x" style="color: white; font-size: 24px; font-weight: bold; opacity: .5; position: absolute; bottom: -5px; right: 5px;" ></i>
                        </a>
                        <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>

                        <item-inspector-wrapper :showsetsymbol="true" :item="props.row" />

                      </b-table-column>
                      <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="set_code" label="Expansion" sortable v-slot="props">
                        <set-tag classes="is-align-self-flex-start mb-0 mr-2" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
                      </b-table-column>
                      <b-table-column :visible="tradeUser.trade_modifier != 0" field="current_price" :label="`${tradeUser.username}'s ask`" numeric sortable v-slot="props">
                        <b-tooltip type="is-success" style="cursor: help" position="is-bottom" :label="`${(tradeUser.trade_modifier * 100)}% Adjusted from ${tradeUser.username}`">
                          <strong>{{currency_symbol}}{{(parseFloat(props.row.tcg_mid) + parseFloat((props.row.tcg_mid * parseFloat(tradeUser.trade_modifier)).toFixed(2))).toFixed(2)}}</strong>
                        </b-tooltip>
                       </b-table-column>
                      <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="current_price" label="Today" numeric sortable v-slot="props">
                        <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
                        {{currency_symbol}}{{props.row.foil_price}}
                        </span>
                        <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
                        {{currency_symbol}}{{props.row.tcg_mid}}
                        </span>
                      </b-table-column>

                       <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="condition" label="Condition" sortable v-slot="props">
                        <b-taglist attached>
                          <b-tag type="is-dark">{{props.row.condition}}</b-tag>
                          <b-tag type="is-light" style="cursor: help" :title="`Price adjusted ${getConditionDiscountPercentage(props.row.condition)} based on ${props.row.condition} condition.`">{{currency_symbol}}{{getConditionDiscount(props.row.current_price, props.row.condition.toUpperCase())}}</b-tag>
                      </b-taglist>


                      </b-table-column>
                      <b-table-column :visible="isUserOwner" cell-class="is-hidden-touch" header-class="is-hidden-touch"   v-slot="props">
                        <move-to-earnings-button :inventory_item="props.row" :currency_symbol="currency_symbol" :callback="loadAsyncData"/>
                        <toggle-tradable-button icon="delete" type="danger" :inventory_id="parseInt(props.row.inventory_id)" :tradable="1" :callback="loadAsyncData" />
                      </b-table-column>

                      <template slot="detail" slot-scope="props">
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
                                <div class="column is-four-fifths">
                                  <quick-graph
                                    :emid="props.row.emid"
                                    :foil="props.row.foil"
                                    />
                                </div>
                              </div>
                            </section>
                          </td>
                        </tr>
                      </template>


                  </b-table>
                </div>
                <!-- trade proposal -->
                <div class="column proposal has-background-light">
                  <div class="container p-4" v-if="!isUserOwner">
                    <h4 class="title is-4">Tally wants from <b class="is-capitalized">{{tradeUser.username}}</b></h4>
<!--                        <textarea class="textarea" v-model="proposalMessage" placeholder="Your Message Here"></textarea>-->
                    <br />
                    <div class="content tradeProposalList">{{proposalList}}</div>
                      <div v-if="!authenticated" class="box">
                        <h2 class="is-size-6 mb-3">Login or Create a Free Account submit a trade request to <strong>{{tradeUser.username}}</strong></h2>
                        <create-account-modal size="is-small" />
                      </div>
                  </div>
                  <div class="container p-4" v-if="isUserOwner">
                    <h4 class="title is-4">Your Trade Page</h4>
                    <p>Your trade modifier is {{tradeUser.trade_modifier * 100}}%, change this value in your <nuxt-link to="/user/settings/">user settings</nuxt-link></p>
                    <br/>
                    <p>Add more trades to this list from your <nuxt-link to="/apps/inventory/">collection manager</nuxt-link></p>
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
import QuickGraph from '~/components/inventory/QuickGraph.vue'
import CreateAccountModal from '~/components/user/CreateAccountModal.vue'
import SetSelector from '~/components/magic/SetSelector.vue'
import SkinnyAd from '~/components/cta/SkinnyAd.vue'
import MoveToEarningsButton from '~/components/inventory/MoveToEarningsButton.vue'
import ToggleTradableButton from '~/components/inventory/ToggleTradableButton.vue'

export default {
  name: 'Tradelist',
  components: {
    EchoBreadCrumbs,
    SetTag,
    ItemInspectorWrapper,
    QuickGraph,
    CreateAccountModal,
    SetSelector,
    SkinnyAd,
    MoveToEarningsButton,
    ToggleTradableButton
  },
  data() {

      return {
          trades: [],
          meta: {},
          limit: 100,
          start: 0,
          tradeUser: {
            username: ''
          },
          reserve_list: null,
          loading: false,
          sortField: 'current_price',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          set_code: '',
          perPage: 100,
          totalTrades: 0,
          currency_symbol: '$',
          currency_conversion: 1,
          username: '',
          isLoading: true,
          min_price: null,
          max_price: null,
          proposalMessage: null,
          selectedItems: [],
          search: '',
          tableHeight: this.tableHeight,
          debounce: null,
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
  watch: {
    search() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 100)
    },
    min_price() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 100)
    },
    max_price(){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 100)
    },
    set_code(){
      this.loadAsyncData();
    },
    reserve_list(){
      this.loadAsyncData();
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mounted() {
    this.onResize();
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })

  },

  methods: {
    clearFilters() {
      this.search = ''
      this.set_code = ''
      this.min_price = null
      this.max_price = null
      this.reserve_list = null
    },
    // get tradelist
    // populate it
    // setup filters
    setExpansion(set){
      if(set?.set_code){
        this.set_code = set.set_code
      } else {
        this.set_code = ''
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
    getConditionDiscountPercentage(condition){
      if(this.condition_price_modifiers.find((obj) => obj.condition == condition) == undefined) return 1
      return  ((Math.round(((1 - this.condition_price_modifiers.find((obj) => obj.condition == condition).discount) * 100) * 100) / 100) * -1) + '%'
    },
    getConditionDiscount(price, condition){
      if(this.condition_price_modifiers.find((obj) => obj.condition == condition) == undefined) return price
      return Math.round((price * this.condition_price_modifiers.find((obj) => obj.condition == condition).discount) * 100) / 100
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    onSort(field, order) {
      console.log(order)
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
    },
    updateTableHeight() {

      let height = 600;
        if(this.$refs.table){
          let rects = this.$refs.table.$el.getBoundingClientRect();
          height = (this.windowHeight - rects.top) - 80 // 120 is the table header and pagination bar
        }
        this.tableHeight = height
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.updateTableHeight()
    },
    async loadAsyncData() {
      this.isLoading = true
      // line these up to custom dropdown
      const params = [
        `user=${this.username}`,
        `search=${this.search}`,
        `sort=${this.sortField}`,
        `direction=${this.sortOrder}`,
        `start=${(this.page - 1) * this.limit}`,
        `limit=${this.limit}`,
        this.set_code ? `set_code=${this.set_code}` : null,
        this.min_price ? `price_over=${this.min_price}` : null,
        this.max_price ? `price_under=${this.max_price}` : null,
        this.reserve_list ? `reserve_list=${this.reserve_list}` : null,
      ].join('&')

      let json = await this.$echomtg.tradesView(params)
      this.trades = json.items;
      this.totalTrades = json.meta.total_items
      this.isLoading = false
      // data.meta.total_pages * data.meta.items_per_page

    },

  },


  async asyncData({ params, redirect, $config, $echomtg }) {

    let username = params.username;

    const reqParams = [
          `user=${username}`,
          `start=0`,
          `limit=100`,
        ].join('&')

    // try to get the json
    try {

      let json = await $echomtg.tradesView(reqParams)

      if(json.hasOwnProperty('trades')){

          let trades = json.items
          let tradeUser = json.trades.user
          tradeUser.hash = json.trades.user_hash
          let totalTrades = json.meta.total_items
          let currency_symbol = json.trades.currency_symbol
          let perPage = 100
          let page = json.meta.current_page
          let isLoading = false
          return {
            trades, isLoading, tradeUser, totalTrades, currency_symbol, username, perPage, page
          }
      }
    } catch (err) {
      redirect('/')
    }


  },
  computed: {
    isUserOwner() {
      return this.user.username == this.tradeUser.username
    },
    hasFilters(){
      return (this.set_code != '' || this.search != '' || this.min_price > 0 || this.max_price > 0 || this.reserve_list != null)
    },
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
          icon: 'swap-horizontal-bold'
        },
        {
          label: `${this.tradeUser.username}'s Trade List`,
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
            total += this.tradeUser.trade_modifier != 0 ? parseFloat(item.current_price) + (parseFloat(item.current_price) *  parseFloat(this.tradeUser.trade_modifier)) : parseFloat(item.current_price)
        })
        message += `\nTotal: ${(this.currency_symbol)}${total.toFixed(2)}`

        return message

    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `${this.tradeUser.username}'s Tradelist`,
          description: `A collector tools for sharing tradable items in their inventory`
      }
    }
}
</script>
