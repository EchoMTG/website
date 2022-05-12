<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="expansions"
    >
      <b-table-column
        v-slot="props"
        cell-class="has-no-head-mobile is-image-cell"
      >
        <div class="image">
          <img :src="props.row.avatar" class="is-rounded">
        </div>
      </b-table-column>
      <b-table-column v-slot="props" label="Name" field="name" sortable>
        <a :href="makeSetPath(props.row.set_code,props.row.set_code_path_part)">{{ props.row.name }}</a>
      </b-table-column>
      <b-table-column v-slot="props" label="Set Code" field="set_code" sortable>
        {{ props.row.set_code }}
      </b-table-column>
      <b-table-column v-slot="props" label="Release Date" field="release_date" sortable>
        {{ props.row.release_date }}
      </b-table-column>

      <b-table-column v-slot="props" label="Type" field="type" sortable>
        {{ props.row.type }}
      </b-table-column>
      <b-table-column v-slot="props" label="Total Cards" field="total_cards" sortable>
        {{ props.row.total_cards }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right">
          <nuxt-link
            :to="makeSetPath(props.row.set_code,props.row.set_code_path_part)"
            class="button is-small is-primary"
          >
            <b-icon icon="account-edit" size="is-small" />
          </nuxt-link>

        </div>
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
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'Expansions',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      expansions: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }

  },
  mounted () {
    if (this.dataUrl) {
      let api_url = process.env.API_DOMAIN + this.dataUrl
      console.log(api_url)
      this.isLoading = true
      axios
        .get(api_url)
        .then((r) => {
          console.log(r.data)
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.expansions = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    }

  }
}
</script>
