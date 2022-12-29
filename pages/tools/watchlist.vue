<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-0">
      <div class="columns">
        <div class="column  is-two-thirds">
          <h1 class="title has-text-white">
              Watchlist
          </h1>
          <h3 class="subtitle has-text-light">
              Track items prices as they increase or decrease over 1 to 7 day periods. Weekly email with updates sent on Tuesdays. SMS Text updates availables for Mythic+ users.
          </h3>
        </div>
        <div class="column is-one-third">
          <h3 class="title is-size-6">Notifications</h3>
          <p>You must have a mythic account and a verified phone number to get daily notifications</p>
          <h4 class="title is-size-6">Verify your mobile number</h4>
          <p></p>
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
      :row-class="(row, index) => (row.price_change >= row.threshold) && 'has-background-success-light'"
       >
      <b-table-column

        v-slot="props"
        field="name"
        label="Name"
        sortable
        searchable>
        <div style="display: flex; flexDirection: row;">

          <div style="width:70px; height: 30px; ">
            <b-image :src="props.row.image_cropped" class="is-pulled-left mr-3" responsive="true"  />
          </div>

          <item-inspector-wrapper style="flex: 3" :item="props.row" /><br/>
          <b-tag style="flex: 1" class="has-background-warning-dark has-text-white is-pulled-right" v-if="props.row.foil == 1">foil</b-tag>

        </div>

      </b-table-column>
      <b-table-column v-slot="props" field="expansion" label="Expansion" sortable searchable>
        {{props.row.expansion}}
      </b-table-column>
      <b-table-column v-slot="props" field="price" label="Price" width="100" sortable :numeric="true">
        <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
        {{cs}}{{props.row.foil_price}}
        </span>
        <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
        {{cs}}{{props.row.tcg_market}}
        </span>

      </b-table-column>
      <b-table-column v-slot="props" field="price_change" label="Change" sortable width="40" :numeric="true">
        <span v-if="props.row.price_change != 0">
          <strong class="has-text-success" v-if="props.row.price_change > 0"><b-icon icon="chevron-up"></b-icon> {{props.row.price_change}}%</strong>
          <strong class="has-text-danger" v-if="props.row.price_change < 0"><b-icon icon="chevron-down"></b-icon> {{props.row.price_change}}%</strong>

        </span>
      </b-table-column>

      <b-table-column  v-slot="props"  field="threshold" label="Threshold"  width="100" :numeric="true" sortable>
        <span v-if="undefined !== props.row.threshold">
          <threshold-input :threshold="props.row.threshold" :callback="updateItem" :watchlist_id="props.row.watchlist_id" />
        </span>

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
        let rects = this.$refs.table.$el.getBoundingClientRect();
        height = this.windowHeight - rects.top - 98 // 98 is the table header and table search bar
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
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Hand select specific item in the magic the gathering to track their pricing movement`
            }
          ]
      }
    }
}
</script>
