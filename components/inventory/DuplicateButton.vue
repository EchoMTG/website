<template>
  <b-button title="Duplicate Item" :type="isDarkModeActive ? 'is-dark' : ''" icon-left="content-copy" size="is-small" @click="duplicate()" />
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
      ...mapState([
        'isDarkModeActive'
      ])
  },
  methods: {
    async duplicate() {

      const res = await this.$echomtg.inventoryAdd(this.copy.emid,{
        acquired_price: this.copy.price_acquired,
        foil: this.copy.foil,
        condition: this.copy.condition,
        language: this.copy.language
      })

      this.$buefy.snackbar.open({
        message: res.message,
        queue: false
      })
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
