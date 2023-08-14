<template>
  <b-modal v-model="isOpen" :active="active" :width="640" scroll="keep">
      <div class="card">

          <div class="card-content">
              <div class="content">
                 {{actiontype}}
              </div>
          </div>
      </div>
  </b-modal>
</template>
<script>

export default {
 name: 'BulkEditModal',
 props: {
  callback: {
    type: Function,
    required: true
  },
  selecteditems: {
    type: Array,
    required: true
  },
  actiontype: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  toggleBulkModal: {
    type: Function,
    required: true
  }

 },
 data: () => {
  return {
    acquired_date: 'xyz',
    isOpen: false
  }
 },
 watch: {
  active (newVal) {

    this.isOpen = newVal


  },
  isOpen(newVal){
    if(newVal == false){
      this.toggleBulkModal(false)
    }
  }
 },
 methods: {
  bulkEdit(value) {
    value = new Date(Date.parse(value))
    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; // Months start at 0!
    let dd = value.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    this.$echomtg.inventoryUpdate(this.inventory_id,{
      acquired_date: yyyy + '-' + mm + '-' + dd
    });

    if(this.callback){
      this.callback()
    }
  }
 }
}
</script>


