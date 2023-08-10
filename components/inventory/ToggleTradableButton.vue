<template>
  <b-button icon-left="hand-coin" :class="classType(tradable)" size="is-small" @click="toggleTradeable()" />
</template>
<script>

export default {
  name: 'ToggleTradableButton',
  props: {
    callback: {
      type: Function
    },
    tradable: {
      type: Number,
      required: true
    },
    inventory_id: {
      type: Number,
      required: true
    }
  },

  methods: {
    classType(tradable) {
      return tradable == 1 ? 'is-success is-light' : ''
    },
    async toggleTradeable() {

      await this.$echomtg.inventoryToggleTradable(this.inventory_id, this.tradable ? 0 : 1)
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
