<template>
  <div>
    <!-- user dashboard -->
    <user-dashboard v-if="this.authenticated" />

    <!-- default homepage -->
    <default-homepage v-if="!this.authenticated" />

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import UserDashboard from '@/components/UserDashboard'
import DefaultHomepage from '@/components/DefaultHomepage'
export default {
  name: 'Home',
  components: {
    UserDashboard,
    DefaultHomepage
  },
  data () {
    return {
      loggedIn: false
    }
  },
  methods: {
    toggleLoggedIn(){
      this.loggedIn = !this.loggedIn;
    }
  },
  computed: {

    ...mapState(['authenticated','user'])
  },
  head () {
      return {
          title: this.authenticated ? `${this.user.username}'s dashboard` : `Magic:the Gathering Collection Tools &amp; Card Pricing Application`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `A suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
            },

          ]

      }
    }
}
</script>
