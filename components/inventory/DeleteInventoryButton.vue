<template>
  <b-button :class="classes" style="background: transparent !important" title="Delete Item" type="is-danger" :outlined="true" icon-left="delete-forever" size="is-small" @click="deleteItem()" />
</template>
<script>

export default {
 name: 'DeleteInventoryButton',
 props: {
  callback: {
    type: Function,
    required: true
  },
  inventory_id: {
    type: Number,
    required: true
  },
  classes: {
    type: String,
    default: ''
  }
 },
 methods: {
  deleteItem() {

    this.$echomtg.inventoryDeleteItem(this.inventory_id)

    this.$buefy.snackbar.open({
        message: `Inventory Item #${this.inventory_id} Deleted`,
        queue: false
      })

    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>
