<template>
  <b-button
    :size="size"
    icon-left="eye"
    @click="add"
    :label="showLabel ? 'Add To Watchlist' : ''"
    :type="isDarkModeActive == 1 ? 'is-dark' : ''"
    />
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'WatchlistQuickAddButton',
  props: {
    emid: {
      required: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'is-small'
    }
  },
  computed:{
    ...mapState(['isDarkModeActive'])
  },
  methods: {
    async add(){
      const res = await this.$echomtg.addToWatchlist(this.emid);
      let type = 'is-success'

       // trigger login
      if(res.message.includes('authorized')){
        this.$store.commit('loginSignupModalShow',true);
        type = 'is-warning'
      }

      this.$buefy.toast.open({
        message: res.message,
        type: type
      })
    }
  }
}
</script>
