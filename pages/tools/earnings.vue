<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-0">
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
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :page-input="true"
      backend-sorting
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      @sort="onSort"
      hoverable

       >

      <b-table-column

        v-slot="props"
        field="name"
        label="Name"
        sortable
        searchable>
        <div style="display: flex; flexDirection: row;">

          <div style="width:50px; height: 20px; ">
            <b-image :src="props.row.image_cropped" class="is-pulled-left mr-3" responsive  />
          </div>

          <item-inspector-wrapper style="flex: 3" :item="props.row" /><br/>
          <b-tag style="flex: 1" class="has-background-warning-dark has-text-white is-pulled-right" v-if="props.row.foil == 1">foil</b-tag>

        </div>

      </b-table-column>
      <b-table-column v-slot="props" field="expansion" label="Expansion" sortable searchable>
        {{props.row.expansion}}
      </b-table-column>

      <b-table-column v-slot="props" width="140" field="date_sold" label="Date Sold" sortable>
        <date-input v-if="props.row.date_sold" :date="props.row.date_sold" :callback="dataRefresh" :earnings_id="props.row.earnings_id" />
      </b-table-column>
      <b-table-column v-slot="props" field="gain" label="Profit/Loss" sortable width="50" :numeric="true">
        <span v-if="props.row.price_change != 0">
          <b-tag type="is-success" v-if="props.row.gain > 0" icon="chevron-up">{{props.row.gain}}%</b-tag>
          <b-tag type="is-danger" v-if="props.row.gain < 0" icon="chevron-down">{{props.row.gain}}%</b-tag>
        </span>
      </b-table-column>
      <b-table-column v-slot="props" field="price" label="Sold For" width="110" sortable :numeric="true">
        <sold-price-input v-if="props.row.price" :price="parseFloat(props.row.price)" :callback="dataRefresh" :earnings_id="props.row.earnings_id" />
      </b-table-column>
      <b-table-column  v-slot="props"  field="price_acquired" label="Acquired For"  width="110" :numeric="true" sortable>
        <acquired-price-input v-if="props.row.price_acquired" :price="parseFloat(props.row.price_acquired)" :callback="dataRefresh" :earnings_id="props.row.earnings_id" />
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button class="is-small" @click="deleteItem(props.row.earnings_id)" icon-left="delete">

        </b-button>
      </b-table-column>
    </b-table>
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

export default {
  name: 'Earnings',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DateInput,
    SoldPriceInput,
    AcquiredPriceInput
  },
  data () {
    return {
      earnings: [{
        name: 'loading'
      }],
      cs: '$',
      tableHeight: 400,
      windowHeight: 1000,
      search: '',
      defaultSortOrder: 'DESC',
      page: 1,
      total: 0,
      perPage: 50,
      sortField: 'date_sold',
      sortOrder: 'DESC',
      loading: false,
      stats: {
        acquired_value: 0,
        sold_value: 0,
        gainLoss: 0

      }
    }
  },
  mounted() {


    this.dataRefresh();

    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
     /*
      * Handle page-change event
    */
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
      this.loading = true;
      await this.getEarningsStats()
      await this.getEarnings();
      this.loading = false;
    },
    async getEarnings() {

      let start = (this.page - 1) * this.perPage;
      let data = await this.$echomtg.getEarnings(start,this.perPage,this.sortOrder,this.sortField ,this.search);
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
        height = this.windowHeight - rects.top - 140   // 98 is the table header and table search bar
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

    crumbs() {
      return [
        {
          label: 'Tools',
          url: '/tools/',
          icon: ''
        },
        {
          label: 'Earnings',
          url: '/tools/watchlist/',
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
