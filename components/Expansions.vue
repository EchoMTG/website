<template>
  <div>
     <div class="columns m-2" ref="searchBox">

      <div class="column">
         <div slot="right" class="control has-icons-left">
            <input
              v-model="search"
              class="input is-small is-rounded"
              type="text"
              @input="$event.target.composing = false"
              placeholder="Search by Name..."
            />
            <span class="icon is-small is-left">
              <b-icon size="is-small" icon="magnify"/>
            </span>
          </div>
      </div>
      <div class="column">
        <div class="content">
        <p>Search a list of all {{game}} Expansions, Promos, and Sets.</p>
        </div>
      </div>
    </div>



    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"
      :sticky-header="true"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :mobile-cards="false"
      default-sort-direction="DESC"
      default-sort="release_date"
      :data="filteredExpansionsList"
      :height="tableHeight"
    >

      <b-table-column v-slot="props" label="Name" field="name" sortable>
        <i v-if="game == 'mtg'" :class="getSetIconClass(props.row.set_code)"></i>
        <a :href="makeSetPath(props.row.set_code,props.row.set_code_path_part)">{{ props.row.name }}</a>
      </b-table-column>
      <b-table-column column-class="is-hidden-touch" header-class="is-hidden-touch" v-slot="props" label="Set Code" field="set_code" sortable>
        {{ props.row.set_code }}
      </b-table-column>


      <b-table-column column-class="is-hidden-touch" header-class="is-hidden-touch" v-slot="props" label="Type" field="type" sortable>
        {{ props.row.type }}
      </b-table-column>
      <b-table-column v-slot="props" label="Release Date" field="release_date" sortable>
        {{ props.row.release_date }}
      </b-table-column>


      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'
import { mapState } from 'vuex'

export default {
  name: 'Sets',
  components: { ModalBox },
  props: {

    checkable: {
      type: Boolean,
      default: false
    },
    expansions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isModalActive: false,
      isLoading: false,
      paginated: false,
      perPage: 20,
      checkedRows: [],
      search: '',
      tableHeight: '700px'
    }
  },
  computed: {

    ...mapState([
      'authenticated',
      'user',
      'sets'
    ])

  },
  created () {

    //console.log("expansions componenet", this.expansions)
    if (this.expansions) {


    }
  },
  mounted() {
    this.updateTableHeight()
  },
  methods: {

    makeSetPath(code, path_part){
      return `/${this.game}/sets/${code.toLowerCase()}/${path_part}/`
    },
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' is-size-4 mr-1'
    },
    updateTableHeight() {
      let searchBoxRects = this.$refs.searchBox.getBoundingClientRect();

      let height = window.innerHeight - searchBoxRects.bottom - 50
      this.tableHeight = height + 'px'
    }

  },
  computed: {
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
