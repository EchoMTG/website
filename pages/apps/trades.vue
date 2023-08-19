<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>User Trades </h1>


    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Tools',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      test: null,
    }
  },
  computed: {
    crumbs() {
      return [
        {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        }
      ]
    },

  },
  head () {
      return {
          title: `Magic: The Gathering - Trades`,
          description: `Search user tradelists.`
      }
    }
}
</script>
