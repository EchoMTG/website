<template>
  <b-button
    :title="tradable ? `Remove from Trade Binder` : `Add to Trade Binder`"
    :icon-left="icon"
    :class="classType(tradable)"
    size="is-small"
    @click="toggleTradeable()" />
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
    },
    icon: {
      type: String,
      default: 'swap-horizontal-bold'
    }
  },

  methods: {
    classType(tradable) {
      if(this.icon == 'delete') return 'is-danger is-light'
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
