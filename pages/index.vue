<template>
  <div>
    <!-- user dashboard -->
    <user-dashboard v-if="this.userName" />

    <!-- default homepage -->
    <default-homepage v-if="!this.userName" />

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
      test: null
    }
  },
  asyncData({req}) {
    console.log('async from index',req)
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
}
</script>
