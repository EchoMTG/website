<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column  is-two-thirds">
            <h1 class="title has-text-white">
                Inventory
            </h1>
            <h3 class="subtitle has-text-light">
                Manage your collection
            </h3>
          </div>
          <div class="column is-one-third">
            <div class="is-flex is-flex-direction-row-reverse">

              <export-dropdown class="is-align-items-end" />
              <b-button size="is-small" class="mr-2" href="/tools/inventory/import/" type="is-primary" icon-left="download">Import</b-button>
            </div>
          </div>
        </div>

      </div>
      <nav class="level p-2">
       <b-input placeholder="Search by Card or Item Name..."
            type="search"
            v-model="search"
            icon="magnify"
            class="level-item"
            rounded
            size="is-small"
            >
        </b-input>
        <set-selector class="level-item"  :callback="setExpansion" />
        <b-select class="level-item" rounded placeholder="Show Tradable" size="is-small" v-model="tradable">
            <option selected disabled value="">Trades</option>
            <option disabled>---</option>
            <option value="false">Show All</option>
            <option value="true">Only Tradable</option>
        </b-select>
        <b-select class="level-item" rounded placeholder="Rarity" size="is-small" v-model="rarity">
            <option selected="selected" value="" disabled="disabled">By Rarity</option>
            <option value="false">All</option>
            <option value="sealed">Sealed</option>
            <option disabled="disabled">----</option>
            <option value="Mythic Rare">Mythic</option>
            <option value="Rare">Rare</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Common">Common</option>
            <option value="Basic Land">Basic Land</option>
            <option value="Special">Special</option>
            <option value="Token">Token</option>
        </b-select>
      </nav>

    </section>

    <b-table
      :data="data"
      :loading="loading"
      :height="tableHeight"
      :debounce-search="0"
      :sticky-header="true"
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
      striped
      hoverable
      detailed
      custom-detail-row
      @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
      :show-detail-icon="true"
      ref="table"
      detail-key="inventory_id"
      >

        <b-table-column field="name" label="Name" sortable v-slot="props">

            <i class="has-text-warning-dark is-pulled-left mr-2 ss  ss-htr ss-3x rainbow-text" style="font-size: 24px; font-weight: bold" v-if="props.row.foil == 1">

            </i>
            <item-inspector-wrapper :item="props.row" />
        </b-table-column>
        <b-table-column field="set" label="Expansion" sortable v-slot="props">
            <b-taglist attached>
              <b-tag type="is-dark">
                <a class="has-text-white" :href="props.row.echo_set_url.replace('https://www.echomtg.com','')">
                  <i style="margin-top:-11px; margin-right: 2px" :class="getSetIcon(props.row.set_code)"></i>
                  <span class="ellipsis mt-1" style="max-width: 120px; display: inline-block">{{ props.row.set }}</span>
                </a>
              </b-tag>
              <b-tag><i style="margin-top:-3px" :class="getSetIcon('mtg')"></i></b-tag>
          </b-taglist>
        </b-table-column>

        <b-table-column field="tcg_market" label="Today" numeric sortable v-slot="props">
          <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
          {{cs}}{{props.row.foil_price}}
          </span>
          <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
          {{cs}}{{props.row.tcg_market}}
          </span>
        </b-table-column>
        <b-table-column field="price_change" label="7-Day" numeric sortable v-slot="props">
          <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)">
            {{ props.row.price_change }} %
          </span>
        </b-table-column>
        <b-table-column field="personal_gain" label="Gain/Loss" numeric sortable centered v-slot="props">
          <span v-if="props.row.personal_gain" class="tag" :class="type(props.row.personal_gain)">
            {{ props.row.personal_gain }}%
          </span>
        </b-table-column>
        <b-table-column field="price_acquired" :label="`${cs} Purchased`" numeric sortable centered v-slot="props">
            <price-acquired-input :currency_symbol="cs" :inventory_id="props.row.inventory_id" :price_acquired="props.row.price_acquired" :callback="loadAsyncData" />
        </b-table-column>
        <b-table-column field="date_acquired" label="Purchase Date" date sortable centered v-slot="props">
            <date-acquired-input :date="props.row.date_acquired" :callback="loadAsyncData" :inventory_id="props.row.inventory_id" />
        </b-table-column>

        <b-table-column v-slot="props">
          <toggle-foil-button v-if="props.row.foil_price > 0" :inventory_id="props.row.inventory_id" :foil="props.row.foil" :callback="loadAsyncData"></toggle-foil-button>
          <toggle-tradable-button :inventory_id="props.row.inventory_id" :tradable="props.row.tradable" :callback="loadAsyncData" />
          <duplicate-button :copy="props.row" :callback="loadAsyncData" />
          <delete-inventory-button :inventory_id="props.row.inventory_id" :callback="loadAsyncData" />
        </b-table-column>

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
                      ></b-image>
                  </div>
                  <div class="column is-two-fifths">
                    <quick-graph
                      :emid="props.row.emid"
                      :acquired_price="props.row.price_acquired"
                      :acquired_date="props.row.date_acquired"
                      :foil="props.row.foil"
                      />
                  </div>
                  <div class="column is-two-fifths">
                    <item-list-box :item="props.row" />
                  </div>
                </div>
              </section>
            </td>
          </tr>
        </template>

      </b-table>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import DeleteInventoryButton from '~/components/inventory/DeleteInventoryButton.vue'
