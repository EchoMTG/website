<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />

    <div class="content m-5 mb-0">
      <h1>Magic the Gathering Alters Database</h1>
      <p>Magic:the Gathering Card Alter Gallery from artists making custom card art</p>
    </div>



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

        },
        {
          label: 'Alters',
          url: '/mtg/alters/',
          icon: ''

        }
      ]
    },

  },
  head () {
      return {
          title: `Magic: The Gathering  Alters Database`,
          description: `Explore the Magic:the Gathering Card Alter Gallery
`
      }
    }
}
</script>
