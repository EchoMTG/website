<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-dark is-hidden-mobile">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">
                  Watchlist
              </h1>
              <h3 class="subtitle">
                  Watch when you items increase or decrease in price.
              </h3>
          </div>
      </div>
    </section>

    <b-table
      :striped="true"
      default-sort="price_change"
      default-sort-direction="DESC"
      :data="watchlist"
      ref="table"
      :height="tableHeight"
      :debounce-search="0"
      :sticky-header="true"
      :sticky="true"
      :row-class="(row, index) => row.id >= 0 && 'is-relative'"
       >
      <b-table-column

        v-slot="props"
        field="name"
        label="Name"
        row-class=""
        sortable
        searchable>
        <b-tag class="has-background-warning-dark has-text-white is-pulled-right" v-if="props.row.foil == 1">foil</b-tag>
        <b-image :src="props.row.image_cropped" class="is-pulled-left mr-3" :lazy="true"  />
        <item-inspector-wrapper :item="props.row" />

      </b-table-column>
      <b-table-column v-slot="props" field="expansion" label="Expansion" sortable searchable>
        {{props.row.expansion}}
      </b-table-column>
      <b-table-column v-slot="props" field="price" label="Price" sortable :numeric="true">
        <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
        {{cs}}{{props.row.foil_price}}
        </span>
        <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
        {{cs}}{{props.row.tcg_market}}
        </span>

      </b-table-column>
      <b-table-column v-slot="props" field="price_change" label="Change" sortable :numeric="true" searchable>
        <span v-if="props.row.price_change != 0">
          <strong class="has-text-success" v-if="props.row.price_change > 0"><b-icon icon="chevron-up"></b-icon> {{props.row.price_change}}%</strong>
          <strong class="has-text-danger" v-if="props.row.price_change < 0"><b-icon icon="chevron-down"></b-icon> {{props.row.price_change}}%</strong>

        </span>
      </b-table-column>

      <b-table-column  v-slot="props" field="threshold" label="Threshold" :numeric="true" sortable>

        <threshold-input :threshold="props.row.threshold" :callback="updateItem" :watchlist_id="props.row.watchlist_id" />

      </b-table-column>
      <b-table-column v-slot="props">
        <b-button class="is-small" @click="deleteItem(props.row.watchlist_id)" icon-left="delete">

        </b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ThresholdInput from '~/components/watchlist/ThresholdInput.vue'
export default {
  name: 'Watchlist',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    ThresholdInput
  },
  data () {
    return {
      watchlist: [{
        name: 'loading'
      }],
      cs: '$',
      tableHeight: 400,
      windowHeight: 1000
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)

  },
  mounted() {
    this.getWatchlist()
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
    async getWatchlist() {
      let data = await this.$echomtg.getWatchlist()
      this.watchlist = data.items;
    },
    async deleteItem(watchlist_id) {

      const data = await this.$echomtg.deleteFromWatchlist(watchlist_id)
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

    updateTableHeight() {
      let height = 400;
      if(this.$refs.table){
        console.log(window.innerHeight)
        let rects = this.$refs.table.$el.getBoundingClientRect();
        console.log(this.$refs.table.$el)
        height = this.windowHeight - rects.top - 98

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
    ...mapState([
      'userName'
    ]),

    crumbs() {
      return [
        {
          label: 'Tools',
          url: '/tools/',
          icon: ''
        },
        {
          label: 'Watchlist',
          url: '/tools/watchlist/',
          icon: ''
        }
      ]
    }
  },
  head () {
      return {
          title: `Watchlist: Track Magic the gathering item prices`,
          description: `Hand select specific item in the magic the gathering to track their pricing movement`
      }
    }
}
</script>
