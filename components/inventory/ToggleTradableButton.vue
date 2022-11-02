<template>
  <b-button icon-left="handshake" :class="classType(tradeStatus)" size="is-small" @click="toggleTradeable()" />
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
  data() {
    return {
      tradeStatus: 0
    }
  },
  created() {
    this.tradeStatus = this.tradable
  },
  methods: {
    classType(tradable) {
      return tradable == 1 ? 'is-info' : ''
    },
    toggleTradeable() {
      this.tradeStatus = this.tradeStatus ? 0 : 1;
      this.$echomtg.inventoryToggleTradable(this.inventory_id, this.tradeStatus)
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
