<template>
  <b-field>
    <p class="control">
        <b-button aria-disabled="true" disabled size="is-small">{{currency_symbol}}</b-button>
    </p>
    <b-input
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

  methods: {
    async update(value) {

      await this.$echomtg.inventoryUpdate(this.inventory_id, {
        acquired_price: value
      })
      this.$buefy.snackbar.open({
        message: `Purchase Price updated to: ${this.currency_symbol}${value}`,
        queue: false
      })
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
