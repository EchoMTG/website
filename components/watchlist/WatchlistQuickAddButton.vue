<template>
  <b-button :size="size" icon-left="eye" @click="add" :label="showLabel ? 'Add To Watchlist' : ''" />
</template>
<script>
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
  methods: {
    async add(){
      const res = await this.$echomtg.addToWatchlist(this.emid);
       this.$buefy.snackbar.open({
          message: res.message,
          type: 'is-success',
          queue: false,
          duration: 10000,
          position: 'is-bottom-right'
       })
    }
  }
}
</script>
