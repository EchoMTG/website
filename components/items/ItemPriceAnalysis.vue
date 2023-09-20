<template>
 <div class="card-content pt-3">
    <div class="columns">
      <div class="column is-half pt-0 pl-0 pb-0">
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Today</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{todayPrice}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Debut</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{debutPrice}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Lowest</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{lowestPrice}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Highest</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{highestPrice}}</span>
          </div>
        </nav>
      </div>
      <div class="column is-half pt-0 pl-0 pb-0">
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">7-Day Range</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{get7DayLow}} - {{cs}}{{get7DayHigh}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">52-Week Range</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{get52WeekLow}} - {{cs}}{{get52WeekHigh}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Median</span>
          </div>
          <div class="right-level">
            <span :class="priceColor">{{cs}}{{getMedianValue}}</span>
          </div>
        </nav>
        <nav class="level is-mobile mb-0">
          <div class="left-level">
            <span :class="priceColor">Average</span>
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
          foil: [0],
          regular: [0],
          date: [0]
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
    debutPrice() {
      for(let i=0; i < this.prices[this.type].length; i++){
        if(this.prices[this.type][i] > 0) return this.prices[this.type][i].toLocaleString("en-US");
      }
      return 'N/A'
    },
    highestPrice(){
      return this.prices[this.type].filter(p => p > 0).reduce((prev,curr)=> { return Math.max(prev,curr) }).toLocaleString("en-US")
    },
    lowestPrice(){
      return this.prices[this.type].filter(p => p > 0).reduce((prev,curr)=> { return Math.min(prev,curr) }).toLocaleString("en-US")
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
      if(prices.length == 0) return 'N/A';
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
      if(prices.length == 0) return 'N/A';
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
      if(prices.length == 0) return 'N/A';
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
      if(prices.length == 0) return 'N/A';
      return prices.reduce((prev,curr)=>  Math.max(prev,curr) ).toLocaleString("en-US")
    },
    todayPrice(){
      return this.prices[this.type][this.prices[this.type].length - 1]
    },
    getMedianValue() {
      let median = Math.ceil(this.prices[this.type].length / 2)
      return (this.prices[this.type][median]) ? this.prices[this.type][median].toLocaleString("en-US") : this.prices[this.type][0];
    },
    getAverageValue() {
      return (this.prices[this.type].reduce((a, b) => a + b) / this.prices[this.type].length).toLocaleString("en-US");
    }
  }


}
</script>
