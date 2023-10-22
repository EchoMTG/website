<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad
      title="You Must be Logged in to Use the Watchlist App"
      image="https://assets.echomtg.com/images/product/card-page-2023.png"
      v-if="!authenticated" />
    <span v-if="authenticated">

      <section class="hero is-small has-background-black is-hidden-mobile pl-4 pt-4 pr-4 pb-4">
        <div class="columns">
          <div class="column  is-two-thirds">
            <h1 class="title has-text-white">
                Watchlist
            </h1>
            <h3 class="subtitle has-text-light is-size-6">
                Track items prices as they increase or decrease over 1 to 7 day periods. Weekly email with updates sent on Tuesdays. SMS Text updates availables for Mythic+ users.
            </h3>
          </div>
          <div class="column is-one-third">
            <feature-gate classes="mt-4 is-inline-block" size="is-large" :showAd="true" adText="Upgrade to Mythic for SMS Updates" :gate-level="3" >

              <h3 class="title is-size-6">Notifications</h3>
              <p>You must have a mythic account and a verified phone number to get daily notifications</p>
              <nuxt-link to="/user/settings/">Verify your mobile number</nuxt-link>
            </feature-gate>
          </div>
        </div>
         <nav class="level is-mobile p-0">
          <div class="level-left">
            <b-input
                placeholder="Search Watchlist..."
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
              <b-tag class="">Total Tracked</b-tag>
              <b-tag type="is-dark">{{watchlist.length}} </b-tag>
            </b-taglist>
             <div class="level-item" >
             </div>
          </div>
       </nav>
      </section>
      <b-table
        :striped="true"
        default-sort="price_change"
        default-sort-direction="DESC"
        :data="watchlist"
        ref="table"
        paginated
        :height="tableHeight"
        :debounce-search="0"
        :sticky-header="true"
        :sticky="true"
        :mobile-cards="false"
        :row-class="(row, index) => (row.price_change >= row.threshold) && 'has-background-black'"
        >
        <b-table-column

          v-slot="props"
          field="name"
          label="Name"
          sortable
          >
          <div style="display: flex; flexDirection: row;">

            <div style="width:72px; height: 40px; " class="mr-2">
              <NuxtImg :src="props.row.image_cropped" width="72" class="is-pulled-left mr-3" :responsive="true"  />
            </div>
            <div>
              <item-inspector-wrapper  :item="props.row" />
              <span v-html="getManaSymbols(props.row.mc)"></span> {{props.row.rarity}}
            </div>
            <div style="flex: 1" class="is-flex">


              <b-tag class="rainbow-background has-text-white is-pulled-right" v-if="props.row.foil == 1">foil</b-tag>
            </div>

          </div>

        </b-table-column>


        <b-table-column v-slot="props" field="expansion" label="Expansion" sortable >

          <set-tag :code="props.row.set_code || ''" :name="props.row.expansion" :url="props.row?.echo_set_url ? props.row.echo_set_url :''" />
        </b-table-column>
        <b-table-column v-slot="props" field="price_change" label="Change" sortable width="100" :numeric="true">
          <span v-if="props.row.price_change != 0">
            <strong class="has-text-success" v-if="props.row.price_change > 0"><b-icon size="is-small" icon="triangle"></b-icon> {{props.row.price_change}}%</strong>
            <strong class="has-text-danger" v-if="props.row.price_change < 0"><b-icon size="is-small" icon="triangle-down"></b-icon> {{props.row.price_change}}%</strong>
          </span>
        </b-table-column>
        <b-table-column v-slot="props" field="tcg_mid" label="Mid" width="100" sortable :numeric="true">
          <span v-if="props.row.tcg_mid > 0">
          {{cs}}{{props.row.tcg_mid.toFixed(2)}}
          </span>
        </b-table-column>
        <b-table-column v-slot="props" field="tcg_low" label="Low" width="100" sortable :numeric="true">
          <span v-if="props.row.tcg_low > 0">
          {{cs}}{{props.row.tcg_low.toFixed(2)}}
          </span>
        </b-table-column>
        <b-table-column v-slot="props" field="foil_price" label="Foil" width="100" sortable :numeric="true">
          <span class="has-text-warning-dark" v-if="props.row.foil_price > 1">
          {{cs}}{{props.row.foil_price.toFixed(2)}}
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

      <feature-locked-full title="Upgrade Account to Access More" :authed="authenticated" :levelRequired="2" />
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ThresholdInput from '~/components/watchlist/ThresholdInput.vue'
import FullAd from '~/components/cta/FullAd.vue'
import FeatureGate from '~/components/user/FeatureGate.vue'
import FeatureLockedFull from '~/components/cta/FeatureLockedFull.vue'
import SetSelector from '~/components/magic/SetSelector.vue'
import SetTag from '~/components/magic/SetTag.vue'

export default {
  name: 'Watchlist',
  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    ThresholdInput,
    FullAd,
    FeatureGate,
    FeatureLockedFull,
    SetSelector,
    SetTag
  },
  data () {
    return {
      watchlist: [{
        name: 'loading'
      }],
      search: '',
      set_code: '',
      tableHeight: 400,
      windowHeight: 1000,
      start: 0,
      limit: 3
    }
  },
  async fetch(){
    this.limit = this.user.planObject.access_level >= 2 ? 100 : 3
    await this.getWatchlist();
  },
  watch: {
    user() {
      // common users stuck at 3
      this.limit = this.user.planObject.access_level >= 2 ? 100 : 3
      this.getWatchlist();
    },
    search(){
      this.getWatchlist()
    },
    set_code(){
      this.getWatchlist()
    },

  },
  mounted() {
    this.updateTableHeight()


    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
    getManaSymbols(str){
      return str ? this.$echomtg.replaceSymbols(str) : ''

    },
    setExpansion(set){
      if(set?.set_code){
        this.set_code = set.set_code
      } else {
        this.set_code = ''
      }
    },
    async getWatchlist() {
      if(!this.authenticated) return;
      let data = await this.$echomtg.getWatchlist(this.start, this.limit, this.search, this.set_code)
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
          label: 'Watchlist',
          url: '/apps/watchlist/',
          icon: ''
        }
      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])
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
