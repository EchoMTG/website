<template>
  <b-button icon-left="content-copy" size="is-small" @click="duplicate()" />
</template>
<script>

export default {
  name: 'DuplicateButton',
  props: {
    callback: {
      type: Function
    },
    copy: {
      type: Object,
      required: true
    }
  },

  methods: {
    async duplicate() {

      await this.$echomtg.inventoryAdd(this.copy.emid,{
        acquired_price: this.copy.price_acquired,
        foil: this.copy.foil,
        acquired_date: this.copy.date_acquired,
        condition: this.copy.condition,
        language: this.copy.language
      })

      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
