<template>
  <div class="is-user-avatar">
    <img :src="getAvatar" :alt="this.user.username">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null
    }
  },
  computed: {
    getAvatar () {
      if (this.user.avatar) {
        return this.user.avatar
      }

      return `https://assets.echomtg.com/interface/echomtg-mage-avatar.png`
    },
    ...mapState(['user'])
  }
}
</script>
