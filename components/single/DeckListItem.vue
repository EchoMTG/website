<template>
  <div class="tags has-addons" v-if="(sideboard == 1 && cardInfo.side > 0) || (sideboard == 0 && cardInfo.main > 0) ">

      <span class="tag is-size-7 is-bold"  v-if="sideboard == 1">{{cardInfo.side}}</span>
      <span class="tag is-size-7 is-bold" v-else>{{cardInfo.main}}</span>
      <item-inspector-wrapper :classes="`tag color-strip ${card.colors.toLowerCase().replace(',','')}` " :item="card" />

      <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand == 0">
          <i class="fa fa-exclamation-triangle has-text-danger"></i>
      </a>
      <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand != 0 && cardInfo.missing != 0">
          <i class="fa fa-exclamation has-text-warning"></i>
      </a>
      <a class="tag is-size-7 is-dark" @click="openMissingInventory"  v-if="cardInfo.missing == 0">
          <i class="fa fa-check has-text-success"></i>
      </a>
      <span class="tag is-size-7 ">
          <a v-on:click.stop="addToList(card.emid,card.foil)"><span class="fa fa-plus-circle"></span></a>
          <a v-on:click.stop="removeItemFromList(card.id)"><span class="fa fa-minus-circle"></span></a>
      </span>
        <span class="tag is-size-7 is-dark">
          <a v-on:click.stop="moveToSideboard(card.id,sideboard)"><span class="fa fa-exchange fa-rotate-90"></span></a>
      </span>
  </div>

</template>

<script>
import ItemInspectorWrapper from '../items/ItemInspectorWrapper.vue';
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
        type: Boolean,
      },
      card: {
        type: Object,
        required: true
      },
      callback: {
        type: Function,
        required: true
      }
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
