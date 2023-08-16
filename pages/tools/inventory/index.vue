<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column  is-two-thirds">
            <h1 class="title has-text-white" style="text-transform: capitalize">
                {{user.username}}'s Collection Inventory
            </h1>
          </div>
          <div class="column is-one-third">
            <div class="is-flex is-flex-direction-row-reverse">

              <export-dropdown class="is-align-items-end"  />
              <b-button size="is-small" class="mr-2" href="/tools/inventory/import/" type="is-primary" icon-left="download">Import</b-button>
            </div>
          </div>
        </div>

      </div>
      <nav class="level p-2">
        <div class="level-left">
        <b-input
              placeholder="Search Inventory..."
              type="search"
              v-model="search"
              icon="magnify"
              class="level-item"

              size="is-small"
              />
          <set-selector class="level-item is-hidden-mobile"  :callback="setExpansion" />
          <b-select class="level-item"  placeholder="Show Tradable" size="is-small" v-model="tradable">
              <option selected disabled value="">Trades</option>
              <option disabled>---</option>
              <option value="false">Show All</option>
              <option value="true">Only Tradable</option>
          </b-select>

          <b-select class="level-item"  placeholder="Color" size="is-small" v-model="color">
            <option selected="selected" value="">By Color</option>
            <option disabled="disabled">----</option>
            <option data-color="All" value="">All</option><option data-color="Land" value="land">Land</option><option data-color="Colorless" value="colorless">Colorless</option><option data-color="Blue" value="blue">Blue</option><option data-color="Black" value="black">Black</option><option data-color="White" value="white">White</option><option data-color="Red" value="red">Red</option><option data-color="Green" value="green">Green</option><option data-color="Multicolor" value="multicolor">Multicolor</option>
          </b-select>
          <b-select class="level-item"  placeholder="Rarity" size="is-small" v-model="rarity">
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

          <b-select class="level-item is-hidden-mobile"  placeholder="CMC" size="is-small" v-model="cmc">
            <option selected="selected" value="">By CMC</option>
            <option disabled="disabled">----</option>
            <option value="">Any</option>
            <option value="=0"> = 0</option><option value="<=0"> &lt;= 0</option><option value="=1"> = 1</option><option value="<=1"> &lt;= 1</option><option value="=2"> = 2</option><option value="<=2"> &lt;= 2</option><option value="=3"> = 3</option><option value="<=3"> &lt;= 3</option><option value="=4"> = 4</option><option value="<=4"> &lt;= 4</option><option value="=5"> = 5</option><option value="<=5"> &lt;= 5</option><option value="=6"> = 6</option><option value="<=6"> &lt;= 6</option><option value="=7"> = 7</option><option value="<=7"> &lt;= 7</option><option value="=8"> = 8</option><option value="<=8"> &lt;= 8</option><option value="=9"> = 9</option><option value="<=9"> &lt;= 9</option><option value="=10"> = 10</option><option value="<=10"> &lt;= 10</option><option value="=11"> = 11</option><option value="<=11"> &lt;= 11</option><option value="=12"> = 12</option><option value="<=12"> &lt;= 12</option><option value="=13"> = 13</option><option value="<=13"> &lt;= 13</option><option value="=14"> = 14</option><option value="<=14"> &lt;= 14</option><option value="=15"> = 15</option><option value="<=15"> &lt;= 15</option>
          </b-select>
          <b-select class="level-item is-hidden-mobile"  placeholder="Reserve List" size="is-small" v-model="reserve_list">
              <option selected disabled value="">Reserve List</option>
              <option disabled>---</option>
              <option value="false">Show All</option>
              <option value="true">Only Reserve</option>
          </b-select>


            <b-field class="level-item" style="margin-bottom: 0 !important;">
              <p class="control">
                  <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                    <strong>{{cs}} &gt;</strong>
                  </b-button>
              </p>
              <b-input
                v-model="priceOver"
                size="is-small"
                style="max-width: 50px;"
                placeholder="2.10"
                 />
            </b-field>

            <b-field class="level-item">
              <p class="control">
                  <b-button aria-disabled="true" type="is-dark" class="has-background-dark has-text-white" disabled size="is-small">
                    <strong>{{cs}} &lt;</strong>
                  </b-button>
              </p>
              <b-input
                style="max-width: 50px;"
                v-model="priceUnder"
                size="is-small"
                placeholder="9.20"
                 />
            </b-field>


        </div>
      </nav>

    </section>
    <section>
      <bulk-edit-modal :currency_symbol="cs" :removeChecked="clearChecked" :active="showBulkActionModal" :toggleBulkModal="toggleBulkModal" :selecteditems="checkedRows" :actiontype="bulkActionType" :callback="loadAsyncData" />
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
      :mobile-cards="false"
      hoverable
      detailed
      custom-detail-row
      @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
      :show-detail-icon="$device.isDesktop ? true : false"
      ref="table"
      detail-key="inventory_id"
      :checked-rows.sync="checkedRows"
      checkable
      :checkbox-position="`right`"
      :checkbox-type="`is-white`"
      >

        <b-table-column field="name" label="Name" sortable v-slot="props">
            <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
            <!-- <i class="has-text-warning-dark is-pulled-left mr-2 ss  ss-htr ss-3x rainbow-text" style="font-size: 24px; font-weight: bold" v-if="props.row.foil == 1">
            </i> -->
            <item-inspector-wrapper :showsetsymbol="true" :item="props.row" />
        </b-table-column>
        <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="set" label="Expansion" sortable v-slot="props">
          <set-tag :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>

        </b-table-column>

        <!-- Mobile Version Combined Price Data -->
        <b-table-column cell-class="is-hidden-desktop" header-class="is-hidden-desktop"  field="tcg_market" label="Price" sortable v-slot="props">
          <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
          {{cs}}{{props.row.foil_price}}
          </span>
          <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
          {{cs}}{{props.row.tcg_market}}
          </span>
          <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)">
            {{ props.row.price_change }} %
          </span>
        </b-table-column>

        <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="tcg_market" label="Today" numeric sortable v-slot="props">
          <span class="has-text-warning-dark" v-if="props.row.foil == 1 && props.row.foil_price > 0">
          {{cs}}{{props.row.foil_price}}
          </span>
          <span v-if="props.row.foil == 0 && props.row.tcg_market > 0">
          {{cs}}{{props.row.tcg_market}}
          </span>
        </b-table-column>
        <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="price_change" label="7-Day" numeric sortable v-slot="props">
          <span v-if="props.row.price_change !== 0" :class="type(props.row.price_change)">
            {{ props.row.price_change }} %
          </span>
        </b-table-column>
        <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="personal_gain" label="Gain/Loss" numeric sortable centered v-slot="props">
          <span v-if="props.row.personal_gain" class="tag" :class="type(props.row.personal_gain)">
            {{ props.row.personal_gain }}%
          </span>
        </b-table-column>
        <b-table-column field="price_acquired" :label="`Purchase ${cs}`" numeric sortable centered>
           <template v-slot:header="{ column }">
            <div class="is-hidden-touch">
              {{column.label}}
            </div>
            <div class="is-hidden-desktop-only is-hidden-widescreen">
              <span class="is-hidden-mobile">Purchase</span> <b-icon size="is-small" icon="currency-usd"/>
            </div>
          </template>
          <template v-slot="props">
            <price-acquired-input :currency_symbol="cs" :inventory_id="props.row.inventory_id" :price_acquired="props.row.price_acquired" :callback="loadAsyncData" />
          </template>
        </b-table-column>
        <b-table-column field="date_acquired" label="Purchase Date" date sortable centered>
          <template v-slot:header="{ column }">
            <div class="is-hidden-touch">
              {{column.label}}
            </div>
            <div class="is-hidden-desktop-only is-hidden-widescreen">
              <span class="is-hidden-mobile">Purchase</span> <b-icon size="is-small" icon="calendar"/>
            </div>
          </template>
          <template v-slot="props">
            <date-acquired-input :date="props.row.date_acquired" :callback="loadAsyncData" :inventory_id="props.row.inventory_id" />
          </template>
        </b-table-column>

        <b-table-column label="Bulk Action">
          <template v-slot:header="{ column }">
            <b-dropdown v-if="checkedRows.length > 0" :expanded="true" :triggers="['hover']" aria-role="list">
              <template #trigger>
                  <b-button
                      size="is-small"
                      icon-left="lightning-bolt"
                      class="is-pulled-right"
                      type="is-info"
                      :label="`${column.label} (${checkedRows.length})`"
                      icon-right="menu-down" />
              </template>
              <b-dropdown-item @click="toggleBulkModal('addtolist')" aria-role="list-item"><b-icon icon="plus" size="is-small" /> Add to List</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('delete')" aria-role="list-item"><b-icon icon="delete" size="is-small" /> Delete</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changedate')" aria-role="list-item"><b-icon icon="calendar" size="is-small" /> Change Date</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changeprice')" aria-role="list-item"><b-icon icon="currency-usd" size="is-small"/> Acquired Price</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('togglefoil')" aria-role="list-item"><b-icon icon="star-shooting-outline" size="is-small"/> Toggle Foil</b-dropdown-item>
            </b-dropdown>

          </template>
          <template v-slot="props">
            <note-button :inventory_item="props.row" :callback="loadAsyncData"/>
            <move-to-earnings-button :inventory_item="props.row" :currency_symbol="cs" :callback="loadAsyncData"/>
            <toggle-foil-button :disabled="!props.row.foil_price > 0" :inventory_id="props.row.inventory_id" :foil="props.row.foil" :callback="loadAsyncData" />

            <toggle-tradable-button :inventory_id="props.row.inventory_id" :tradable="props.row.tradable" :callback="loadAsyncData" />
            <duplicate-button :copy="props.row" :callback="loadAsyncData" />
            <delete-inventory-button :inventory_id="props.row.inventory_id" :callback="loadAsyncData" />
          </template>
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
                      />
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
import SetTag from '~/components/magic/SetTag.vue'
import MoveToEarningsButton from '~/components/inventory/MoveToEarningsButton.vue'
import NoteButton from '~/components/inventory/NoteButton.vue'
import BulkEditModal from '~/components/inventory/BulkEditModal.vue'

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
    ToggleFoilButton,
    MoveToEarningsButton,
    NoteButton,
    SetTag,
    BulkEditModal
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
          cmc: '',
          reserve_list: '',
          priceOver: null,
          priceUnder: null,
          sortField: 'date_acquired',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 100,
           cs: '$',
          tableHeight: 400,
          windowHeight: 1000,
          debounce: null,
          set_code: '',
          checkedRows: [],
          showBulkActionModal: false,
          bulkActionType: 'Delete'
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
    },
    color() {
      this.loadAsyncData();
    },
    cmc() {
      this.loadAsyncData();
    },
    reserve_list() {
      this.loadAsyncData();
    },
    priceOver() {
      this.loadAsyncData();
    },
    priceUnder() {
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
    clearChecked(){
      this.checkedRows = []
    },
    toggleBulkModal(type='') {
      this.showBulkActionModal = !this.showBulkActionModal
      this.bulkActionType = type !== '' ? type : 'delete'
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
            this.tradable,
            this.reserve_list,
            this.cmc,
            this.priceOver,
            this.priceUnder
            )

          this.data = []
          let currentTotal = data.meta.total_pages * data.meta.items_per_page

          this.total = currentTotal

          data.items.forEach((item) => {
              //item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
              this.data.push(item)
          })
          this.clearChecked()
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
    },
    ...mapState([
      'userName',
      'user',
    ])
  },
  head () {
      return {
          title: this.user ? `${this.user.username}'s EchoMTG Inventory` : `Magic the Gathering Inventory Collection Tools`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Manage your Trading card collection with EchoMTG organization tools.`
            }
          ]
      }
    }
}
</script>
