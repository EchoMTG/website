<template>
  <div>
    <!-- user dashboard -->
    <user-dashboard v-if="this.userName" />

    <!-- default homepage -->
    <div v-if="!this.userName">

      Welcome to EchoMTG
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import UserDashboard from '@/components/UserDashboard'
export default {
  name: 'Home',
  components: {
    UserDashboard
  },
  data () {
    return {
      test: null
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
}
</script>
