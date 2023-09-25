<template>
   <b-dropdown  aria-role="list" append-to-body

                    trap-focus position="is-bottom-left">
      <template #trigger="{ active }">
          <b-button
              label="Export Options"
              size="is-small"
              icon-left="share"
              :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>

      <b-dropdown-item target="_blank" :href="downloadCSVURL()" aria-role="listitem"><b-icon size="is-small" icon="download"></b-icon> Download CSV</b-dropdown-item>
      <b-dropdown-item target="_blank" href="/api/#inventory-view" aria-role="listitem"><b-icon size="is-small" icon="code-braces"></b-icon> Export with API</b-dropdown-item>
  </b-dropdown>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ExportDropdown',
  data: () => {
    return {
      active: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    downloadCSVURL() {


      if(this.user.plan !== 'common' && this.user.plan !== 'uncommon' && this.user.plan !== 'uncommonY' && this.user.plan !== 'rareY' &&  this.user.plan !== 'rare'){
        return this.$echomtg.getAPIURL() + 'stores/export/?auth=' + this.$echomtg.getToken();
      } else {
        return this.$echomtg.getAPIURL() + 'inventory/export/?auth=' + this.$echomtg.getToken();
      }
    }
  }

}
</script>
