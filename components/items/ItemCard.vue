<template>
  <div class="card has-background-light">
      <header class="card-header">
        <p class="card-header-title pb-1 ellipsis">
          <span :class="getSetIconClass(item.set_code)"></span>
          {{item.set}}
        </p>
        <a :href="item.card_url" class="button card-header-icon" aria-label="open card page">
            <b-icon icon="share" aria-hidden="true"></b-icon>
        </a>
      </header>

      <div class="card-image p-2">
        <figure class="image">
          <a :href="item.card_url">
            <img :src="item.image" :alt="`${item.name} from ${item.expansion}`">
          </a>
        </figure>
      </div>
      <nav class="level m-0 p-0">
          <div v-if="item.tcg_mid > 0" class="level-item">{{cs}}{{item.tcg_mid.toLocaleString("en-US")}}</div>
          <div v-if="item.foil_price > 0" class="level-item has-text-warning-dark">{{cs}}{{item.foil_price.toLocaleString("en-US")}}</div>
      </nav>
      <footer class="card-footer">
        <a v-if="item.tcg_mid > 0" :href="item.purchase_link" class="card-footer-item">Buy {{cs}}{{item.tcg_mid.toLocaleString("en-US")}}</a>
        <!-- <a v-if="item.foil_price > 0" :href="item.purchase_link" class="card-footer-item has-text-warning">Buy Foil {{cs}}{{item.foil_price.toLocaleString("en-US")}}</a> -->
        <a :href="item.card_url" class="card-footer-item">More Details</a>
      </footer>
    </div>
</template>
<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cs: '$',
    }
  },
  methods: {
    getSetIconClass(set_code){
      return this.$echomtg.setIconClass(set_code) + ' mr-1'
    },
    getRarityColor(rarity) {
      let color = 'is-warning'
      switch (rarity.toLowerCase()){
        case 'uncommon':
          color='is-grey';
          break;
        case 'common':
          color='is-white';
          break;
        case 'rare':
          color='is-warning';
          break;
        case 'mythic rare':
        case 'mythic':
          color='is-danger';
        break;
      }
      return color;
    },

  },

}
</script>
