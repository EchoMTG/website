<template>
   <div @mouseenter="() => setShowItem(true, false)" ref="container" @mouseleave="setShowItem(false, false)" class="is-relative">
      <a class="itemLinkWithInspector ellipsis" @click="() => setShowItem(true, true)"  :href="getItemURL()">
        <i v-if="showsetsymbol" :class="item.foil == 1 ? `${getSetIcon(item.set_code)} setsymbol rainbow-text` : `${getSetIcon(item.set_code)} setsymbol ${getSetIconColor(item.rarity)}`"></i>
        {{displayName}}
      </a>
      <b-tag v-if="item.reserve_list == 1">Reserved</b-tag>
      <ItemInspector :item="item" v-if="showItem == true" :showFull="showFullItem" :closeToBottom="closeToBottom" />
  </div>
</template>
<script>
import ItemInspector from '@/components/items/ItemInspector';

export default {
  name: 'ItemInspectorWrapper',
  components: {ItemInspector},
  data: function data() {
    return {
        showItem: false,
        showFullItem: false,
        closeToBottom: false
    }
  },
  props: {
    item: {
        type: Object,
        default: function () {
            return { name: 'card name' }
        },
        required: true
    },
    showsetsymbol: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    displayName () {
      if(this.name != '') return this.name;
      if(this.item.name != '') return this.name;
      if(this.item.card_name != '') return this.card_name;
      return this.item.name
    },

  },
  mounted () {
    this.isCloseToBottom()
  },
  methods: {
    isCloseToBottom () {
      if(this.$refs.container != null){
        let bound = this.$refs.container.getBoundingClientRect();
        this.closeToBottom = (window.innerHeight - bound.y) < 350 ? true : false;
      } else {
        this.closeToBottom = false
      }
    },
    getSetIcon(set_code){
          return this.$echomtg.setIconClass(set_code)
        },
      getSetIconColor(rarity){

        if(rarity.toLowerCase() == 'uncommon') return 'uncommon-symbol';
        if(rarity.toLowerCase() == 'rare') return 'gold-symbol';
        if(rarity.toLowerCase() == 'mythic rare' || rarity.toLowerCase() == 'mythic' || rarity.toLowerCase() == 'mythicrare') return 'mythic-symbol';
        return 'common-symbol'
      },
    setShowItem: function(showItem, showFullItem=false){
      this.isCloseToBottom()
      // double click open
      if(this.showItem && this.showFullItem && showItem && showFullItem){
        this.$router.push(this.item.card_url);
        return
      }

      // normal behavior
      let mobileWidthMax = 920;
      let browserWidth = window.innerWidth
      if(showItem && showFullItem && browserWidth < mobileWidthMax) {
         this.$router.push(this.item.card_url)
         return
      }
      this.showItem = showItem;
      this.showFullItem = showFullItem;



    },
    getItemURL: function () {
      return this.showItem ? "javascript:void(0)" : (this.item?.echo_url ? this.item?.echo_url.replace('https://www.echomtg.com','') : '') ;
    }
  }

}
</script>
