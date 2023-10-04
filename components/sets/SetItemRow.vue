<template>
  <tr class="setItemRow">
    <td v-if="ownsAny">
        <span v-if="owned > 0" title="You own this card" style="color: white; -webkit-text-stroke: 1px #ccc;" class="mdi mdi-check-circle">
        {{owned}}
        </span>
        <span v-if="ownedfoil > 0" title="You own this card" style="color: yellow; -webkit-text-stroke: 1px gold;" class="mdi mdi-check-circle">
        {{ownedfoil}}
        </span>

    </td>
    <td class="itemTDView">


        <a v-if="this.$parent.userlevel >= 3" href="javascript:void(0)" class="button is-small is-pulled-right is-outlined wikiButton" @click="emitWiki()" >Wiki Edit</a>
        <a :href="item.echo_url.replace('https://www.echomtg.com','')" :title="`Open ${item.name} Page`">
            <b-image
                lazy
                v-if="fullview == false"
                :src="item.image_cropped"
                placeholder="https://assets.echomtg.com/magic/cards/cropped/placeholder.png"
                style="height: 50px; width:70px; float: left; margin-right: 4px;" />

            <img
                v-if="fullview == true"
                :src="image"
                :data-src="item.image"
                :data-srcset="imageSrcSet"
                height="120px"  style="width: 120px; float: left; margin-right: 4px;" />
        </a>

        <item-inspector-wrapper :item="item" />

        {{item.types}}

        <br>

        <div class="content padded" v-if="fullview" v-html="this.$echomtg.replaceSymbols(item.card_text)">

        </div>

    </td>
    <td >
        <span class="is-mobile">[{{item.collectors_number}}]</span>
        <em v-html="this.$echomtg.replaceSymbols(item.mc)"></em>
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
                <b-icon icon="plus" size="is-small" />
            </button>
        </div>
    </td>
    <td class="is-flex-direction-column" v-if="hasFoilsInSet">
        <div v-if="hasFoil">
            <span  class="has-text-weight-bold has-text-warning">${{item.foil_price}}</span>
            <button class="button is-warning is-small is-outlined " @click="inventoryQuickAdd(item.emid,1)">
                <b-icon icon="plus" size="is-small" />
            </button>
        </div>
    </td>
  </tr>
</template>
<script>

import ItemInspectorWrapper from '@/components/items/ItemInspectorWrapper.vue';

export default {
  name: 'SetItemRow',
  components: {ItemInspectorWrapper},
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
      ownsAny: {
        type: Boolean,
         default: false
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


  methods: {
      inventoryQuickAdd: function(emid,foil=0) {
          this.$echomtg.inventoryQuickAdd(emid, foil)
      },
      emitWiki: function (){
          this.$emit('emit-wiki',this.item);
      },
  }
}
</script>
