<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column  is-two-thirds">
            <h1 class="title">
                Inventory
            </h1>
            <h3 class="subtitle">
                Manage your collection
            </h3>
          </div>
          <div class="column is-one-third">
            Export Options

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
        <set-selector class="level-item" :callback="setExpansion" />
      </nav>

    </section>

    <b-table
            :data="data"
            :loading="loading"
            :height="tableHeight"
            :debounce-search="0"
            :sticky-header="true"
            paginated
            ref="table"
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
            @sort="onSort">

            <b-table-column field="name" label="Name" sortable v-slot="props">
                <b-tag class="has-background-warning-dark has-text-white is-pulled-left mr-2" v-if="props.row.foil == 1">foil</b-tag>
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

            <b-table-column field="tcg_market" label="Price" numeric sortable v-slot="props">

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
            <b-table-column field="date_acquired" label="Acq. Date" date sortable centered v-slot="props">
                {{ props.row.date_acquired ? new Date(props.row.date_acquired).toLocaleDateString() : 'N/A' }}
            </b-table-column>
            <b-table-column field="price_acquired" :label="`Acq. ${cs}`" numeric sortable centered v-slot="props">
                 {{cs}}{{ props.row.price_acquired}}
            </b-table-column>
            <b-table-column field="personal_gain" label="P/L" numeric sortable centered v-slot="props">
                 <span class="tag" :class="type(props.row.personal_gain)">
                    {{ props.row.personal_gain }} %
                </span>
            </b-table-column>
            <b-table-column v-slot="props">
                 <delete-inventory-button :inventory_id="props.row.inventory_id" :callback="loadAsyncData" />
            </b-table-column>


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
export default {
  name: 'Inventory',

  components: {
    EchoBreadCrumbs,
    ItemInspectorWrapper,
    DeleteInventoryButton,
    SetSelector
  },
  data() {
      return {
          data: [],
          total: 0,
          loading: false,
          search: '',
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
            this.set_code

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
        height = this.windowHeight - rects.top - 160 // 120 is the table header and pagination bar
      }
      this.tableHeight = height
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.updateTableHeight()
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
    this.loadAsyncData()
    this.updateTableHeight()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
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
