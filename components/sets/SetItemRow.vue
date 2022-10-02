<template>
  <tr class="setItemRow">
    <td>
        <span v-if="owned > 0" title="You own this card" style="color: white; -webkit-text-stroke: 1px #ccc;" class="fa fa-check-circle">
        {{owned}}
        </span>
        <span v-if="ownedfoil > 0" title="You own this card" style="color: yellow; -webkit-text-stroke: 1px gold;" class="fa fa-check-circle">
        {{ownedfoil}}
        </span>

    </td>
    <td class="itemTDView">


        <a v-if="this.$parent.userlevel >= 3" href="javascript:void(0)" class="button is-small is-pulled-right is-outlined wikiButton" @click="emitWiki()" >Wiki Edit</a>
        <a :href="item.echo_url" :title="`Open ${item.name} Page`">
            <img
                v-if="fullview == false"
                :data-src="item.image_cropped"
                src="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                :data-srcset="imageSrcSetBig"
                height="40px" class="lazy" style="height: 40px; float: left; margin-right: 4px;">

            <img
                v-if="fullview == true"
                :src="image"
                :data-src="item.image"
                :data-srcset="imageSrcSet"
                height="120px"  style="width: 120px; float: left; margin-right: 4px;">
        </a>

        <div @mouseenter="() => setShowItem(true, false)" @mouseleave="setShowItem(false, false)">
            <a  class="itemLinkWithInspector" @click="() => setShowItem(true, true)" :href="getItemURL()">
            {{item.name}} <span v-if="item.reserve_list == 1">[Reserved]</span>
            </a>
            <ItemInspector :item="item" v-if="showItem == true" :showFull="showFullItem"  />
        </div>

        {{item.types}}

        <br>
        <em v-html="this.$echomtg.replaceSymbols(item.mc)"></em>
        <div class="content padded" v-if="fullview" v-html="this.$echomtg.replaceSymbols(item.card_text)">

        </div>

    </td>
    <td >
        <span class="is-mobile">[{{item.collectors_number}}]</span>
        <span class="">{{item.rarity}}</span>
    </td>
    <td class="is-hidden-mobile">
        <span>{{item.collectors_number}}</span>
    </td>
    <td>
        <span v-if="item.price_change > 0" class="has-text-success">
            <i class="fa  fa-chevron-up "></i>
        </span>
        <span v-if="item.price_change < 0" class="has-text-danger">
            <i class="fa  fa-chevron-down "></i>
        </span>
        <span v-if="item.price_change != 0" class="has-text-weight-bold">{{item.price_change}}%</span>
    </td>
    <td class="is-flex-direction-column" v-if="hasRegularInSet">
        <div v-if="hasRegular">
            <span class="has-text-weight-bold">${{item.tcg_mid}}</span>
            <button class="button is-info is-small is-outlined " @click="inventoryQuickAdd(item.emid,0)">
                <span class="icon">
                    <i class="fa fa-plus"></i>
                </span>
            </button>
        </div>
    </td>
    <td class="is-flex-direction-column" v-if="hasFoilsInSet">
        <div v-if="hasFoil">
            <span  class="has-text-weight-bold has-text-warning">${{item.foil_price}}</span>
            <button class="button is-warning is-small is-outlined " @click="inventoryQuickAdd(item.emid,1)">
                <span class="icon">
                    <i class="fa fa-plus"></i>
                </span>
            </button>
        </div>
    </td>
  </tr>
</template>
<script>
import ItemInspector from '@/components/items/ItemInspector';

export default {
  name: 'SetItemRow',
  components: {ItemInspector},
  props: {
      item: {
          type: Object,
          default: function () {
              return { name: 'card name' }
          },
          required: true
      },
      owned: {
          type: Number,
          default: 0
      },
      ownedfoil: {
          type: Number,
          default: 0
      },
      fullview: {
          type: Boolean,
          default: false
      },
      hasFoilsInSet: {
        type: Boolean,
        default: true,
      },
      hasRegularInSet: {
        type: Boolean,
        default: true,
      }
  },

  computed: {
    image() {
        return `https://assets.echomtg.com/magic/cards/original/${this.item.emid}.jpg`
    },
    imageSrcSet() {
        return `${this.item.image_cropped} 1x`
    },
    imageSrcSetBig() {
        return `${this.image} 1x`
    },
    hasFoil() {
        return this.item.foil_price == null ? false : true;
    },
    hasRegular() {
        return this.item.tcg_mid == null ? false : true;
    },
  },
  data: function data() {
      return {
          title: 'Item',
          showItem: false,
          showFullItem: false,
      };
  },
  created () {
      //window.scrollTo(0, 1); // account for lazy load
  },

  methods: {
      inventoryQuickAdd: function(emid,foil=0) {
          this.$echomtg.inventoryQuickAdd(emid, foil)
      },
      setShowItem: function(showItem, showFullItem=false){
        this.showItem = showItem;
        this.showFullItem = showFullItem;

      },
      emitWiki: function (){
          this.$emit('emit-wiki',this.item);
      },
    getItemURL: function () {
        return this.showItem ? "javascript:void(0)" : this.item.echo_url;
      }
  }
}
</script>
