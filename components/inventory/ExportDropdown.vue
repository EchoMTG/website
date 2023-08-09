<template>
   <b-dropdown size="is-small" aria-role="list">
      <template #trigger="{ active }">
          <b-button
              label="Export Options"
              :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>


      <b-dropdown-item target="_blank" :href="downloadCSVURL()" aria-role="listitem"><b-icon size="is-small" icon="download"></b-icon> Download CSV</b-dropdown-item>
      <b-dropdown-item target="_blank" href="/api/#inventory-view" aria-role="listitem"><b-icon size="is-small" icon="code-braces"></b-icon> Export with API</b-dropdown-item>
  </b-dropdown>
</template>
<script>

export default {
  name: 'ExportDropdown',
  data: () => {
    return {
      active: true
    }
  },

  methods: {
    downloadCSVURL() {
      const user = this.$echomtg.getUserMeta();

      if(user.plan !== 'common' && user.plan !== 'uncommon' &&  user.plan !== 'rare'){
        return this.$echomtg.getAPIURL() + 'stores/export/?auth=' + this.$echomtg.getToken();
      } else {
        return this.$echomtg.getAPIURL() + 'inventory/export/?auth=' + this.$echomtg.getToken();
      }
    }
  }

}
</script>
