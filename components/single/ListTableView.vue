<template>
  <div class="">
    <table class="table is-striped">
        <thead>
            <tr>
                <th v-for="(header, index) in tableHeaders" :key="`header-item-${index}`">
                    <strong>{{header}}</strong>
                    <a @click.prevent="sortAscending(header)" v-bind:class="{ 'has-text-warning' : activeSortMetric == headerToMetric[header] && activeSortOrder == 'ASC'}">▼</a>
                    <a @click.prevent="sortDescending(header)" v-bind:class="{ 'has-text-warning' : activeSortMetric == headerToMetric[header] && activeSortOrder == 'DESC' }">▲</a>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <deck-table-item v-on:toggleFoil="toggleFoil" v-on:addCard="addCard" v-on:removeCard="removeCard"  v-for="item in cardArray" :key="`deck-table-item-${item.id}`" :card="item"></deck-table-item>
        </tbody>
    </table>
  </div>
</template>

<script>
import DeckTableItem from './DeckTableItem.vue'
export default {
  props: ['list', 'cardArray'],
  components: {DeckTableItem},
  data: function data() {
    return {
      tableHeaders: ['Set', 'Name', 'Type', 'Price TCG Mid/Low', 'Foil'],
      headerToMetric: {
        Set: 'set_code',
        Name: 'name',
        Type: 'types',
        'Price TCG Mid/Low': 'tcg_mid',
        Foil: 'foil',
      },
    }
  },
  computed: {
    activeSortMetric: function () {
      return this.$parent.sortMetric
    },
    activeSortOrder: function () {
      return this.$parent.sortOrder
    },
  },
  events: {
    eventName: function (data) {
      alert('event')
    },
  },
  methods: {
    updateStatus: function () {
      this.$emit('updateStatus')
    },
    removeCard: function (itemid) {
      this.$emit('removeCard', itemid)
    },
    addCard: function (cardMid) {
      this.$emit('addCard', cardMid)
    },
    toggleFoil: function (iid, foil) {
      this.$emit('toggleFoil', iid, foil)
    },
    sortAscending: function (metric) {
      this.$parent.sortMetric = this.headerToMetric[metric]
      this.$parent.sortOrder = 'ASC'
    },
    sortDescending: function (metric) {
      this.$parent.sortMetric = this.headerToMetric[metric]
      this.$parent.sortOrder = 'DESC'
    },
  },
}
</script>

<style>
</style>