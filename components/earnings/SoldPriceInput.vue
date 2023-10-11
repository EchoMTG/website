<template>

<b-input size="is-small" @input="update" icon="currency-usd"  :value="price" />
</template>
<script>

export default {
 name: 'SoldPriceInput',
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
    this.timer = setTimeout(async () => {
      const res = await this.$echomtg.earningChangeSoldPrice(this.earnings_id,value )

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
