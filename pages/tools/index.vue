<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    Tools

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Tools',
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
          url: '/tools',
          icon: ''

        }
      ]
    }
  },
  head () {
      return {
          title: `Collector Tools for Magic the Gathering`,
          description: `A suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
      }
    }
}
</script>
