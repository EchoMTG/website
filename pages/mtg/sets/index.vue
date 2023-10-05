<template>

  <div>
    <nuxt v-if="user && user?.user_level && parseInt(user.user_level) >= 3" keep-alive />
    <echo-bread-crumbs :data="crumbs" />
    <div class="pt-4 pl-4">
    <h1 class="title is-size-5">Magic the Gathering Sets and Expansions</h1>
    </div>
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
      expansions: []
    }
  },
  fetchOnServer: true,
  async fetch() {
    this.expansions = await this.$echomtg.getSets()
  },
  async asyncData({ redirect, $echomtg }) {
     let expansions;

    // try to get the json
    try {
      expansions = await $echomtg.getSets()

    } catch(err){
      console.log(err, res)
    }

    // return it
    if (expansions) {

      return {
        expansions: expansions
      }
    } else {
      redirect('/mtg/')
    }
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
          title: `Magic: the Gathering Sets and Expansions`,
          description: `Explore every MTG set since alpha edition, organized by date with search function.`
      }
    }
}
</script>
