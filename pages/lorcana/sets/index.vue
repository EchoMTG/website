<template>

  <div>
    <nuxt v-if="user && user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <echo-bread-crumbs :data="crumbs" />
    <title-bar :title-stack="titleStack" />
    <Expansions :expansions="expansions" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Expansions from '@/components/Expansions.vue'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
export default {
  name: 'Sets',
  components: {
    TitleBar,
    HeroBar,
    Expansions,
    EchoBreadCrumbs
  },
  data () {
    return {
      title: 'Sets',
      expansions: [],
      loading: false
    }
  },
  fetchOnServer: true,
  async fetch() {
    this.loading = true
    this.expansions = await this.$echomtg.getSets(71)
    this.loading = false
  },
  computed: {
    titleStack () {
      return ['Lorcana', 'Sets']
    },
    crumbs () {
      return [
        {
          label: 'Disney Lorcana',
          url: '/lorcana/',
          icon: ''

        },
        {
          label: 'Sets',
          url: '/lorcana/sets/',
          icon: ''
        },

      ]
    },
    ...mapState([
      'user',
      'authenticated'
    ])

  },
  head () {
      return {
          title: `Disney Lorcana Sets and Expansions`,
          description: `Disney Lorcana sets and releaes since 1st edition, organized by date with search and prices.`
      }
    }
}
</script>
