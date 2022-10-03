<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    Watchlist

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Watchlist',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      test: null
    }
  },
  asyncData({req}) {
    //console.log('async from index',req)
  },
  computed: {
    ...mapState([
      'userName'
    ]),
    crumbs() {
      return [
        {
          label: 'Tools',
          url: '/tools/',
          icon: ''
        },
        {
          label: 'Watchlist',
          url: '/tools/watchlist/',
          icon: ''
        }
      ]
    }
  },
  head () {
      return {
          title: `Watchlist: Track Magic the gathering item prices`,
          description: `Hand select specific item in the magic the gathering to track their pricing movement`
      }
    }
}
</script>
