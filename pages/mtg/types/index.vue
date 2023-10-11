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
          <div v-if="!authenticated" class="column is-one-third">
           <h4 class="title is-size-5 has-text-white">Create an Echo MTG Accounts</h4>
           <b-button @click="signuplink" type="is-success">Start with a Free Account</b-button>

          </div>
        </div>

      </div>
    </section>

    <section>
      <b-table
        :data="types"
        default-sort-direction="DESC"
        default-sort="total"
         striped
         :mobile-cards="false"
         :paginated="true"
      pagination-size="is-small"
      pagination-position="bottom"
      pagination-order="is-centered"
      :per-page="50"
        >
        <b-table-column sortable :label="`Magic Type (${total} total types)`" v-slot="props" searchable field="type">
          <echo-link :url="props.row.url">{{props.row.type}}</echo-link>
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
import EchoLink from '~/components/EchoLink.vue';
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';

export default {
  name: 'Types',
  components: {
    EchoBreadCrumbs,
    EchoLink
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
    ...mapState([
      'user',
      'authenticated'
    ]),
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
          title: `Types of Magic: The Gathering Cards: Creatures, Lands, Artifacts, and More`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `Learn about the various types of Magic: The Gathering cards, including creatures, lands, artifacts, enchantments, planeswalkers, and more. Find out how each type of card is used in the game and how they can help you build a winning deck.`
            }
          ]

      }
    }
}
</script>
