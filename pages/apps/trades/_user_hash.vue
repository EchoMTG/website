<template>
  <div>

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
          userHash: '',
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
    authenticated() {
      this.perPage = 100;
      this.loadAsyncData()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mounted() {
    // if not authenticated cut the mount of items to show
    if(!this.authenticated){
      this.perPage = 10;
      this.trades = this.trades.slice(0,5)
    }

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
        `user=${this.userHash}`,
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

    let userHash = params.user_hash;

    const reqParams = [
          `user=${userHash}`,
          `start=0`,
          `limit=1`,
        ].join('&')

    // try to get the json
    try {

      let json = await $echomtg.tradesView(reqParams)


      if(json.hasOwnProperty('trades')){

          redirect(`/${json.trades.user.username}/trades/`)
          let trades = json.items
          let tradeUser = json.trades.user
          tradeUser.hash = json.trades.user_hash
          let totalTrades = json.meta.total_items
          let currency_symbol = json.trades.currency_symbol
          let perPage = 100
          let page = json.meta.current_page
          let isLoading = false
          return {
            trades, isLoading, tradeUser, totalTrades, currency_symbol, userHash, perPage, page
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
