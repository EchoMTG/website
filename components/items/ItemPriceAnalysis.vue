<template>
 <div class="card-content">
            <div class="columns">
              <div class="column is-half pt-0 pl-0 pb-0">
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Today
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{todayPrice}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Debut
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{prices[this.type][0]}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Lowest
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{prices[this.type].reduce((prev,curr)=> { return Math.min(prev,curr) }).toLocaleString("en-US")}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Highest
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{prices[this.type].reduce((prev,curr)=> { return Math.max(prev,curr) })}}</span>
                  </div>
                </nav>
              </div>
              <div class="column is-half pt-0 pl-0 pb-0">
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    7-Day Range
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{get7DayLow}} - {{cs}}{{get7DayHigh}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    52-Week Range
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{get52WeekLow}} - {{cs}}{{get52WeekHigh}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Median
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{getMedianValue}}</span>
                  </div>
                </nav>
                <nav class="level is-mobile mb-0">
                  <div class="left-level">
                    Average
                  </div>
                  <div class="right-level">
                    <span :class="priceColor">{{cs}}{{getAverageValue}}</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>

</template>

<script>

export default {
  name: 'PriceAnalysis',

  props: {
    prices: {
      type: Object,
      default:function () {
        return {
          foil: [],
          regular: [],
          date: []
        }
      },
    },
    cs: {
      type: String,
      default: '$'
    },
    type: {
      type: String,
      default: 'regular'
    }
  },
  computed: {
    priceColor() {
      return this.type == 'regular' ? '' : 'has-text-warning-dark';
    },
    get7DayHigh(){

      let prices = [];
      const yearAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      this.prices.date.filter((day,index) =>  {
        let date = new Date(day);
        if(date > yearAgo){
          prices.push(this.prices[this.type][index])
        }
        return date > yearAgo
      });

      return prices.reduce((prev,curr)=>  Math.max(prev,curr) ).toLocaleString("en-US")
    },
    get7DayLow(){

      let prices = [];
      const yearAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      this.prices.date.filter((day,index) =>  {
        let date = new Date(day);
        if(date > yearAgo){
          prices.push(this.prices[this.type][index])
        }
        return date > yearAgo
      });

      return prices.reduce((prev,curr)=>  Math.min(prev,curr) ).toLocaleString("en-US")
    },
    get52WeekLow(){

      let prices = [];
      const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      this.prices.date.filter((day,index) =>  {
        let date = new Date(day);
        if(date > yearAgo){
          prices.push(this.prices[this.type][index])
        }
        return date > yearAgo
      });

      return prices.reduce((prev,curr)=>  Math.min(prev,curr) ).toLocaleString("en-US")
    },
    get52WeekHigh(){

      let prices = [];
      const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      this.prices.date.filter((day,index) =>  {
        let date = new Date(day);
        if(date > yearAgo){
          prices.push(this.prices[this.type][index])
        }
        return date > yearAgo
      });

      return prices.reduce((prev,curr)=>  Math.max(prev,curr) ).toLocaleString("en-US")
    },
    todayPrice(){
      return this.prices[this.type][this.prices.date.length - 1].toLocaleString("en-US")
    },
    getMedianValue() {
      let median = Math.ceil(this.prices[this.type].length / 2)
      return this.prices[this.type][median].toLocaleString("en-US");
    },
    getAverageValue() {
      return (this.prices[this.type].reduce((a, b) => a + b) / this.prices[this.type].length).toLocaleString("en-US");
    }
  }


}
</script>
