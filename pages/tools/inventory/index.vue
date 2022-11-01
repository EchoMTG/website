<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small is-dark is-hidden-mobile">
      <div class="hero-body">
          <div class="container">
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
      </div>
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

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort">

            <b-table-column field="name" label="Name" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>

            <b-table-column field="tcg_market" label="Market" numeric sortable v-slot="props">
                <span class="tag" :class="type(props.row.tcg_market)">
                    {{ props.row.tcg_market }}
                </span>
            </b-table-column>

            <!-- <b-table-column field="release_date" label="Release Date" sortable centered v-slot="props">
                {{ props.row.release_date ? new Date(props.row.release_date).toLocaleDateString() : 'unknown' }}
            </b-table-column>

            <b-table-column label="Overview" width="500" v-slot="props">
                {{ props.row.overview | truncate(80) }}
            </b-table-column> -->

        </b-table>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Inventory',

  components: {
    EchoBreadCrumbs
  },
  data() {
      return {
          data: [],
          total: 0,
          loading: false,
          sortField: 'tcg_mid',
          sortOrder: 'desc',
          defaultSortOrder: 'desc',
          page: 1,
          perPage: 200,
           cs: '$',
          tableHeight: 400,
          windowHeight: 1000
      }
  },
  methods: {
    /*
    * Load async data
    */
    async loadAsyncData() {


//https://dev.echomtg.com/api/inventory/view/?start=0&limit=200
        this.loading = true
        try {
          let start = (this.page - 1) * this.perPage;
          const data = await this.$echomtg.inventoryView(start,this.perPage)

          this.data = []
          let currentTotal = data.meta.total_pages * data.meta.items_per_page

          this.total = currentTotal
          console.log(this.total)
          data.items.forEach((item) => {
              //item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
              this.data.push(item)
          })
          console.log(this.data)
          this.loading = false

        } catch (error){
          console.log(error)
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
    type(value) {
        const number = parseFloat(value)
        if (number < 6) {
            return 'is-danger'
        } else if (number >= 6 && number < 8) {
            return 'is-warning'
        } else if (number >= 8) {
            return 'is-success'
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
          title: `Inventory: Collection tools`,
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
