<template>
  <div>
    <nuxt keep-alive />
    <echo-bread-crumbs :data="crumbs" />
    <full-ad
      title="Login Required to Search Trade Lists"
      v-if="!authenticated && (public_trade_list.length == 0)"
      image="https://assets.echomtg.com/images/product/trades-app-2023.png"
      />
    <b-field v-if="authenticated" class="m-3">
      <b-input placeholder="Search Users Open for Trade..."
          type="search"
          v-model="search"
          icon="magnify"
          >
      </b-input>
    </b-field>
    <b-table
      v-if="public_trade_list.length !== 0"
      :height="tableHeight"
      :debounce-search="0"

      :data="public_trade_list"
      :loading="loading"

      :paginated="authenticated ? true : false"
      backend-pagination
      :total="meta?.total ? meta.total : 0"
      :per-page="meta?.limit ? meta.limit : 0"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"

      narrowed

      ref="table"

      striped
      :sticky-header="true"
      >

      <b-table-column field="username" label="User Name" v-slot="props">
        <a :href="`/apps/trades/${props.row.user_hash}/`" :title="`Open ${props.row.username} Trade Page`">
          {{props.row.username}}
        </a>
      </b-table-column>

      <b-table-column field="total_trades" label="Total Items for Trade" numeric v-slot="props">
          {{props.row.total_trades}}
      </b-table-column>

    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FullAd from '~/components/cta/FullAd.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import CreateAccountModal from '~/components/user/CreateAccountModal.vue'

export default {
  name: 'Trades',
  components: {
    EchoBreadCrumbs,
    CreateAccountModal,
    FullAd
  },
  ssr: true,
  data () {
    return {
      public_trade_list: [],
      meta: {
        total: 0,
        limit: 100
      },
      loading: false,
      tableHeight: 600,
      search: '',
      start: 0
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
          icon: 'swap-horizontal-bold'

        }
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
  },
  watch: {
    search(){
      this.loadAsyncData()
    }
  },
  async asyncData({$echomtg, $cookies}) {
    let public_trade_list = []
    let meta = {}
    let json = null

    try {

      json = await $echomtg.tradesPublicListBackend()

      public_trade_list = json.items ? json.items : []
      meta = json.meta

    } catch (error) {
      console.log('error fetching list SSR', error)
    }

    return { public_trade_list, meta }

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
      onPageChange(page) {
        this.page = page
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
        let json = await this.$echomtg.tradesPublicList(this.start,this.meta.limit,this.search)
        this.public_trade_list = json.items;
        this.meta = json.meta
      },

  },
  head () {
      return {
          title: `Magic: The Gathering  - Trades`,
          description: `Search user tradelists for magic the gathering and flesh and blood games.`
      }
    }
}
</script>
