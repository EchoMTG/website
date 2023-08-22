<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

     <div class="tradelist table-container ">
            <div class="columns is-gapless">
                <div class="column is-two-thirds">
                    <div class="container p-5">
                      <h4 class="title is-4">Browse and Select <strong class="is-capitalized">{{user.username}}'s</strong> {{totalTrades}} Items Marked for Trade</h4>
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
                      :height="tableHeight"
                      :debounce-search="0"

                      :data="trades"
                      :loading="loading"

                      :paginated="this.authenticated ? true : false"
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
                      checkable
                      :checkbox-position="`right`"
                      :checkbox-type="`is-info`"


                      detailed
                      custom-detail-row
                      @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
                      :show-detail-icon="$device.isDesktop ? true : false"
                      ref="table"
                      detail-key="inventory_id"


                      striped
                       :sticky-header="true"
                      sticky-checkbox
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
                              style="height: 50px; width:70px; float: left; margin-right: 4px;"
                              />
                        </a>
                        <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
                        <i class="has-text-warning-dark is-pulled-left mr-2 ss  ss-htr ss-3x rainbow-text" style="font-size: 24px; font-weight: bold" v-if="props.row.foil == 1"></i>
                        <item-inspector-wrapper :showsetsymbol="true" :item="props.row" />

                      </b-table-column>
                      <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="tcg_mid" label="Today" numeric sortable v-slot="props">
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
                          <b-tag type="is-light" style="cursor: help" :title="`Price adjusted ${getConditionDiscountPercentage(props.row.condition)} based on ${props.row.condition} condition.`">{{currency_symbol}}{{getConditionDiscount(props.row.tcg_mid, props.row.condition.toUpperCase())}}</b-tag>
                      </b-taglist>


                      </b-table-column>
                      <!-- <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="price_change" label="7-Day" numeric sortable v-slot="props">
                        <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)">
                          {{ props.row.price_change }} %
                        </span>
                      </b-table-column> -->

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
                      <template #footer v-if="!isCustom">
                <div v-if="!authenticated" class="has-text-right">
                    <div class="columns">
                      <div class="column is-5">
                        <h2 class="titel is-3">Login or Create a Free Account to browse all of {{username}} items</h2>
                      </div>
                      <div class="column is-5">
                        <user-sign-up-form />
                      </div>

                    </div>
                </div>
            </template>

                  </b-table>
                </div>
                <!-- trade proposal -->
                <div class="column proposal has-background-light">

                      <div class="container p-4">
                        <h4 class="title is-4">Message <b class="is-capitalized">{{user.username}}</b></h4>
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
import QuickGraph from '~/components/inventory/QuickGraph.vue'
import UserSignUpForm from '~/components/blocks/UserSignUpForm.vue'

export default {
  name: 'Tradelist',
  components: {
    EchoBreadCrumbs,
    SetTag,
    ItemInspectorWrapper,
    QuickGraph,
    UserSignUpForm
  },
  data() {

      return {
          trades: [],
          meta: {},
          user: {},
          loading: true,
          limit: 100,
          start: 0,
          loading: false,
          sortField: 'date_acquired',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 100,
          totalTrades: 0,
          currency_symbol: '$',
          currency_conversion: 1,
          userHash: '',
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
      }, 250)
    },
    min_price() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 250)
    },
    max_price(){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 250)
    }
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
    // if not authenticated cut the mount of items to show
    if(!this.authenticated){
      this.perPage = 10;
      this.trades = this.trades.slice(0,5)
    }
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
      getConditionDiscountPercentage(condition){
        return  ((Math.round(((1 - this.condition_price_modifiers.find((obj) => obj.condition == condition).discount) * 100) * 100) / 100) * -1) + '%'
      },
      getConditionDiscount(price, condition){
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
        // line these up to custom dropdown
        const params = [
          `user=${this.userHash}`,
          `search=${this.search}`,
          `sort=${this.sortField}`,
          `direction=${this.sortOrder}`,
          `start=${(this.page - 1) * this.limit}`,
          `limit=${this.limit}`,
          this.min_price ? `price_over=${this.min_price}` : null,
          this.max_price ? `price_under=${this.max_price}` : null,
        ].join('&')

        let json = await this.$echomtg.tradesView(params)
        this.trades = json.items;
        this.totalTrades = json.meta.total_items
        data.meta.total_pages * data.meta.items_per_page

      },

  },


  async asyncData({ params, redirect, $config, $echomtg }) {

    let userHash = params.user_hash;

    const reqParams = [
          `user=${userHash}`,
          `start=0`,
          `limit=100`,
        ].join('&')

    // try to get the json
    try {

      let json = await $echomtg.tradesView(reqParams)


      if(json.hasOwnProperty('trades')){

          let trades = json.items
          let user = json.trades.user
          user.hash = json.trades.user_hash
          let totalTrades = json.meta.total_items
          let currency_symbol = json.trades.currency_symbol
          let perPage = 100
          let page = json.meta.current_page
          return {
            trades, user, totalTrades, currency_symbol, userHash, perPage, page
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

    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `Tradelist: share your collection items with the public`,
          description: `A collector tools for sharing tradable items in their inventory`
      }
    }
}
</script>
