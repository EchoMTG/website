<template>

  <div>
    <nuxt v-if="user && user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <echo-bread-crumbs :data="crumbs" />
    <div class="pt-4 pl-4">
    <h1 class="title is-size-5">MTG Sets and Expansions</h1>
    </div>
    <Expansions :loading="loading" :expansions="expansions" />
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
    this.expansions = await this.$echomtg.getSets()
    this.loading = false
  },
  computed: {
    titleStack () {
      return ['Magic the Gathering', 'Sets']
    },
    crumbs () {
      return [
        {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''

        },
        {
          label: 'Sets',
          url: '/mtg/sets/',
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
          title: `MTG Sets and Expansions`,
          description: `New MTG sets to old like alpha edition, organized by date with search and prices.`
      }
    }
}
</script>
