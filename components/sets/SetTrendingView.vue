<template>
   <div class="container padded">
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-header">
                <h3 class="card-header-title">
                  <span class="icon">
                    <i class="fa fa-arrow-circle-up has-text-success"></i>
                  </span>
                  <span>Streets of New Capenna Cards Gaining Value</span>
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
                  <span>Streets of New Capenna Cards Losing Value</span>
                </h3>
              </div>
              <div class="card-content">
                <ul class="numbered">
                  <li>
                    Ledger Shredder (Extended Art)<span class="pull-right"
                      ><em>-$5.05</em>
                      <span class="percentage red down">-18%</span> @
                      <strong>$28.06</strong></span
                    >
                  </li>
                  <li>
                    Ob Nixilis, the Adversary (Showcase)<span class="pull-right"
                      ><em>-$4.32</em>
                      <span class="percentage red down">-16%</span> @
                      <strong>$26.98</strong></span
                    >
                  </li>
                  <li>
                    Ledger Shredder<span class="pull-right"
                      ><em>-$4.14</em>
                      <span class="percentage red down">-17%</span> @
                      <strong>$24.34</strong></span
                    >
                  </li>
                  <li>
                    Ob Nixilis, the Adversary (Borderless)<span
                      class="pull-right"
                      ><em>-$2.72</em>
                      <span class="percentage red down">-11%</span> @
                      <strong>$24.72</strong></span
                    >
                  </li>
                  <li>
                    Ob Nixilis, the Adversary<span class="pull-right"
                      ><em>-$2.51</em>
                      <span class="percentage red down">-14%</span> @
                      <strong>$17.91</strong></span
                    >
                  </li>
                  <li>
                    Elspeth Resplendent (Showcase)<span class="pull-right"
                      ><em>-$2.40</em>
                      <span class="percentage red down">-30%</span> @
                      <strong>$8</strong></span
                    >
                  </li>
                  <li>
                    Urabrask, Heretic Praetor (Phyrexian)<span
                      class="pull-right"
                      ><em>-$2.03</em>
                      <span class="percentage red down">-15%</span> @
                      <strong>$13.55</strong></span
                    >
                  </li>
                  <li>
                    Vivien on the Hunt (Borderless)<span class="pull-right"
                      ><em>-$1.54</em>
                      <span class="percentage red down">-14%</span> @
                      <strong>$11.01</strong></span
                    >
                  </li>
                  <li>
                    Bootleggers' Stash<span class="pull-right"
                      ><em>-$1.52</em>
                      <span class="percentage red down">-8%</span> @
                      <strong>$19.05</strong></span
                    >
                  </li>
                  <li>
                    Luxior, Giada's Gift<span class="pull-right"
                      ><em>-$1.47</em>
                      <span class="percentage red down">-13%</span> @
                      <strong>$11.32</strong></span
                    >
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
      console.log('top trending computer', this.items)
      let sortedItems = [...this.items];
      if(!this.items[0]?.name) {
        return []
      }
      console.log('sorted items', sortedItems)
      return sortedItems.filter(item => item.tcg_mid > 1 && item.price_change > 3).sort((a,b) => b.price_change - a.price_change)
    }
  }
}
</script>
