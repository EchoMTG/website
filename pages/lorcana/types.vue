<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title has-text-white">
               Magic: The Gathering Type Explorer
            </h1>
            <h3 class="subtitle has-text-white">
                In Magic: The Gathering, there are several different types of cards, each with its own unique characteristics and abilities.
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
      <b-table
        :data="types"
        :striped="true"
        default-sort-direction="DESC"
        default-sort="total"
        >
        <b-table-column sortable :label="`Magic Type (${total} total types)`" v-slot="props" searchable field="type">
          <nuxt-link :to="props.row.url" :prefetch="false">{{props.row.type}}</nuxt-link>
        </b-table-column>
        <b-table-column v-slot="props" :numeric="true" label="Total Printing in Each Type" sortable field="total">
          {{props.row.total}}
        </b-table-column>
      </b-table>

    </section>

  </div>

</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'spoilers',
  components: {
    EchoBreadCrumbs
  },
  data () {
    return {
      types: [],
      total: 0
    }
  },
  async asyncData({req, $echomtg, $moment}) {
    // get sets, filter by release date > current date
    const types = await $echomtg.getTypes();

    return {
      types: types.data,
      total: types.meta.total
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
  computed: {

    crumbs () {
      return [
      {
          label: 'Magic: the Gathering',
          url: '/mtg/',
          icon: ''
        },
      {
          label: 'Types',
          url: '/mtg/types/',
          icon: ''
        },

      ]
    },
  },
  head () {
      return {
          title: `Types of Disney Lorcana Cards: Characters, Songs, and More`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Learn about the various types of Disney Lorcana cards, including characters, songs, and more. Find out how each type of card is used in the game and how they can help you build a winning deck.`
            }
          ]

      }
    }
}
</script>
