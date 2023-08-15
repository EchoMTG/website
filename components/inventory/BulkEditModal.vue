<template>
  <b-modal v-model="isOpen" :active="active" :width="640" scroll="keep">
      <div class="card has-background-white">
          <div :class="`card-header has-background-${actionColor[actiontype]}`" >
            <p class="card-header-title has-text-white">
              <b-icon :icon="actionIcons[actiontype]" /> {{actionNames[actiontype]}} ({{selecteditems.length}}) Inventory Items
            </p>
          </div>
          <div class="card-content">

            <b-field v-if="actiontype == 'changeprice'">
              <p class="control">
                  <b-button aria-disabled="true" disabled >{{currency_symbol}}</b-button>
              </p>
              <b-input
                v-model="price_acquired"
                expanded

                 />
            </b-field>
            <b-field v-if="actiontype == 'changedate'">
              <b-datepicker
                  ref="modaldatepicker"
                  v-model="acquired_date"
                  expanded
                  icon="calendar-today"
                  placeholder="Select a new acquired date for listed cards">
              </b-datepicker>
              <b-button
                  @click="$refs.modaldatepicker.toggle()"
                  icon-left="calendar-today"
                  type="is-light"
                  />
            </b-field>

            <b-table
              :data="selecteditems"
              :striped="true"
              :narrowed="true"
              :mobile-cards="false"
              :sticky-header="true"
            >
              <b-table-column field="name" label="Name" sortable v-slot="props">
                <b-image :alt="props.row.name" style="width:32px;height:18px" class="is-pulled-left mr-1" :src="props.row.image_cropped" />
                {{props.row.name}}
                <b-tag v-if="props.row.foil == 1" type="is-warning">foil</b-tag>
              </b-table-column>
              <b-table-column field="expansion" label="Expansion"  sortable v-slot="props">
                {{props.row.expansion}}
              </b-table-column>
            </b-table>


          </div>
          <div class="card-footer">
            <a href="#" class="card-footer-item" @click="isOpen = false" ><b-icon icon="close" /> Cancel</a>

            <a @click="bulkEdit()" :class="`card-footer-item has-text-white has-background-${actionColor[actiontype]}`" ><b-icon :icon="actionIcons[actiontype]" /> {{actionButton[actiontype]}}</a>
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
  },
  currency_symbol: {
    type: String,
    default: '$'
  }

 },
 data: () => {
  return {
    acquired_date: new Date(),
    price_acquired: 0.01,
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

    if(this.actiontype == 'togglefoil'){
      for(let i = 0; i< this.selecteditems.length; i++){
        await this.$echomtg.inventoryUpdate(this.selecteditems[i].inventory_id,{
          foil: this.selecteditems[i].foil == 1 ? 0 : 1
        });
      }
    }

    if(this.actiontype == 'changedate'){
      let datevalue = new Date(Date.parse(this.acquired_date))
      const yyyy = datevalue.getFullYear();
      let mm = datevalue.getMonth() + 1; // Months start at 0!
      let dd = datevalue.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      for(let i = 0; i< this.selecteditems.length; i++){
        await this.$echomtg.inventoryUpdate(this.selecteditems[i].inventory_id,{
          acquired_date: yyyy + '-' + mm + '-' + dd
        });
      }
    }

    if(this.actiontype == 'changeprice'){
      for(let i = 0; i< this.selecteditems.length; i++){
        await this.$echomtg.inventoryUpdate(this.selecteditems[i].inventory_id,{
          acquired_price: this.price_acquired
        })
      }
    }

    if(this.callback){
      this.isOpen = false
      this.removeChecked()
      this.callback()
    }
  }
 }
}
</script>


