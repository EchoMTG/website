<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title has-text-white">
               Lorcana Spoilers for {{upcomingSetsWords}}
            </h1>
            <h3 class="subtitle has-text-white">
                View spoilers from upcoming Disney Lorcana releases <span v-html="upcomingSetsWordsLinked"></span>. This page automatically updates spoilers on a daily basis.
            </h3>
          </div>
          <div class="column is-one-third">
           <h4 class="title is-size-5 has-text-white">Create an Echo MTG Accounts</h4>
           <b-button @click="signuplink" type="is-success">Start a Free Account</b-button>

          </div>
        </div>

      </div>
    </section>
    <div v-if="upcomingSetsTotal == 0">
      No Spoilers Yet! Come back soon!
    </div>
    <section v-for="set in this.recentSets" v-bind:key="set.id" >
      <div class="container">
        <h2 class="title is-size-2 has-text-weight-light mt-5" :id="set.set_code">{{set.name}} Spoiled Cards set to release on {{$moment(set.release_date,['YYYY-MM-DD','YYYY-DD-MM']).format('LL')}}</h2>
        <hr />
        <div class="columns is-multiline">
          <div class="column is-one-fifth" v-for="item in setData[set.set_code].set.items" v-bind:key="item.emid">
            <item-card :item="item" />
          </div>
        </div>


      </div>
    </section>

    <section>

      </section>

  </div>

</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue'
import ItemCard from '~/components/items/ItemCard.vue';

export default {
  name: 'spoilers',
  components: {
    EchoBreadCrumbs,
    ItemCard
  },
  data () {
    return {
      recentSets: [],
      setData: {}
    }
  },
  async asyncData({req, $echomtg, $moment}) {
    // get sets, filter by release date > current date
    const sets = await $echomtg.getSets();
    const recentSets = sets.filter(set => $moment(set.release_date,['YYYY-MM-DD','YYYY-DD-MM']).format('x') > Date.now())
    // get cards from each set
    let setData = {}
    for(let i = 0; i < recentSets.length; i++){
      setData[recentSets[i].set_code] = await $echomtg.getSet(recentSets[i].set_code)
    }

    return {
      recentSets: recentSets.sort((a,b) => $moment(a.release_date,['YYYY-MM-DD','YYYY-DD-MM']).format('x') - $moment(b.release_date,['YYYY-MM-DD','YYYY-DD-MM']).format('x') ),
      setData: setData
    }
  },
  methods: {
    signuplink() {
      window.location.replace('/')
    }
  },
  mounted () {
    // this.$store.commit('fullPage', false)

  },
  beforeDestroy () {


  },
  computed: {
    upcomingSetsTotal() {
      return this.recentSets.length
    },
    upcomingSetsWords() {
      if(this.recentSets.length == 1) return this.recentSets[0].name
      if(this.recentSets.length == 2) return `${this.recentSets[0].name} and ${this.recentSets[1].name}`
      let listedname = ''
      for(let i = 0; i <  this.recentSets.length; i++){
        if(this.recentSets.length - 1 == i) {
          listedname += `and ${this.recentSets[i].name}`
        } else {
          listedname += `${this.recentSets[i].name}, `
        }
      }

      return listedname;

    },
    upcomingSetsWordsLinked() {
      if(this.recentSets.length == 1) return `<a href="#${this.recentSets[0].set_code}">${this.recentSets[0].name}</a>`
      if(this.recentSets.length == 2) return `<a href="#${this.recentSets[0].set_code}">${this.recentSets[0].name}</a> and <a href="#${this.recentSets[1].set_code}">${this.recentSets[1].name}</a>`
      let listedname = ''
      for(let i = 0; i <  this.recentSets.length; i++){
        if(this.recentSets.length - 1 == i) {
          listedname += `and <a href="#${this.recentSets[i].set_code}">${this.recentSets[i].name}</a>`
        } else {
          listedname += `<a href="#${this.recentSets[i].set_code}">${this.recentSets[i].name}</a>, `
        }
      }

      return listedname;

    },
    crumbs () {
      return [
        {
          label: 'Disney Lorana',
          url: '/lorcana/',
          icon: ''

        },
      {
          label: 'Spoilers',
          url: '/lorcana/spoilers/',
          icon: ''
        },

      ]
    },
  },
  head () {
      return {
          title: `Lorcana Spoilers for ${this.upcomingSetsWords}`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `View the latest spoilers from upcoming Disney Lorcana releases ${this.upcomingSetsWords}`
            }
          ]

      }
    }
}
</script>
