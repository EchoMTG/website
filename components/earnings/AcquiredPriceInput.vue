<template>

   <b-field>
    <p class="control">
        <b-button aria-disabled="true" type="is-dark" disabled size="is-small">{{currency_symbol}}</b-button>
    </p>
    <b-input
      size="is-small"
      type="number"
      min="0.00"
      autocomplete="off"
      pattern="[^-][\d]+(\.[0-9]{0,2}])?"
      step="0.00"
      @input="update"
      :value="price" />

  </b-field>
</template>
<script>

export default {
 name: 'AcquiredPriceInput',
 props: {
  callback: {
    type: Function
  },
  earnings_id: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency_symbol: {
    type: String,
    default: '$'
  }
 },

 data: () => {
  return {
    timer: null,
  }
 },
 methods: {
  update(value) {
    if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
    }
    this.timer = setTimeout(() => {
      const res = this.$echomtg.earningChangeAcquiredPrice(this.earnings_id,value )
      this.$buefy.snackbar.open({
          message: res.message,
          queue: false
        })
      if(this.callback){
        this.callback()
      }
    }, 800);

  }
 }
}
</script>
