<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Tables
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated table.</b>&nbsp;Based on Buefy's table.
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Clients"
        icon="account-multiple"
      >
        <refresh-button slot="button" />
        <card-toolbar slot="toolbar">
          <div slot="left" class="buttons has-addons">
            <button class="button is-active" @click="actionSample">
              Active
            </button>
            <button class="button" disabled>
              Recent
            </button>
            <button class="button" disabled>
              Archived
            </button>
          </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Sample field..."
                >
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="dots-horizontal" custom-size="default" />
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <clients-table-sample
          data-url="/data-sources/clients.json"
          :checkable="true"
        />
      </card-component>

      <hr>

      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          data-url="/data-sources/clients.json"
          :checkable="true"
        />
      </card-component>

      <hr>

      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification>

      <card-component class="has-table has-thead-hidden">
        <clients-table-sample />
      </card-component>
    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
export default {
  name: 'Tables',
  components: {
    CardToolbar,
    RefreshButton,
    HeroBar,
    TitleBar,
    CardComponent,
    ClientsTableSample,
    Notification
  },
  head () {
    return {
      title: 'Tables — EchoMTG'
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Tables']
    }
  },
  methods: {
    actionSample () {
      this.$buefy.toast.open({
        message: 'Some action',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
