<template>
  <b-input size="is-small" @input="updateItem" maxlength="2" style="max-width:60px" icon-right="percent-outline" :value="threshold" />
</template>
<script>

export default {
 name: 'ThreshholdInput',
 props: {
  callback: {
    type: Function,
    required: true
  },
  threshold: {
    type: Number,
    required: true
  },
  watchlist_id: {
    type: Number,
    required: true
  }
 },
 watch: {
  threshold: function() {
    if(this.threshold > 99) {

      this.$buefy.snackbar.open({
            message: 'Max value is 99',
            queue: true,
            type: 'is-danger',
            position: 'is-top',
        })


    } else if(this.threshold < -99){

      this.$buefy.snackbar.open({
            message: 'Min value is -99',
            queue: true,
            type: 'is-danger',
            position: 'is-top',
        })

    }


  }
 },
 methods: {
  updateItem(value) {

    this.callback(this.watchlist_id,value)
  }
 }
}
</script>
