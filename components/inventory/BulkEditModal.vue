<template>
  <b-modal v-model="isOpen" :active="active" :width="640" scroll="keep">
      <div class="card has-background-white">
          <div :class="`card-header has-background-${actionColor[actiontype]}`" >
            <p class="card-header-title has-text-white">
              <b-icon :icon="actionIcons[actiontype]" /> {{actionNames[actiontype]}} ({{selecteditems.length}}) Inventory Items
            </p>
          </div>
          <div class="card-content has-text-left">
              <b-table
              :data="selecteditems"
              :striped="true"
              :narrowed="true"
              :mobile-cards="false"
              :sticky-header="true"
            >
                <b-table-column field="name" label="Name" numeric sortable v-slot="props">
                  <b-image :alt="props.row.name" style="width:32px;height:18px" class="is-pulled-left" :src="props.row.image_cropped" />
                  {{props.row.name}}
                </b-table-column>
                <b-table-column field="expansion" label="Expansion" numeric sortable v-slot="props">
                  {{props.row.expansion}}
                </b-table-column>
              </b-table>

          </div>
          <div class="card-content">
            <b-button icon-left="close" label="Cancel" @click="isOpen = false" />
            <b-button @click="bulkEdit()" class="is-pulled-right" :type="`is-${actionColor[actiontype]}`" :icon-left="actionIcons[actiontype]" :label="actionButton[actiontype]"/>
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
  },
  removeChecked: {
    type: Function,
    required: true
  }

 },
 data: () => {
  return {
    acquired_date: 'xyz',
    isOpen: false,
    actionNames: {
      addtolist: 'Add to List',
      delete: 'Delete',
      togglefoil: 'Change foil status of',
      changeprice:'Change Acquired Price of',
      changedate: 'Change Acquired Date of'
    },
    actionButton: {
      addtolist: 'Add to List',
      delete: 'Delete',
      togglefoil: 'Change foil Status',
      changeprice:'Change Acquired Price',
      changedate: 'Change Acquired Date'
    },
    actionIcons: {
      addtolist: 'plus',
      delete: 'delete',
      togglefoil: 'star-shooting-outline',
      changeprice:'currency-usd',
      changedate: 'calendar'
    },
    actionColor: {
      addtolist: 'dark',
      delete: 'danger',
      togglefoil: 'warning',
      changeprice:'success',
      changedate: 'info'
    }
  }
 },
 watch: {
  active (newVal) {

    this.isOpen = newVal


  },
  isOpen(newVal){
    if(newVal == false){
      this.toggleBulkModal(this.actiontype)
    }
  }
 },
 methods: {
  async bulkEdit() {
    if(this.actiontype == 'delete'){
      for(let i = 0; i< this.selecteditems.length; i++){
        await this.$echomtg.inventoryDeleteItem(this.selecteditems[i].inventory_id);

      }
    }
    // value = new Date(Date.parse(value))
    // const yyyy = value.getFullYear();
    // let mm = value.getMonth() + 1; // Months start at 0!
    // let dd = value.getDate();

    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;

    // this.$echomtg.inventoryUpdate(this.inventory_id,{
    //   acquired_date: yyyy + '-' + mm + '-' + dd
    // });

    if(this.callback){
      this.isOpen = false
      this.removeChecked()
      this.callback()
    }
  }
 }
}
</script>


