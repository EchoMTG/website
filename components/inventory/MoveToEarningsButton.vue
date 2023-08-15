<template>
  <div style="display: inline">
    <b-button title="Add to Earnings Ledger" icon-left="cash-multiple" size="is-small" @click="isCardModalActive = true" />
    <b-modal v-model="isCardModalActive"  :width="640" scroll="keep">
        <div class="card has-background-light" style="box-shadow: 0px 0 10px rgba(0,0,0,.4); margin: 10px">
            <header class="modal-card-head">
              <p class="modal-card-title">Move <strong>{{this.inventory_item.name}}</strong> from <strong>{{this.inventory_item.expansion}}</strong> to Earnings</p>
               <b-button
                  size="is-small"
                  icon-right="close"
                  @click="isCardModalActive = false"
                  />
            </header>
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image">
                           <b-image
                            :alt="this.inventory_item.name"
                            :src="this.inventory_item.image"
                            style="width: 200px"
                            placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"
                            ></b-image>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4"></p>
                        <b-field label="Price Acquired For">
                          <p class="control">
                              <b-button aria-disabled="true" disabled size="is-small">{{currency_symbol}}</b-button>
                          </p>
                          <b-input size="is-small" v-model="acquired_price"/>
                        </b-field>
                        <b-field label="Price Sold For">
                          <p class="control">
                              <b-button aria-disabled="true" disabled size="is-small">{{currency_symbol}}</b-button>
                          </p>
                          <b-input size="is-small" v-model="sold_price"/>
                        </b-field>
                        <b-field>
                        <b-button icon-left="check" type="is-primary" @click="markSold()">Mark Sold</b-button>
                        <b-button

                            label="cancel"
                            icon-left="close"
                            type="is-light"
                            class="ml-2"
                            @click="isCardModalActive = false"
                            />
                        </b-field>
                    </div>
                </div>

                <div class="content has-text-centered">
                    This action removes your item from Inventory and transfers it to the <a href="/tools/earnings/">earnings</a> ledger.
                </div>
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'MoveToEarningsButton',
  props: {
    callback: {
      type: Function
    },
    inventory_item: {
      type: Object,
      required: true
    },
    currency_symbol: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      sold_price: 1,
      acquired_price: 1,
      isCardModalActive: false
    }
  },
  mounted() {
    this.acquired_price = this.inventory_item.price_acquired
    this.sold_price = (this.inventory_item.foil == 0) ? this.inventory_item.tcg_mid : this.inventory_item.foil_price
  },
  methods: {
    async markSold() {
      await this.addToEarnings()
      await this.deleteInvetoryItem()
    },
    async deleteInvetoryItem(){
      await this.$echomtg.inventoryDeleteItem(this.inventory_item.inventory_id)
    },
    async addToEarnings() {

      await this.$echomtg.earningsAdd(this.inventory_item.emid,this.acquired_price,this.sold_price,this.inventory_item);
      this.isCardModalActive = false;
      if(this.callback){
        this.callback()
      }
    }
  }
}
</script>