import ItemInspectorWrapper from '~/components/items/ItemInspectorWrapper.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import SetSelector from '~/components/magic/SetSelector.vue'
import ToggleTradableButton from '~/components/inventory/ToggleTradableButton.vue'
import PriceAcquiredInput from '~/components/inventory/PriceAcquiredInput.vue'
import DateAcquiredInput from '~/components/inventory/DateAcquiredInput.vue'
import QuickGraph from '~/components/inventory/QuickGraph.vue'
import ItemListBox from '~/components/items/ItemListBox.vue'
import ExportDropdown from '~/components/inventory/ExportDropdown.vue'
import DuplicateButton from '~/components/inventory/DuplicateButton.vue'
import ToggleFoilButton from '~/components/inventory/ToggleFoilButton.vue'

export default {
  name: 'Inventory',

  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DeleteInventoryButton,
    PriceAcquiredInput,
    SetSelector,
    ToggleTradableButton,
    QuickGraph,
    ItemListBox,
    DateAcquiredInput,
    ExportDropdown,
    DuplicateButton,
    ToggleFoilButton
  },
  data() {
      return {
          data: [],
          total: 0,
          loading: false,
          search: '',
          rarity: '',
          tradable: '',
          color: '',
          sortField: 'date_acquired',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 100,
           cs: '$',
          tableHeight: 400,
          windowHeight: 1000,
          debounce: null,
          set_code: ''
      }
  },
  watch: {
    search() {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.loadAsyncData();
      }, 600)
    },
    set_code(){
      this.loadAsyncData();
    },
    tradable() {
      this.loadAsyncData();
    },
    rarity() {
      this.loadAsyncData();
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
    getSetIcon(set_code){
      return this.$echomtg.setIconClass(set_code)
    },
    /*
    * Load async data
    */

    async loadAsyncData() {

        this.loading = true
        try {
          let start = (this.page - 1) * this.perPage;
          const data = await this.$echomtg.inventoryView(
            start,
            this.perPage,
            this.sortOrder,
            this.sortField,
            this.search,
            this.set_code,
            this.color,
            this.rarity,
            this.tradable
            )

          this.data = []
          let currentTotal = data.meta.total_pages * data.meta.items_per_page

          this.total = currentTotal

          data.items.forEach((item) => {
              //item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
              this.data.push(item)
          })

          this.loading = false

        } catch (error){

            this.data = []
            this.total = 0
            this.loading = false
        }
    },
    /*
      * Handle page-change event
    */
    onPageChange(page) {
        this.page = page
        this.loadAsyncData()
    },
    /*
      * Handle sort event
    */
    onSort(field, order) {
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
    },
    /*
    * Type style in relation to the value
    */
    type(number) {
      if (number < -5) {
            return 'tag has-text-white has-background-danger'
        } else if (number > 5) {
            return 'tag  has-text-white has-background-success'
        } else if (number < 0) {
            return 'tag has-background-danger-light'
        } else if (number > 0) {
            return 'tag has-background-success-light'
        } else {
          return 'tag'
        }
    },

    updateTableHeight() {
      let height = 400;
      if(this.$refs.table){
        let rects = this.$refs.table.$el.getBoundingClientRect();
        height = (this.windowHeight - rects.top) - 80 // 120 is the table header and pagination bar
      }
      this.tableHeight = height
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.updateTableHeight()
    }
  },
  mounted() {
    this.onResize();
  },
  filters: {
    /**
    * Filter to truncate string, accepts a length parameter
    */
    truncate(value, length) {
        return value.length > length
            ? value.substr(0, length) + '...'
            : value
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mounted() {
    this.loadAsyncData()
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
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
          label: 'Inventory',
          url: '/tools/inventory/',
          icon: ''
        }
      ]
    }
  },
  head () {
      return {
          title: `Inventory: Trading Card Collection tools`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Manage your Trading card collection with the best organization tools on the internet.`
            }
          ]
      }
    }
}
</script>
