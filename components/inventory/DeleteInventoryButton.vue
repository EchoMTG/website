<template>
  <b-button icon-left="delete-forever" size="is-small" @click="deleteItem()" />
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
  }
 },
 methods: {
  deleteItem() {

    this.$echomtg.inventoryDeleteItem(this.inventory_id)
    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>
