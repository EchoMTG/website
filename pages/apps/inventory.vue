<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <full-ad title="You Must be Logged in to Use the Inventory App"
      image="https://assets.echomtg.com/images/product/collection-app-2023.png"
    v-if="!authenticated"/>
    <span v-if="authenticated">
      <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
        <div class="hero-body">

          <div class="columns">
            <div class="column  is-three-quarters">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Items Tracked</p>
                    <p class="title has-text-light">{{quickstats.total_items}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">{{getDate()}} Value</p>
                    <p class="title has-text-light">{{cs}}{{quickstats.current_value}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Purchase Cost</p>
                    <p class="title has-text-light">{{cs}}{{quickstats.acquired_value}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">All-time Gain/Loss</p>
                    <p class="title has-text-light"><span :class="quickstats.change_value >= 0 ? `has-text-success-dark` : `has-text-danger-dark`">{{quickstats.change_value}}%</span></p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Profit/Loss</p>
                    <p class="title has-text-light"><span>{{cs}}{{quickstats.total_profit}}</span></p>
                  </div>
                </div>
              </nav>
            </div>
            <div class="column is-one-quarter">
              <div class="is-flex is-flex-direction-row-reverse">

                <export-dropdown class="is-align-items-end"  />
                <b-button size="is-small" class="mr-2" href="/apps/inventory/import/" type="is-primary" icon-left="download">Import</b-button>
              </div>
            </div>
          </div>

        </div>
        <nav class="level p-2">
          <div class="level-left">
            <b-input
                placeholder="Search Inventory..."
                type="is-info"
                v-model="search"
                icon="magnify"
                rounded
                size="is-small"
                class="level-item mr-2"
                />
            <feature-gate :showAd="false" :gate-level="1" classes="level-item is-hidden-mobile">
              <set-selector class="level-item is-hidden-mobile"  :callback="setExpansion" />
            </feature-gate>
            <b-dropdown class="level-item is-hidden-mobile" v-if="checkedRows.length > 0" :expanded="true" :triggers="['hover']" aria-role="list">
              <template #trigger>
                  <b-button
                      size="is-small"
                      icon-left="lightning-bolt"
                      type="is-info"
                      :label="`Bulk Action (${checkedRows.length})`"
                      icon-right="menu-down" />
              </template>
              <b-dropdown-item @click="toggleBulkModal('addtolist')" aria-role="list-item"><b-icon icon="plus" size="is-small" /> Add to List</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('delete')" aria-role="list-item"><b-icon icon="delete" size="is-small" /> Delete</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changedate')" aria-role="list-item"><b-icon icon="calendar" size="is-small" /> Change Date</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('changeprice')" aria-role="list-item"><b-icon icon="currency-usd" size="is-small"/> Acquired Price</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('togglefoil')" aria-role="list-item"><b-icon icon="star-shooting-outline" size="is-small"/> Toggle Foil</b-dropdown-item>
              <b-dropdown-item @click="toggleBulkModal('toggletradable')" aria-role="list-item"><b-icon icon="hand-coin" size="is-small"/> Toggle Tradable</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="level-right">
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

            <b-field class="level-item" style="margin-bottom: 0 !important;">
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
            <b-select class="level-item"  placeholder="Show Tradable" size="is-small" v-model="tradable">
                <option selected disabled value="">Trades</option>
                <option disabled>---</option>
                <option value="false">Show All</option>
                <option value="true">Only Tradable</option>
            </b-select>

            <b-select class="level-item"  placeholder="Color" size="is-small" v-model="color">
              <option selected="selected" value="">By Color</option>
              <option disabled="disabled">----</option>
              <option data-color="All" value="">All</option>
              <option data-color="Land" value="land">Land</option>
              <option data-color="Colorless" value="colorless">Colorless</option>
              <option data-color="Blue" value="blue">Blue</option>
              <option data-color="Black" value="black">Black</option>
              <option data-color="White" value="white">White</option>
              <option data-color="Red" value="red">Red</option>
              <option data-color="Green" value="green">Green</option>
              <option data-color="Multicolor" value="multicolor">Multicolor</option>
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
            <feature-gate :showAd="false" :gate-level="1" classes="level-item is-hidden-mobile">
              <b-select placeholder="Foil" size="is-small" v-model="foil">
                <option selected="selected" value="">By Foil</option>
                <option disabled="disabled">----</option>
                <option data-color="All" value="">All</option>
                <option data-color="Only Foils" value="1">Only Foils</option>
                <option data-color="Non Foils" value="0">Non-foils</option>
              </b-select>
            </feature-gate>
            <feature-gate :showAd="false" :gate-level="1" classes="level-item is-hidden-mobile">
              <b-select placeholder="CMC" size="is-small" v-model="cmc">
                <option selected="selected" value="">By CMC</option>
                <option disabled="disabled">----</option>
                <option value="">Any</option>
                <option value="=0"> = 0</option><option value="<=0"> &lt;= 0</option><option value="=1"> = 1</option><option value="<=1"> &lt;= 1</option><option value="=2"> = 2</option><option value="<=2"> &lt;= 2</option><option value="=3"> = 3</option><option value="<=3"> &lt;= 3</option><option value="=4"> = 4</option><option value="<=4"> &lt;= 4</option><option value="=5"> = 5</option><option value="<=5"> &lt;= 5</option><option value="=6"> = 6</option><option value="<=6"> &lt;= 6</option><option value="=7"> = 7</option><option value="<=7"> &lt;= 7</option><option value="=8"> = 8</option><option value="<=8"> &lt;= 8</option><option value="=9"> = 9</option><option value="<=9"> &lt;= 9</option><option value="=10"> = 10</option><option value="<=10"> &lt;= 10</option><option value="=11"> = 11</option><option value="<=11"> &lt;= 11</option><option value="=12"> = 12</option><option value="<=12"> &lt;= 12</option><option value="=13"> = 13</option><option value="<=13"> &lt;= 13</option><option value="=14"> = 14</option><option value="<=14"> &lt;= 14</option><option value="=15"> = 15</option><option value="<=15"> &lt;= 15</option>
              </b-select>
            </feature-gate>
            <feature-gate adText="Upgrade Plan to Access More Filter" :gateLevel="1" classes="level-item is-hidden-mobile">
              <b-select placeholder="Reserve List" size="is-small" v-model="reserve_list">
                  <option selected disabled value="">Reserve List</option>
                  <option disabled>---</option>
                  <option value="false">Show All</option>
                  <option value="true">Only Reserve</option>
              </b-select>
            </feature-gate>

          </div>
        </nav>

      </section>
      <section>
        <bulk-edit-modal :currency_symbol="cs" :removeChecked="clearChecked" :active="showBulkActionModal" :toggleBulkModal="toggleBulkModal" :selecteditems="checkedRows" :actiontype="bulkActionType" :callback="$fetch" />
      </section>
      <b-table
        :data="data"
        :loading="loading"
        :height="tableHeight"
        :debounce-search="0"
        :sticky-header="true"
        paginated
        backend-pagination
        pagination-size="is-small"
        pagination-order="is-right"
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :page-input="false"
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
        :checkbox-position="`left`"
        >

          <b-table-column field="name" label="Name" sortable v-slot="props">
              <set-tag class="is-hidden-desktop is-pulled-left mr-1" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
              <item-inspector-wrapper :showsetsymbol="true" :item="props.row" />
          </b-table-column>
          <b-table-column cell-class="is-hidden-touch" header-class="is-hidden-touch" field="set" label="Expansion" sortable v-slot="props">
            <div class="is-flex	is-justify-content-space-between		">
              <set-tag classes="is-align-self-flex-start mb-0 mr-2" :code="props.row.set_code" :name="props.row.set" :url="props.row.echo_set_url"/>
              <condition-select classes="is-hidden-touch mr-2" :inventory_id="props.row.inventory_id" :current_condition="props.row.condition"  />
              <language-select classes="is-hidden-touch" :inventory_id="props.row.inventory_id" :current_language="props.row.lang"  />

            </div>
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
              <price-acquired-input :currency_symbol="cs" :inventory_id="props.row.inventory_id" :price_acquired="props.row.price_acquired"  />
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
              <date-acquired-input :date="props.row.date_acquired"  :inventory_id="props.row.inventory_id" />
            </template>
          </b-table-column>

          <b-table-column label="Bulk Action">
            <template v-slot:header="{ column }">
       
            </template>
            <template v-slot="props">
              <note-button :inventory_item="props.row" :callback="$fetch"/>
              <move-to-earnings-button :inventory_item="props.row" :currency_symbol="cs" :callback="$fetch"/>
              <toggle-foil-button :disabled="!props.row.foil_price > 0" :inventory_id="props.row.inventory_id" :foil="props.row.foil" :callback="$fetch" />

              <toggle-tradable-button :inventory_id="props.row.inventory_id" :tradable="props.row.tradable" :callback="$fetch" />
              <duplicate-button :copy="props.row" :callback="$fetch" />
              <delete-inventory-button :inventory_id="props.row.inventory_id" :callback="$fetch" />
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

          <template #bottom-left>
            <b-dropdown v-if="checkedRows.length > 0" position="is-top-right" :expanded="true" :triggers="['hover']" aria-role="list">
                <template #trigger>
                    <b-button
                        size="is-small"
                        icon-left="lightning-bolt"
                        class="is-pulled-right"
                        type="is-info"
                        :label="`Bulk Action (${checkedRows.length})`"
                        icon-right="menu-down" />
                </template>
                <b-dropdown-item @click="toggleBulkModal('addtolist')" aria-role="list-item"><b-icon icon="plus" size="is-small" /> Add to List</b-dropdown-item>
                <b-dropdown-item @click="toggleBulkModal('delete')" aria-role="list-item"><b-icon icon="delete" size="is-small" /> Delete</b-dropdown-item>
                <b-dropdown-item @click="toggleBulkModal('changedate')" aria-role="list-item"><b-icon icon="calendar" size="is-small" /> Change Date</b-dropdown-item>
                <b-dropdown-item @click="toggleBulkModal('changeprice')" aria-role="list-item"><b-icon icon="currency-usd" size="is-small"/> Acquired Price</b-dropdown-item>
                <b-dropdown-item @click="toggleBulkModal('togglefoil')" aria-role="list-item"><b-icon icon="star-shooting-outline" size="is-small"/> Toggle Foil</b-dropdown-item>
                <b-dropdown-item @click="toggleBulkModal('toggletradable')" aria-role="list-item"><b-icon icon="hand-coin" size="is-small"/> Toggle Tradable</b-dropdown-item>
              </b-dropdown>
              <!-- <b>Total checked</b>: {{ checkedRows.length }} -->
          </template>

      </b-table>
    </span>
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
import ConditionSelect from '~/components/inventory/ConditionSelect.vue'
import LanguageSelect from '~/components/inventory/LanguageSelect.vue'
import FullAd from '~/components/cta/FullAd.vue'
import FeatureGate from '~/components/user/FeatureGate.vue'

export default {
  fetchOnServer: true,
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
    BulkEditModal,
    ConditionSelect,
    LanguageSelect,
    FullAd,
    FeatureGate
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
          foil: '',
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
        this.$fetch();
      }, 600)
    },
    set_code(){
      this.$fetch();
    },
    authenticated(){
      this.$fetch();
    },
    tradable() {
      this.$fetch();
    },
    rarity() {
      this.$fetch();
    },
    foil() {
      this.$fetch();
    },
    color() {
      this.$fetch();
    },
    cmc() {
      this.$fetch();
    },
    reserve_list() {
      this.$fetch();
    },
    priceOver() {
      this.$fetch();
    },
    priceUnder() {
      this.$fetch();
    }
  },
  async fetch() {
      if(!this.authenticated) return;

      await this.refreshPriceMeta()
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
          this.priceUnder,
          this.foil
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

        this.onResize();

      } catch (error){

          this.data = []
          this.total = 0
          this.loading = false
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

    async refreshPriceMeta(){
      const data = await this.$echomtg.inventoryQuickStats();

      this.$store.commit('quickstats',data.stats);
    },
    /*
      * Handle page-change event
    */
    onPageChange(page) {
        this.page = page
        this.$fetch()
    },
    /*
      * Handle sort event
    */
    onSort(field, order) {
        this.sortField = field
        this.sortOrder = order
        this.$fetch()
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
    },
    getDate(){
      return this.$moment(new Date(), "MMM Do YY");
    }
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
    this.onResize();
    this.$fetch()
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
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
          label: this.authenticated ? `${this.user.username}'s Inventory` : `Trading Card Inventory Tracking`,
          url: '/apps/inventory/',
          icon: ''
        }
      ]
    },
    ...mapState([
      'userName',
      'user',
      'authenticated',
      'quickstats'
    ])
  },
  head () {
    return {
        title: this.authenticated ? `${this.user.username}'s EchoMTG Inventory Binder` : `Magic the Gathering Inventory Collection Tools`,
        meta: [
          {
            hid: 'og:image',
            property: 'og:image',
            content: `https://assets.echomtg.com/images/echomtg-og-default.png`
          },
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
