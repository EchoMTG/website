<template>
   <div @mouseenter="() => setShowItem(true, false)" @mouseleave="setShowItem(false, false)" style="position: relative">
      <a class="itemLinkWithInspector" @click="() => setShowItem(true, true)" :href="getItemURL()">
      {{item.name}}
      </a>
      <b-tag type="is-info" v-if="item.reserve_list == 1">Reserved</b-tag>
      <ItemInspector :item="item" v-if="showItem == true" :showFull="showFullItem"  />
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
  },
  methods: {
    setShowItem: function(showItem, showFullItem=false){
      this.showItem = showItem;
      this.showFullItem = showFullItem;
    },
    getItemURL: function () {
      return this.showItem ? "javascript:void(0)" : this.item.echo_url;
    }
  }

}
</script>
