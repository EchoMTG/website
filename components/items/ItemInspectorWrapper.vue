<template>
   <div @mouseenter="() => setShowItem(true, false)" ref="container" @mouseleave="setShowItem(false, false)" style="position: relative">
      <a class="itemLinkWithInspector" @click="() => setShowItem(true, true)"  :href="getItemURL()">
      {{displayName}}
      </a>
      <b-tag type="is-info" v-if="item.reserve_list == 1">Reserved</b-tag>
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
    name: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    displayName () {
      if(this.name != '') return this.name;
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
        this.closeToBottom = (window.innerHeight - bound.y) < 300 ? true : false; 
      } else {
        this.closeToBottom = false
      }
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
      return this.showItem ? "javascript:void(0)" : this.item.echo_url;
    }
  }

}
</script>
