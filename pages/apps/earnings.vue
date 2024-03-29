<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad
      title="You Must be Logged in to Use the Earning App"
      image="https://assets.echomtg.com/images/product/earnings-app-2023.png"
      v-if="!authenticated" />
    <span v-if="authenticated">
      <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-4">
        <div class="columns">
          <div class="column  is-two-thirds">
            <h1 class="title has-text-white">
                Earnings
            </h1>
            <h3 v-if="authenticated" class="subtitle has-text-light">
                {{this.total}} items acquired for {{cs}}{{this.stats.acquired_value.toFixed(2)}} sold at {{cs}}{{this.stats.sold_value.toFixed(2)}}. A {{this.stats.gainLoss}}% gain.
            </h3>
            <h3 v-if="!authenticated" class="subtitle has-text-light">
              Track the profit and loss of items acquired and sold from your collection.
            </h3>
          </div>
          <div class="column is-one-third">
            <b-button v-if="authenticated" class="is-pulled-right" @click="downloadCSV()" icon-left="download">Download Earnings CSV</b-button>
          </div>
        </div>
         <nav class="level is-mobile p-0">
          <div class="level-left">
            <b-input
                placeholder="Search Inventory..."
                type="is-info"
                v-model="search"
                icon="magnify"

                size="is-small"
                class="level-item mr-2"
                />

            <set-selector class="level-item"  :callback="setExpansion" />


          </div>
          <div class="level-right">

            <b-taglist class="level-item" attached>
              <b-tag class="mythic-background">Mythic</b-tag>
              <b-tag type="is-dark">{{stats.mythics}}</b-tag>
            </b-taglist>
            <b-taglist class="level-item" attached>
              <b-tag class="rare-background has-text-white">Rares</b-tag>
              <b-tag type="is-dark">{{stats.rares}}</b-tag>
            </b-taglist>
             <b-taglist class="level-item" attached>
              <b-tag class="uncommon-background">Uncommons</b-tag>
              <b-tag type="is-dark">{{stats.uncommons}}</b-tag>
            </b-taglist>
             <b-taglist class="level-item" attached>
              <b-tag class="common-background ">Commons</b-tag>
              <b-tag type="is-dark">{{stats.commons}}</b-tag>
            </b-taglist>
            <b-taglist class="level-item" attached>
              <b-tag class="rainbow-background has-text-white">Foils</b-tag>
              <b-tag type="is-dark">{{stats.foils}}</b-tag>
            </b-taglist>
             <div class="level-item" >
             </div>
          </div>
       </nav>

      </section>



      <b-table
        v-if="authenticated"
        :striped="true"
        :data="earnings"
        ref="table"
        :height="tableHeight"
        :debounce-search="0"
        :sticky-header="true"
        :sticky="true"
        :loading="loading"
        paginated
        narrowed
        backend-pagination
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :page-input="true"
        :mobile-cards="false"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"

        >

        <b-table-column

          v-slot="props"
          field="name"
          label="Name"
          sortable
          >
          <div style="display: flex; flexDirection: row;">

            <div style="width:50px; height: 20px; ">
              <b-image :src="props.row.image_cropped" class="is-pulled-left mr-3" responsive  />
            </div>

            <item-inspector-wrapper style="flex: 3" :item="props.row" /><br/>
            <b-tag style="flex: 1" class="rainbow-background has-text-white is-pulled-right" v-if="props.row.foil == 1">foil</b-tag>

          </div>

        </b-table-column>
        <b-table-column v-slot="props" field="expansion" label="Expansion" sortable >
            <set-tag :code="props.row.set_code" :name="props.row.expansion" :url="props.row?.echo_set_url ? props.row.echo_set_url :''"/>
        </b-table-column>

        <b-table-column v-slot="props" width="140" field="date_sold" label="Date Sold" sortable>

          <date-input v-if="props.row.date_sold" :date="props.row.date_sold" :callback="dataRefresh" :earnings_id="props.row.earnings_id" />
        </b-table-column>
        <b-table-column v-slot="props" field="gain" label="Profit/Loss" sortable width="50" >
          <span v-if="props.row.price_change != 0">
            <b-tag type="is-success" v-if="props.row.gain > 0" icon="chevron-up">{{props.row.gain}}%</b-tag>
            <b-tag type="is-danger" v-if="props.row.gain < 0" icon="chevron-down">{{props.row.gain}}%</b-tag>
          </span>
        </b-table-column>
        <b-table-column v-slot="props" field="price" label="Sold" width="110" sortable >
          <sold-price-input v-if="props.row.price" :currency_symbol="user.currency_symbol" :price="parseFloat(props.row.price)"  :earnings_id="props.row.earnings_id" />
        </b-table-column>
        <b-table-column  v-slot="props"  field="price_acquired" label="Acquired"  width="110"  sortable>
          <acquired-price-input
            v-if="props.row.price_acquired"
            :currency_symbol="user.currency_symbol"
            :price="parseFloat(props.row.price_acquired)"
            :earnings_id="props.row.earnings_id" />
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button class="is-small" @click="deleteItem(props.row.earnings_id)" icon-left="delete">

          </b-button>
        </b-table-column>
      </b-table>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import SoldPriceInput from '~/components/earnings/SoldPriceInput.vue'
