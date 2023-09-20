<template>
  <b-menu>
      <b-menu-list label="Help and Support">
          <b-menu-item v-for="link in helpNav" v-bind:key="link.label" :label="link.label"
              :active="isActive(link.to)"
              :icon="link.icon"
              tag="router-link"
              :to="link.to">
          </b-menu-item>
      </b-menu-list>
  </b-menu>
</template>

<script>
  import helpMenu from '@/components/navigation/help'

  export default {
    name: 'HelpSubNav',
    methods: {
        isActive: function(path){
            if(this.$route.fullPath.includes(path)){
                return true
            }
        }
    },
    computed: {
      helpNav() {
        return helpMenu();
      }
    }
  }
</script>
