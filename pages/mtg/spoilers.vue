<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <section class="hero is-small has-background-black has-text-white is-hidden-mobile">
      <div class="hero-body">

        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title has-text-white">
                Magic: the Gathering Spoilers for SET, SET, and SET
            </h1>
            <h3 class="subtitle has-text-white">
                View spoilers from upcoming magic: the gathering releases
            </h3>
          </div>
          <div class="column is-one-third">
           <h4 class="title is-size-5 has-text-white">Create an Echo MTG Accounts</h4>
           <b-button @click="signuplink" type="is-success">Start a Free Account</b-button>

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
export default {
  name: 'spoilers',

  data () {
    return {
      recentSets: [],
      cards: []
    }
  },
  asyncData({req}) {
    // get sets, filter by release date > current date
    // get cards from each set
  },
  methods: {
    signuplink() {
      window.location.replace('/')
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  head () {
      return {
          title: `Magic:the Gathering Spoilers for SET LIST`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `View the latest spoilers from upcoming magic the gathering releases SET LIST`
            }
          ]

      }
    }
}
</script>
