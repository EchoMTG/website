<template>
   <b-button
      @click="addToInventory"
      icon-right="plus"
      size="is-small"
      type="is-dark"
      icon-left="book-open-page-variant-outline"
      :class="getClasses"
    ></b-button>
</template>

<script>
export default {
  name: 'QuickAddButton',
  props: {
    emid: {
      type: Number,
      required: true
    },
    foil: {
      type: Number,
      default: 0
    },
    callback: {
      type: Function,
      default: null
    },
    classes: {
      type: String,
      default: ''
    }
  },
  methods: {
    async addToInventory(){
      const res = await this.$echomtg.inventoryQuickAdd(this.emid,this.foil)
       this.$buefy.toast.open({
        message: res.message
      })
      if(this.callback){
        await this.callback()
      }
    },
  },
  computed: {
    getClasses(){
      let foilClass = parseInt(this.foil) == 1 ? 'rainbow-background has-text-white' : 'has-background-dark has-text-light';
      return foilClass + ' inventoryQuickAddButton ' + this.classes
    }
  }
}
</script>
