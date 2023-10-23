<template>
  <b-button :type="isDarkModeActive ? 'is-dark' : ''" :title="disabled ? `Foil Not Available` : `Toggle Foil Status`" :disabled="disabled" :class="classType(foil) + `   `" style="overflow:hidden; width: 30px; position: relative;" size="is-small" @click="toggleFoil()">
    <i :class="`ss ss-htr ss-3x ` + testClass(foil) " style="font-size: 28px; position: absolute; left: 5px; top: 0px;"></i>
  </b-button>
</template>
<script>

import { mapState } from 'vuex';

export default {
  name: 'ToggleFoilButton',
  props: {
    callback: {
      type: Function
    },
    foil: {
      type: Number,
      required: true
    },
    inventory_id: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
      ...mapState([
        'isDarkModeActive'
      ])
  },
  methods: {
    classType(foil) {
      return foil == 1 ? 'rainbow-background' : ''
    },
    testClass(foil) {
      return foil == 1 ? 'has-text-white font-weight-bold' : ''
    },
    async toggleFoil() {

      await this.$echomtg.inventoryUpdate(this.inventory_id,{
        foil: this.foil == 1 ? 0 : 1
      })

      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
