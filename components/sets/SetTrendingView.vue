<template>
   <div class="padded">
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-header">
                <h3 class="card-header-title">
                  <span class="icon">
                    <i class="fa fa-arrow-circle-up has-text-success"></i>
                  </span>
                  <span>{{setName}} Cards Trending Up</span>
                </h3>
              </div>
              <div class="card-content">
                <ul class="numbered" v-if="this.items.length > 0">
                  <li v-for="item in topTrending()" :key="item.emid">
                    {{item.name}}
                    <span class="is-pulled-right">
                      <strong>$ {{item.tcg_mid}}</strong>


                      <span class="percentage green up">{{item.price_change}}%</span>
                      +
                      <em>{{getDifference(item.tcg_mid,item.price_change)}}</em>

                    </span>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <div class="card-header">
                <h3 class="card-header-title">
                  <span class="icon">
                    <i class="fa fa-arrow-circle-down has-text-danger"></i>
                  </span>
                  <span>{{setName}} Cards Trending Down</span>
                </h3>
              </div>
              <div class="card-content">
               <ul class="numbered" v-if="this.items.length > 0">
                  <li v-for="item in bottomTrending()" :key="item.emid">
                    {{item.name}}
                    <span class="is-pulled-right">
                      <strong>$ {{item.tcg_mid}}</strong>
                      <span class="percentage red down">{{item.price_change}}%</span>
                      +
                      <em>{{getDifference(item.tcg_mid,item.price_change)}}</em>

                    </span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


</template>
<script>

export default {
  name: 'SetTrendingView',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    setName: {
      type: String,
      default: ''
    }
  },
  created() {
    this.$echomtg.log('top trending items',this.items)
  },
  methods: {
    getDifference(price, change){
      return ( parseFloat(price) * (parseFloat(change) * .01)).toFixed(2)
    },
    topTrending() {
      let sortedItems = [...this.items];
      if(!this.items[0]?.name) {
        return []
      }
      return sortedItems.filter(item => item.tcg_mid > 1 && item.price_change >= 3).sort((a,b) => b.price_change - a.price_change)
    },
    bottomTrending() {
      let sortedItems = [...this.items];
      if(!this.items[0]?.name) {
        return []
      }
      return sortedItems.filter(item => item.tcg_mid > 1 && item.price_change <= -3).sort((a,b) => a.price_change - b.price_change)
    }
  }
}
</script>
