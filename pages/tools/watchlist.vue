<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-dark">
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
      :debounce-search="20"
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

      <b-table-column v-slot="props" field="threshold" label="Threshold" :numeric="true" sortable>
        {{props.row.threshold}}
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
export default {
  name: 'Watchlist',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper
  },
  data () {
    return {
      watchlist: [{
        name: 'loading'
      }],
      cs: '$'
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)

  },
  mounted() {
    this.getWatchlist()
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

    }
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
