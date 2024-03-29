<template>
  <div>
     <div class="columns m-2" ref="searchBox">

      <div class="column">

          <b-input

              placeholder="Search by name..."
              type="search"
              v-model="search"
              size="is-small"
              class="mr-1"
              icon="magnify" />

      </div>
      <div class="column is-hidden-touch">
        <div class="content">
        <p>Search a list of all {{game}} Expansions, Promos, and Sets. Ordered by newest set first. </p>
        </div>
      </div>
    </div>



    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"

      :paginated="paginated"
      pagination-size="is-small"
      pagination-position="bottom"
      pagination-order="is-centered"
      :loading="loading"
      :per-page="perPage"
      :striped="true"
      :mobile-cards="false"
      default-sort-direction="DESC"
      default-sort="release_date"
      :data="filteredExpansionsList"
    >

      <b-table-column v-slot="props" label="Name" field="name" sortable>

        <i v-if="game == 'mtg'" :class="getSetIconClass(props.row.set_code)"></i>
        <echo-link :url="makeSetPath(props.row.set_code,props.row.set_code_path_part)">{{ props.row.name }}</echo-link>
      </b-table-column>
      <b-table-column

        v-slot="props"
        label="Percent Collected"
        field="percent_collected"
        sortable>
          <div class="is-flex is-justify-content-center	is-align-content-center	is-align-items-center">
            <progress class="progress is-success mb-0" :value="props.row.user_collected ? parseInt(props.row.user_collected) : 0" :max="props.row.unique_items ? parseInt(props.row.unique_items) : 0">{{props.row.percent_collected}}%</progress>
            <b-tooltip
              multilined
              :label="authenticated ? `Click for more details: ${props.row.user_collected} of ${props.row.unique_items} collected (${props.row.percent_collected}%) ` : 'Create an Account to Track your Collection'"
              position="is-bottom"
            >
            <echo-link class="is-link has-text-grey" :url="authenticated ? makeSetPath(props.row.set_code,props.row.set_code_path_part) + 'calculations/' : '/'">
              <b-icon icon="percent-box" size="is-small" class="is-clickable has-text-grey ml-1" />
            </echo-link>
            </b-tooltip>
            <b-tooltip
              :label="`Open printable checklist for ${props.row.name}`"
              position="is-bottom"
            >
            <a class="is-link has-text-grey" :href="makeSetPath(props.row.set_code,props.row.set_code_path_part) + 'printable-check-list/'" target="_blank"><b-icon icon="printer" size="is-small" /></a>
            </b-tooltip>
          </div>
      </b-table-column>
      <b-table-column :visible="$device.isMobileOrTablet ? false : true" v-slot="props" label="Set Value" field="total_value" numeric sortable>
        <span v-if="props.row.total_value">
        {{quickstats.currency_symbol}}{{ props.row.total_value.toLocaleString() }}
        </span>
        <nuxt-link :to="/login/" v-else-if="!authenticated">Login for Value</nuxt-link>
      </b-table-column>
      <b-table-column :visible="authenticated" v-slot="props" label="Collected Value" field="total_value_owned" numeric sortable>
        <nuxt-link class="has-text-success" :to="makeSetPath(props.row.set_code,props.row.set_code_path_part) + 'calculations/'" v-if="props.row?.total_value_owned > 0">{{quickstats.currency_symbol}}{{ props.row.total_value_owned.toLocaleString() }}</nuxt-link>
      </b-table-column>
      <b-table-column
        :visible="$device.isMobileOrTablet ? false : true"
        v-slot="props"
        label="Set Code"
        field="set_code"
        sortable>
        {{ props.row.set_code }}
      </b-table-column>





      <b-table-column
        :visible="$device.isMobileOrTablet ? false : true"
        v-slot="props"
        label="Type"
        field="type"
        sortable>
        {{ props.row.type }}
      </b-table-column>

      <b-table-column :visible="$device.isMobileOrTablet ? false : true" v-slot="props" label="Release" field="release_date" sortable>
        {{ props.row.release_date }}
      </b-table-column>


      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="loading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="question-circle" size="is-large" />
            </p>
            <p>No Data Available &hellip;</p>
            <b-button @click="search = ''">Clear Search</b-button>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'
import { mapState } from 'vuex'
import EchoLink from './EchoLink.vue'

export default {
  name: 'Sets',
  components: { ModalBox, EchoLink },
  props: {

    checkable: {
      type: Boolean,
      default: false
    },
    expansions: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      paginated: true,
      perPage: 50,
      checkedRows: [],
      search: ''
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/${this.game}/sets/${code.toLowerCase()}/${path_part}/`
    },
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' is-size-4 mr-1'
    },

  },
  computed: {
     ...mapState([
      'user',
      'sets',
      'authenticated',
      'quickstats'
    ]),
    game() {
      if(this.$nuxt){
        const split = this.$nuxt.$route.path.split('/')
        return split[1];
      } else {
        return 'mtg'
      }
    },
    filteredExpansionsList() {

      if(this.search == '') return this.expansions;
      return this.expansions.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
    }

  }
}
</script>
