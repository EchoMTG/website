<template>
  <div>
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
export default {
  name: 'Sets',
  components: {
    TitleBar,
    HeroBar,
    Expansions
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
      return ['MTG', 'Expansions']
    }
  },
}
</script>
