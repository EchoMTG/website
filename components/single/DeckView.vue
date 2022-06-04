<template>
  <div class="deck-view">
    <div class="columns">
        <div class="column">
            <div class="tabs is-toggle is-toggle-rounded is-small ">
              <ul class="deck-tabs ">
                <li>
                  <a href="javascript:void(0)" @click="changeOrder($event,'color')">
                    <span class="icon is-small"><i class="fa fa-tint"></i></span>
                    <span>Color</span>
                  </a>
                </li>
                <li class="is-active">
                  <a href="javascript:void(0)" @click="changeOrder($event,'type')">
                    <span class="icon is-small"><i class="fa fa-magic"></i></span>
                    <span>Spell Type</span>
                  </a>
                </li>
                <!-- <li class="sort-type">
                  <a @click="changeOrder($event, 'cost')">
                    <span class="icon is-small"><i class="fa fa-usd"></i></span>
                    <span>Mana Cost</span>
                  </a>
                </li> -->
              </ul>
            </div>
        </div>
    </div>
                
    <!-- order by type -->
    <template v-if="list.id">
      <div class="columns is-multiline" v-if="orderBy == 'type'">
        <template v-for="(sort, index) in typeArray">
          <div class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd" v-if="list[sort].total_main > 0" :key="`type-list-item-${index}`">
              <h2 class="title is-6">{{list[sort].scalar}} <span class="has-text-grey">({{list[sort].total_main}})</span> </h2>
              <ul>
                  <li 
                      is="deck-list-item" 
                      v-on:moveToSideboard="moveToSideboard" 
                      v-on:addCard="addCard" 
                      v-on:removeCard="removeCard"  
                      v-for="(cardInfo, index) in list[sort].grouped_list" 
                      :key="`type-list-${index}`"
                      v-bind:card="list.card_list[cardInfo.reference_id]"
                      v-bind:cardInfo="cardInfo" 
                      v-bind:sideboard="0" 
                      ></li>
              </ul>
          </div>
        </template>
      </div>
    </template>

    <!-- order by color -->
    <template v-if="list.id">
      <div class="columns is-multiline" v-if="orderBy == 'color'">
        <template v-for="(sort, index) in this.colorArray">
          <div class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd" v-if="list[sort].total_main > 0" :key="`color-list-item-${index}`">
              <!-- <deck-list-type-title :title="list[sort].scalar" :count="list[sort].total_main"></deck-list-type-title> -->
              <h2 class="title is-6">{{list[sort].scalar}} <span class="has-text-grey">({{list[sort].total_main}})</span> </h2>
              <ul>
                  <li 
                      is="deck-list-item" 
                      v-on:moveToSideboard="moveToSideboard" 
                      v-on:addCard="addCard" 
                      v-on:removeCard="removeCard"
                      v-for="(item, index) in list[sort].grouped_list" 
                      v-bind:card="list.card_list[item.reference_id]" 
                      v-bind:cardInfo="item"  
                      v-bind:sideboard="0"  
                      :key="`color-list-${index}`"
                      ></li>
                  <li>list {{index}} </li>
              </ul>
          </div>
        </template>
      </div>
    </template>
                
    <hr>
    <template v-if="list.id">
      <div class="columns">
          <div class="column" v-if="list.sideboard.total > 0">
              <div>
                  <deck-list-type-title :title="list.sideboard.scalar" :count="list.sideboard.total"></deck-list-type-title>
                  <ul>
                      <li is="deck-list-item" 
                      v-on:moveToSideboard="moveToSideboard" 
                      v-on:addCard="addCard" 
                      v-on:removeCard="removeCard"  
                      v-for="(item, index) in list.sideboard.grouped_list" 
                      v-bind:card="list.card_list[item.reference_id]" 
                      v-bind:cardInfo="item"
                      :key="`deck-list-item-${index}`"
                      v-bind:sideboard="1" ></li>
                  </ul>
              </div>
          </div>
      </div>
    </template>
  </div>
</template>

<script>
import DeckListItem from './DeckListItem.vue';
import DeckListTypeTitle from './DeckListTypeTitle.vue';
export default {
  name: 'deck-view',
  components: { DeckListItem, DeckListTypeTitle },
  props: ['list'],
  data: function data() {
    return {
      orderBy: 'type',
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