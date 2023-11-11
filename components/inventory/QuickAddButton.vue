<template>
   <b-button
      @click="addToInventory"
      icon-right="plus"
      :size="size"
      type="is-dark"
      icon-left="book-open-page-variant-outline"
      :class="getClasses"
      :label="buttonText"
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
    size: {
      type: String,
      default: 'is-small'
    },
    buttonText: {
      type: String,
      default: ''
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
      let type = 'is-success';

      // at capcity
      if(res.message.includes('capacity')){
        this.$store.commit('upgradeModalShow',true);
        type = 'is-danger'
      }

      // trigger login
      if(res.message.includes('authorized')){
        this.$store.commit('loginSignupModalShow',true);
        type = 'is-warning'
      }

      this.$buefy.toast.open({
        message: res.message,
        type: type
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
