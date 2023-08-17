<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <title-bar :title-stack="titleStack" />
    <a href="/hello/">test</a>
    <NuxtLink to="/hello/">test nuxt link</NuxtLink>
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
      title: 'Expansions',
      expansions: []
    }
  },
  async asyncData({ redirect, $config, env, $echomtg }) {
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
      redirect('/sets/')
    }
  },
  computed: {
    titleStack () {
      return ['Magic the Gathering', 'Expansions']
    },
    crumbs () {
      return [
        {
          label: 'Expansions',
          url: '/sets/',
          icon: ''
        },

      ]
    },

  },
  head () {
      return {
          title: `Magic: the Gathering Sets and Expansions`,
          description: `Explore every MTG set since alpha edition, organized by date with search function.`
      }
    }
}
</script>
