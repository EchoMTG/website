<template>
  <b-field>
    <p class="control">
        <b-button aria-disabled="true" type="is-dark" disabled size="is-small">{{currency_symbol}}</b-button>
    </p>
    <b-input
      :has-counter="false"
      type="number"
      min="0.00"
      autocomplete="off"
      pattern="[^-][\d]+(\.[0-9]{0,2}])?"
      step="0.01"
      :value="price_acquired"
      size="is-small"
      style="max-width: 57px"
      @input="update" />
  </b-field>
</template>
<script>

export default {
  name: 'AcquiredPriceInput',
  props: {
    callback: {
      type: Function
    },
    currency_symbol: {
      type: String,
      required: true
    },
    price_acquired: {
      type: Number,
      required: true
    },
    inventory_id: {
      type: Number,
      required: true
    }
  },

 data: () => {
  return {
    timer: null,
  }
 },
  methods: {
    async update(value) {
      if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
      }
      this.timer = setTimeout(async () => {
        const res = await this.$echomtg.inventoryUpdate(this.inventory_id, {
          acquired_price: value
        })
        this.$buefy.snackbar.open({
          message: res.message,
          queue: false
        })
        if(this.callback){
          this.callback()
        }
      },800);
    }
  }
}
</script>
