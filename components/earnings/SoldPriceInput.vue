<template>

<b-input size="is-small" @input="update" icon="currency-usd"  :value="price" />
</template>
<script>

export default {
 name: 'SoldPriceInput',
 props: {
  callback: {
    type: Function,
    required: true
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
 methods: {
  update(value) {
    this.$echomtg.earningChangeSoldPrice(this.earnings_id,value )
    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>
