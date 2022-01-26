<template>
  <card-component
    :title="title"
    :icon="icon"
    :is-scrollable="true"
    :has-button-slot="true"
    :has-footer-slot="true"
    @ps-ready="psReady"
  >
    <refresh-button
      slot="button"
      :is-loading="isLoading"
      @button-click="delayedFetch"
    />
    <card-toolbar
      slot="toolbar"
      class="is-upper"
      :class="status.toolbarClass ? status.toolbarClass : null"
    >
      <div v-if="status.text" slot="left">
        {{ status.text }}
      </div>
      <span
        v-if="status.label || status.labelIcon"
        slot="right"
        class="tag"
        :class="status.labelClass"
      >
        <b-icon
          v-if="status.labelIcon"
          :icon="status.labelIcon"
          custom-size="default"
        />
        <span v-if="status.label">{{ status.label }}</span>
      </span>
    </card-toolbar>

    <div class="media-list">
      <b-loading :is-full-page="false" :active="isLoading" />
      <media-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :has-share-buttons="hasShareButtons"
        :has-dismiss="hasDismiss"
      />
    </div>

    <a slot="footer" class="card-footer-item" @click.prevent="delayedFetch">
      <b-icon icon="autorenew" custom-size="default" />
      <span>Load more</span>
    </a>
  </card-component>
</template>

<script>
import axios from 'axios'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import MediaItem from '@/components/MediaItem'
import RefreshButton from '@/components/RefreshButton'
export default {
  name: 'CardScrollable',
  components: { RefreshButton, MediaItem, CardToolbar, CardComponent },
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    dataUrl: {
      type: String,
      default: null
    },
    hasShareButtons: {
      type: Boolean,
      default: false
    },
    hasDismiss: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      items: [],
      status: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    psReady (ps) {
      this.ps = ps
    },

    /*
     * This is an imitation, to show the loading state
     * We delay for 500ms
     * */
    delayedFetch () {
      this.isLoading = true

      this.items = []

      this.status = {
        text: 'Fetching data...',
        labelClass: 'is-info',
        labelIcon: 'shuffle-variant'
      }

      setTimeout(() => {
        this.fetchData()
      }, 500)
    },
    fetchData () {
      this.isLoading = true

      this.items = []

      this.status = {
        text: 'Fetching data...',
        labelClass: 'is-info',
        labelIcon: 'shuffle-variant'
      }

      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false

          if (r.data) {
            if (r.data.data) {
              this.items = r.data.data
            }
            if (r.data.status) {
              this.status = r.data.status
            }
          }

          this.$nextTick(() => {
            if (this.ps) {
              this.ps.update()
            }
          })
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
