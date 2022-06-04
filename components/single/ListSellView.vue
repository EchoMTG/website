<template>
  <div class="">
    <h1>Sell cards in this list now.</h1>
    
     <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total Sellable Value</p>
          <p class="title">{{list.currency_symbol}}{{totalSellableValue}}</p>
        </div>
      </div>
      
    </nav>
    <table class="table">
      <template v-for="(card, index) in list.card_list">
        <tr v-if="card.ck_buy > 0" :key="`list-card-item-index-${index}`">
            <td>{{card.name}} [{{card.set_code}}]</td>
            <td>{{list.currency_symbol}}{{card.ck_buy}}</td>
        </tr>
      </template>
    </table>
</div>
</template>

<script>
export default {
  props: ['list'],
  computed: {
    totalSellableValue: function () {
      let buyTotal = 0
      for (let objectKey in this.list.card_list) {
        if (parseFloat(this.list.card_list[objectKey].ck_buy) > 0) {
          buyTotal += parseFloat(this.list.card_list[objectKey].ck_buy)
        }
      }
      return buyTotal
    },
  },
}
</script>

<style>
</style>