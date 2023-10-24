<template>
  <div class="tags has-addons" v-if="(sideboard == 1 && cardInfo.side > 0) || (sideboard == 0 && cardInfo.main > 0) ">

      <span class="tag is-size-7 is-bold"  v-if="sideboard == 1">{{cardInfo.side}}</span>
      <span class="tag is-size-7 is-bold" v-else>{{cardInfo.main}}</span>
      <item-inspector-wrapper :classes="(isDarkModeActive == 1 ? 'is-dark' : '') + ` tag color-strip ${card.colors.toLowerCase().replace(',','')}` " :item="card" />
      <b-tooltip position="is-bottom" :label="cardInfo.missing == 0 ? `${cardInfo.on_hand} on hand` : `${cardInfo.on_hand} on hand, ${cardInfo.missing} missing`">
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand == 0">
            <b-icon icon="alert" type="is-danger" size="is-small" />
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand != 0 && cardInfo.missing != 0">
            <b-icon icon="alert" type="is-warning" size="is-small" />
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory"  v-if="cardInfo.missing == 0">
            <b-icon icon="check" type="is-success" size="is-small" />
        </a>
      </b-tooltip>
      <span class="tag is-size-7 ">
          <a v-on:click.stop="addToList(card.emid,card.foil)">

            <b-icon icon="plus-circle" size="is-small" />
          </a>
          <a v-on:click.stop="removeItemFromList(card.id)">
            <b-icon icon="minus-circle" size="is-small" />
          </a>
      </span>
        <span class="tag is-size-7 is-dark">
          <a v-on:click.stop="moveToSideboard(card.id,sideboard)">
            <b-icon icon="swap-horizontal" size="is-small" />
          </a>
      </span>
  </div>
</template>

<script>
import ItemInspectorWrapper from '../items/ItemInspectorWrapper.vue';
import { mapState } from 'vuex';

export default {
  components: { ItemInspectorWrapper },

    props: {
      cardInfo: {
        type: Object,
        required: true
      },
      listid: {
        type: Number,
        required: true
      },
      sideboard: {
        type: Number,
      },
      card: {
        type: Object,
        required: true
      },
      callback: {
        type: Function,
        required: true
      },
      iindex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapState(['isDarkModeActive'])
    },
    methods: {
      async removeItemFromList(itemid) {
        const res = await this.$echomtg.removeFromList(itemid,this.listid);
        this.$buefy.toast.open({
          message: `${res.message}`,
          type: 'is-danger'
        })
        this.callback()
      },
      async addToList(emid,foil){
        const res = await this.$echomtg.addToList(emid,this.listid, foil)
        this.$buefy.toast.open({
          message: `${res.message}`,
          type: 'is-success'
        })
        this.callback()
      },
      moveToSideboard: function (emid,sb){
          sb = (sb == 1) ? 0 : 1;
          this.$echomtg.toggleListItemSideboard(emid,this.listid,sb);
          this.callback()
      },
      openMissingInventory: function(){
          this.$parent.$parent.setCurrentTab('list-inventory-view');
      }
    },

}
</script>

<style>

</style>
