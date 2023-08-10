<template>
  <b-button :class="classType(foil) + `   `" style="overflow:hidden; max-width: 36px; position: relative;" size="is-small" @click="toggleFoil()">
    <i class="ss ss-htr ss-3x has-text-warning-dark" style="font-size: 28px; font-weight: bold; position: absolute; left: 5px; top: 0px;"></i>
  </b-button>
</template>
<script>

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
    }
  },

  methods: {
    classType(foil) {
      return foil == 1 ? 'is-warning' : 'is-secondary'
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
