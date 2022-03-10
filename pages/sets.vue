<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      MTG
      <router-link slot="right" to="/sets" class="button">
        Expansions
      </router-link>
    </hero-bar>
    <expansions data-url="https://dev.echomtg.com/api/data/sets/" />
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
      title: 'Expansions'
    }
  },
  computed: {
    titleStack () {
      return ['MTG', 'Expansions']
    },
    ...mapState([
      'userName'
    ])
  },
}
</script>
