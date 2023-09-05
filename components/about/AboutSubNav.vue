<template>
  <b-menu>
    <b-menu-list label="About EchoMTG">
      <b-menu-item v-for="link in aboutNav" v-bind:key="link.label" :label="link.label"
          :active="isActive(link.to)"
          :icon="link.icon"
          tag="router-link"
          :to="link.to">
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
  import aboutMenu from '@/components/navigation/about'

  export default {
    name: 'AboutSubNav',
    methods: {
      isActive: function(path){
        if(this.$route.fullPath.includes(path)){
          return true
        }
      }
    },
    computed: {
      aboutNav() {
        return aboutMenu();
      }
    }
  }
</script>
