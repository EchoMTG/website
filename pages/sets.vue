<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      MTG
      <router-link slot="right" to="/sets" class="button">
        Expansions
      </router-link>
    </hero-bar>
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
    let endpoint = `${$config.API_DOMAIN}data/sets/`;
    $echomtg.log(endpoint+env.S2S_KEY)


    // fetch the set
    const res = await fetch(
      endpoint, {
        headers: {
          'Authorization' : 'Bearer ' + env.S2S_KEY
        }
      }
    );

    // try to get the json
    try {
      expansions = await res.json();
      //console.log('expansions from sets',expansions)
    } catch(err){
      console.log(err, res)
    }

    // return it
    if (expansions) {

      return {
        expansions: expansions.data
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
