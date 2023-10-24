<template>
  <div class="card visual-deck-card is-relative" :style="`top:-` + (iindex * 240) + `px` " v-if="(sideboard == 1 && cardInfo.side > 0) || (sideboard == 0 && cardInfo.main > 0) ">
    <NuxtImg class="visual-deck-card-image" :src="card.image" width="100%" />

      <div class="deck-tag-count">
        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag has-text-weight-bold"  v-if="sideboard == 1">{{cardInfo.side}}X</span>
              <span class="tag has-text-weight-bold" v-else>
                {{cardInfo.main}}X
              </span>

                <a class="tag has-text-weight-bold has-background-black" @click="openMissingInventory" >
                  <b-tooltip position="is-left" :label="cardInfo.missing == 0 ? `${cardInfo.on_hand} on hand` : `${cardInfo.on_hand} on hand, ${cardInfo.missing} missing`">
                    <b-icon v-if="cardInfo.on_hand == 0" icon="alert" type="is-danger" size="is-small" />
                    <b-icon v-if="cardInfo.on_hand != 0 && cardInfo.missing != 0" icon="alert" type="is-warning" size="is-small" />
                    <b-icon v-if="cardInfo.missing == 0" icon="check" type="is-success" size="is-small" />
                  </b-tooltip>
                </a>

            </div>
          </div>
        </div>
      </div>
      <span class="controlButtons">
          <b-button size="is-small" type="is-success" icon-left="plus" v-on:click.stop="addToList(card.emid,card.foil)" />
          <b-button size="is-small" type="is-danger" icon-left="minus" v-on:click.stop="removeItemFromList(card.id)" />
          <b-button size="is-small" type="is-dark" icon-left="swap-horizontal" v-on:click.stop="moveToSideboard(card.id,sideboard)" />
      </span>
  </div>
</template>

<script>
import ItemInspectorWrapper from '../items/ItemInspectorWrapper.vue';
import { mapState } from 'vuex';

export default {
  components: { ItemInspectorWrapper },
  name: 'VisualDeckCard',
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
