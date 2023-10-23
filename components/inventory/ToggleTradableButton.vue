<template>
  <b-button
    :title="tradable ? `Remove from Trade Binder` : `Add to Trade Binder`"
    :icon-left="icon"
    :type="isDarkModeActive && tradable == 0 ? 'is-dark' : ''"
    :class="classType(tradable)"
    size="is-small"
    @click="toggleTradeable()" />
</template>
<script>
import { mapState } from 'vuex';

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
  computed: {
      ...mapState([
        'isDarkModeActive'
      ])
  },
  methods: {
    classType(tradable) {
      if(this.icon == 'delete') return 'is-danger'
      return tradable == 1 ? 'is-success has-text-white' : ''
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
