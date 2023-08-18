<template>
  <b-button title="Duplicate Item" icon-left="content-copy" size="is-small" @click="duplicate()" />
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

      this.$buefy.snackbar.open({
        message: `${this.copy.name} duplicated`,
        queue: false
      })
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