import AcquiredPriceInput from '~/components/earnings/AcquiredPriceInput.vue'
import DateInput from '~/components/earnings/DateInput.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import FullAd from '~/components/cta/FullAd.vue'
import SetTag from '~/components/magic/SetTag.vue'
import SetSelector from '~/components/magic/SetSelector.vue'

export default {
  name: 'Earnings',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DateInput,
    SoldPriceInput,
    AcquiredPriceInput,
    FullAd,
    SetTag,
    SetSelector
  },
  data () {
    return {
      earnings: [{
        name: 'loading'
      }],
      tableHeight: 400,
      windowHeight: 1000,
      search: '',
      set_code: '',
      defaultSortOrder: 'DESC',
      page: 1,
      total: 0,
      perPage: 50,
      sortField: 'date_sold',
      sortOrder: 'desc',
      loading: false,
      stats: {
        acquired_value: 0,
        sold_value: 0,
        gainLoss: 0

      }
    }
  },
  async fetch(){

      this.loading = true;
      await this.getEarningsStats()
      await this.getEarnings();
      this.loading = false;
  },
  mounted() {

    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  watch: {
    search(){
      this.getEarnings()
    },
    set_code(){
      this.getEarnings()
    }
  },
  methods: {
    setExpansion(set){

      if(set?.set_code){
        this.set_code = set.set_code
      } else {
        this.set_code = ''
      }
    },
    onPageChange(page) {
        this.page = page
        this.getEarnings()
    },
    /*
      * Handle sort event
    */
    onSort(field, order) {
        this.sortField = field
        this.sortOrder = order
        this.getEarnings()
    },

    async dataRefresh(){
     this.$fetch();
    },
    async getEarnings() {

      let start = (this.page - 1) * this.perPage;
      let data = await this.$echomtg.getEarnings(start,this.perPage,this.sortOrder,this.sortField ,this.search, this.set_code);

      this.earnings = data.earnings;


    },
    async getEarningsStats(){
      let data = await this.$echomtg.getEarningsStats();
      this.stats = data.stats;
      this.total = data.stats.total_cards;
    },
    async deleteItem(earnings_id) {

      const data = await this.$echomtg.earningsDeleteItem(earnings_id)
      this.$buefy.snackbar.open({
          message: data.message,
          type: 'is-warning',
          queue: true,
          position: 'is-top',
      })

      await this.dataRefresh()

    },

    async updateItem(watchlist_id,threshold) {
      if(threshold < 99 && threshold > -99){
        const data = await this.$echomtg.updateWatchlist(watchlist_id,threshold)
        this.$buefy.snackbar.open({
              message: data.message,
              type: 'is-success',
              queue: true,
              position: 'is-top',
          })

        this.getWatchlist()
      }

    },
    downloadCSV() {
      window.open(`${this.$config.API_DOMAIN}earnings/export/?auth=${this.$cookies.get('token')}`, '_blank')
    },
    updateTableHeight() {
      let height = 400;
      if(this.$refs.table){
        let rects = this.$refs.table.$el.getBoundingClientRect();
        height = this.windowHeight - rects.top - 98    // 98 is the table header and table search bar
      }
      this.tableHeight = height
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.updateTableHeight()
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {
    cs() {
      return this.user.currency_symbol
    },
    crumbs() {
      return [
        {
          label: 'Apps',
          url: '/apps/',
          icon: ''
        },
        {
          label: 'Earnings',
          url: '/apps/watchlist/',
          icon: 'cash-multiple'
        }
      ]
    },
    ...mapState(['user','authenticated'])
  },
  head () {
      return {
          title: `Earnings: Track items sold or traded`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Track items sold or traded`
            }
          ]
      }
    }
}
</script>
