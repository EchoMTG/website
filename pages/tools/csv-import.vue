<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-0">
      <div class="columns">
        <div class="column  is-two-thirds">
          <h1 class="title has-text-white">
              CSV Import
          </h1>
          <h3 class="subtitle has-text-light">
              {{this.total}} items acquired for {{cs}}{{this.stats.acquired_value.toFixed(2)}} sold at {{cs}}{{this.stats.sold_value.toFixed(2)}}. A {{this.stats.gainLoss}}% gain.
          </h3>
        </div>
        <div class="column is-one-third">
          <b-button class="is-pulled-right" @click="downloadCSV()" icon-left="download">Download Earnings CSV</b-button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ThresholdInput from '~/components/watchlist/ThresholdInput.vue'
export default {
  name: 'Earnings',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    ThresholdInput
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
    }
  },
  mounted() {
    this.getEarningsStats()
    this.getEarnings()
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
    async getEarnings() {

      let start = (this.page - 1) * this.perPage;

      this.loading = true;
      let data = await this.$echomtg.getEarnings(start,this.perPage,this.sortOrder,this.sortField ,this.search);

      this.earnings = data.earnings;
      this.loading = false;

    },
    async getEarningsStats(){
      let data = await this.$echomtg.getEarningsStats();
      this.stats = data.stats;
      this.total = data.stats.total_cards;
    },
    async deleteItem(earnings_id) {

      const data = await this.$echomtg.deleteFromEarnings(earnings_id)
      this.$buefy.snackbar.open({
          message: data.message,
          type: 'is-warning',
          queue: true,
          position: 'is-top',
      })

      this.getWatchlist()

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
    }
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
