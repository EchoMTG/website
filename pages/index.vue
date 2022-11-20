<template>
  <div>
    <!-- user dashboard -->
    <user-dashboard v-if="this.loggedIn" />

    <!-- default homepage -->
    <default-homepage v-if="!this.loggedIn" />

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
  asyncData({req, $cookies}) {
    //console.log('async from index',req)
    let loggedIn = false
    if($cookies.get('token')){
      loggedIn = true
    }

    return { loggedIn}
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  head () {
      return {
          title: `Magic:the Gathering Collection Tools &amp; Card Pricing Application`,
          meta: [
            { hid: 'og:image', property: 'og:image', content: `https://assets.echomtg.com/images/echomtg-og-default.png` },
            {
              hid: 'description',
              name: 'description',
              content:  `A suite of Financial oriented Collection tools and Pricing information for Magic:the Gathering Players and Store Owners`
            }
          ]

      }
    }
}
</script>
