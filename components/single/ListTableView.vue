<template>

    <b-table
      striped
      :data="items"
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      :mobile-cards="false"
      :sort-multiple="true"
      sortable>
      <b-table-column sortable v-slot="props" field="name" label="Name">
        <item-inspector-wrapper :item="props.row" />
      </b-table-column>

      <b-table-column sortable v-slot="props" field="types" label="Type">
        {{props.row.types}}
      </b-table-column>
      <b-table-column sortable v-slot="props" field="set_code" label="Set">
        <set-tag :code="props.row.set_code" :name="props.row.expansion" :url="props.row?.echo_set_url ? props.row.echo_set_url :''"/>
      </b-table-column>
      <b-table-column sortable v-slot="props" field="tcg_mid" label="Price">
        <span v-if="props.row.foil == 0">{{quickstats.currency_symbol}}{{props.row.tcg_mid}} / {{quickstats.currency_symbol}}{{props.row.tcg_low}}</span>
        <span v-if="props.row.foil == 1">{{quickstats.currency_symbol}}{{props.row.foil_price}}</span>
      </b-table-column>
      <b-table-column sortable v-slot="props" field="foil" label="Foil">
        <b-button @click="toggleFoil(props.row.id,0)" v-if="props.row.foil == 1" size="is-small"  type="is-warning">FOIL</b-button>
        <b-button @click="toggleFoil(props.row.id,1)" v-if="props.row.foil == 0"  size="is-small" outlined>NORMAL</b-button>
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button @click="addToList(props.row.emid,props.row.foil)" size="is-small" icon-left="plus" hovered />
        <b-button @click="removeItemFromList(props.row.id)" size="is-small" icon-left="delete" hovered />
      </b-table-column>

    </b-table>

</template>

<script>
import { mapState } from 'vuex'
import DeckTableItem from './DeckTableItem.vue'
import SetTag from '@/components/magic/SetTag.vue';
import ItemInspectorWrapper from '../items/ItemInspectorWrapper.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    cardArray: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    list: {
      type: Object,
      required: true
    }
  },
  components: {
    DeckTableItem,
    ItemInspectorWrapper,
    SetTag
  },
  data: function data() {
    return {

      sortField: 'name',
      sortOrder: 'ASC',
      defaultSortOrder: 'ASC',
    }
  },
  computed: {
    ...mapState([
      'user',
      'authenticated',
      'quickstats',
    ])
  },
  methods: {
    async removeItemFromList(itemid) {
      const res = await this.$echomtg.removeFromList(itemid,this.list.id);
      this.$buefy.toast.open({
        message: `${res.message}`,
        type: 'is-danger'
      })
      this.callback()
    },
    async toggleFoil(itemid,foil){
      const res = await this.$echomtg.toggleListItemFoil(itemid,this.list.id,foil);
      this.$buefy.toast.open({
        message: `${res.message}`,
        type: 'is-warning'
      })
      this.callback()

    },
    async addToList(emid,foil){
      const res = await this.$echomtg.addToList(emid,this.list.id, foil)
      this.$buefy.toast.open({
        message: `${res.message}`,
        type: 'is-success'
      })
      this.callback()
    },
  },
}
</script>

<style>
</style>
