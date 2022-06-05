<template>
  <div class="bg">
    <br>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total / Main / Side</p>
          <p class="title">{{totalCards}} / {{totalMainboard}} / {{totalSideboard}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">AVG CMC</p>
          <p class="title">{{avgCMC}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Land Ratio</p>
          <p class="title">1 in {{landToSpellRatio}} ({{landPercentage}}%)</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Foiled Out</p>
          <p class="title">{{foilPercentage}}%</p>
        </div>
      </div>
    </nav>
      <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Color Distribution</p>
          <pie-chart :chart-data="colorData" :extra-options="$parent.chartOptions" />
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Spell/Creature/Land</p>
          <pie-chart :chart-data="sclData" :extra-options="$parent.chartOptions" />
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Mana Curve</p>
          <bar-chart :chart-data="chartData" :extra-options="$parent.chartOptions" />
        </div>
      </div>
      
    </nav>
    
    <table class="table">
        <thead>
            <tr>
                <th>Mana Type</th><th>Cards with Symbol</th><th>Average CMC</th>    
            </tr>
        </thead>
        <tbody>
          <template v-for="(mana, index) in manaSymbols">
            <tr v-if="mana != ''" :key="`item-mana-${index}`">
                <td><span :class="'symbol ' + manaSymbolsShortCodes[mana]">{{manaSymbolsShortCodes[mana]}}</span> {{mana}}</td>
                <td>{{totalCardsOfColor(mana)}}</td>
                <td>{{avgCMCOfColor(mana)}}</td>
            </tr>
          </template>
        </tbody>
    </table>
</div>
</template>

<script>
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
export default {
  components: { BarChart, PieChart },
  props: ['list'],
  data: function data() {
    return {
      manaSymbolsShortCodes: {
        Black: 'b',
        Blue: 'u',
        White: 'w',
        Red: 'r',
        Green: 'g',
        Colorless: 'c',
      },
    }
  },
  methods: {
      totalCardsOfColor: function totalCardsOfColor(color){
          let total = 0
          let rx = new RegExp(color, 'i');

          for (let objectKey in this.list.card_list) {

              if(rx.test(this.list.card_list[objectKey].colors) && !/land/i.test(this.list.card_list[objectKey].types)) {
                  total++;
              }

          }
          return total
      },
        avgCMCOfColor: function avgCMCOfColor(color){
            let total = 0;
            let cmcTotal = 0

            let rx = new RegExp(color, 'i');

            for (let objectKey in this.list.card_list) {

                if(rx.test(this.list.card_list[objectKey].colors) && !/land/i.test(this.list.card_list[objectKey].types)) {
                    total++;
                    cmcTotal += parseInt(this.list.card_list[objectKey].cmc);
                }

            }
            return Number.parseFloat(cmcTotal / total).toFixed(2);
        }
    },
    computed: {
        // a computed getter
        avgCMC: function () {
            let cmcTotal = 0;
            let totalCardsCalculating = 0;
            for (let objectKey in this.list.card_list) {
                if(parseInt(this.list.card_list[objectKey].sideboard) == 0) {
                    if(!/land/i.test(this.list.card_list[objectKey].types)) {
                        cmcTotal += parseInt(this.list.card_list[objectKey].cmc);
                        totalCardsCalculating++;
                    }
                }
            }
           return Number.parseFloat(cmcTotal / totalCardsCalculating).toFixed(2);
        },
        totalCards: function () {
            let totalCards = 0
            for (let objectKey in this.list.card_list) {
                totalCards++
            }
            return totalCards
        },
        totalSideboard: function () {
            let totalSideboard = 0
            for (let objectKey in this.list.card_list) {
                totalSideboard += parseInt(this.list.card_list[objectKey].sideboard)
            }
            return totalSideboard
        },
        totalMainboard: function () {
            return this.totalCards - this.totalSideboard
        },
        foilPercentage: function () {
            let foils = 0
            for (let objectKey in this.list.card_list) {
                foils += parseInt(this.list.card_list[objectKey].foil)

            }
            return Number.parseFloat( (foils / this.totalCards) * 100).toFixed(2);
        },
        totalLands: function(){
            let lands = 0;
            for (let objectKey in this.list.card_list) {
                if(/land/i.test(this.list.card_list[objectKey].types)) {
                    lands++;
                }

            }
            return lands
        },
        landPercentage: function () {
            return Number.parseFloat( (this.totalLands / this.totalCards) * 100).toFixed(0);
        },
        landToSpellRatio: function(){
            return Number.parseFloat( 100 / this.landPercentage).toFixed(2);
        },
        manaSymbols: function() {
            return this.$parent.colorLabels
        },
        chartData(){
          return { datasets: this.$parent.curveDataset, labels:this.$parent.curveLabels }
        },
        colorData(){
          return { datasets: this.$parent.colorDataset, labels:this.$parent.colorLabels }
        },
        sclData(){
          return { datasets: this.$parent.sclDataset, labels:this.$parent.sclLabels }
        }
    }
}
</script>

<style>
</style>