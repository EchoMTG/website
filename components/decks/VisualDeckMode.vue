<template>
  <div class="visual-deck-view is-relative">
    <b-modal v-model="inspectorModal" :width="`85%`" scroll="keep">
      <large-inspector-card
        :item="inspectorItem"
        :nextInspectorItem="nextInspectorItem"
        :priorInspectorItem="priorInspectorItem"
        />
    </b-modal>
    <div class="columns is-multiline ">
      <div class="column is-three-quarters pl-5">
        <h3 class="title is-size-6 mt-2 mb-2 has-text-weight-light">Main Deck ({{mainCount}})</h3>
        <div class="columns is-multiline is-gapless">
          <template v-for="row in cmcs">
            <div class="column" v-bind:key="`row-${row.cmc}${row.type}`" v-if="getCardsByManaCost(row.cmc,row.type).length > 0">
                <div
                  is="visual-deck-card"
                  v-on:moveToSideboard="moveToSideboard"
                  v-on:addCard="addCard"
                  v-on:removeCard="removeCard"
                  v-for="(item, index) in getCardsByManaCost(row.cmc,row.type)"
                  v-bind:card="list.card_list[item.reference_id]"
                  v-bind:cardInfo="item"
                  v-bind:listid="list.id"
                  v-bind:callback="callback"
                  :openInspector="openInspector"
                  v-bind:sideboard="0"
                  :iindex="index"
                  :key="`visual-deck-card-main-${row.cmc}${index}`"
                ></div>
            </div>
          </template>
          <div class="column">
            <div
                is="visual-deck-card"
                v-on:moveToSideboard="moveToSideboard"
                v-on:addCard="addCard"
                v-on:removeCard="removeCard"
                v-for="(item, index) in mainFiltersItemsLands"
                v-bind:card="list.card_list[item.reference_id]"
                v-bind:cardInfo="item"
                v-bind:listid="list.id"
                v-bind:callback="callback"
                :openInspector="openInspector"
                v-bind:sideboard="0"
                :iindex="index"
                :key="`visual-deck-card-main-${index}`"
                ></div>
          </div>
        </div>
      </div>
      <div :class="`column is-one-quarter pr-5 ` + (isDarkModeActive ? 'has-background-black' : 'has-background-grey-light')" >
        <h3 class="title is-size-6 mb-2 mt-2 has-text-weight-light">Sideboard ({{sidebarCount}})</h3>
          <div
            is="visual-deck-card"
            v-on:moveToSideboard="moveToSideboard"
            v-on:addCard="addCard"
            v-on:removeCard="removeCard"
            v-for="(item, index) in sideboardCards"
            v-bind:card="list.card_list[item.reference_id]"
            v-bind:cardInfo="item"
            v-bind:listid="list.id"
            v-bind:callback="callback"
            :openInspector="openInspector"
            :iindex="index"
            :key="`visual-deck-card-side-${index}`"
            v-bind:sideboard="1" ></div>
      </div>
    </div>
  </div>
</template>

<script>
import VisualDeckCard from './VisualDeckCard.vue';
import { mapState } from 'vuex';
import LargeInspectorCard from '../items/LargeInspectorCard.vue';

export default {
  name: 'visual-deck-mode',
  components: { VisualDeckCard, LargeInspectorCard },
  props: {

    list: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }

  },
  computed: {
    ...mapState([
      'isDarkModeActive'
    ]),
    mainCount(){
      let count = 0;
      for(let i = 0; i < this.mainFiltersItems.length; i++){
        count += parseInt(this.mainFiltersItems[i].main);
      }
      return count;
    },

    sidebarCount(){
      let count = 0;
      for(let i = 0; i < this.sideboardCards.length; i++){
        count += parseInt(this.sideboardCards[i].side);
      }
      return count;
    },
    sideboardCards(){
      if(this.list?.sideboard?.grouped_list){
        return Object.values(this.list.sideboard.grouped_list)
      } else {
        return []
      }
    },
    mainFiltersItems(){
      if(this.list?.main?.grouped_list){
        let mainItems = Object.values(this.list.main.grouped_list)
        for(let i = 0; i < mainItems.length; i++){
          mainItems[i].item = this.list.card_list[mainItems[i].reference_id];
        }
        return mainItems;
      } else {
        return [];
      }
    },
    mainFiltersItemsNonLands(){

      return this.mainFiltersItems.filter((row) => !row.item.main_type.toLowerCase().includes('land'))
    },
    mainFiltersItemsLands(){

      return this.mainFiltersItems.filter((row) => row.item.main_type.toLowerCase().includes('land'))
    }
  },
  data: function data() {
    return {
      orderBy: 'type',
      cmcs: [
        {
          cmc:2,
          type: 'lessthan'
        },
        {
          cmc:2,
          type: 'equals'
        },
         {
          cmc:3,
          type: 'equals'
        },
         {
          cmc:3,
          type: 'greaterthan'
        }

      ],
      inspectorModal: false,
      inspectorItem: {},
      orderByOptions: ['type', 'cmc', 'color'],
      orderByOptionsLabels: {
        type: 'Spell Type',
        cmc: 'Mana Cost',
        color: 'Casting Color',
      },
      typeArray: [
        'creatures',
        'planeswalkers',
        'artifacts',
        'instants',
        'sorceries',
        'enchantments',
        'lands',
        'tribals',
      ],
      typeMap: {
        creatures: 'Creature',
        planeswalkers: 'Planeswalker',
        artifacts: 'Artifact',
        instants: 'Instant',
        sorceries: 'Sorcery',
        enchantments: 'Enchantment',
        lands: 'Land',
        tribals: 'Tribal',
      },
      colorArray: [
        'multicolor',
        'black',
        'blue',
        'green',
        'red',
        'white',
        'colorless',
        'lands',
      ],
    }
  },
  methods: {
    openInspector(item){
      this.inspectorItem = item;
      this.inspectorModal = true;
    },
    nextInspectorItem(){
      const findPosition = (element) => element.id == this.inspectorItem.id;
      let position = this.list.items.findIndex(findPosition);
      if((position + 1) == this.list.items.length){
        position = 0
      } else {
        position = position + 1
      }
      this.inspectorItem = this.list.items[position]


    },
    priorInspectorItem(){
       const findPosition = (element) => element.id == this.inspectorItem.id;
      let position = this.list.items.findIndex(findPosition);
      if(position == 0){
        position = this.list.items.length - 1
      } else {
        position = position - 1
      }
      this.inspectorItem = this.list.items[position]

    },
    getCardsByManaCost(cmc=0,logic='equals'){
      if(logic == 'greaterthan'){
        return this.mainFiltersItemsNonLands.filter((item) => parseInt(item.item.cmc) > cmc)
      }
      if(logic == 'lessthan'){
        return this.mainFiltersItemsNonLands.filter((item) => parseInt(item.item.cmc) < cmc)
      }
      return this.mainFiltersItemsNonLands.filter((item) => parseInt(item.item.cmc) == cmc)
    },
    removeCard: function (itemid) {
      this.$emit('removeCard', itemid)
    },
    addCard: function (mid) {
      this.$emit('addCard', mid)
    },
    moveToSideboard: function (iid) {
      this.$emit('moveToSideboard', iid)
    },
    changeOrder(event, newOrder) {
      this.orderBy = newOrder

      document.querySelectorAll('ul.deck-tabs li').forEach((el) => {
        el.classList.remove('is-active')
      })

      event.target.parentElement.classList.add('is-active')
    },
  },
}
</script>

<style>
</style>
