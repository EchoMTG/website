<template>
  <div class="">               
    <div class="columns">
      <div class="column">
          <div class="container">
                <br>
              <div class="control">
                
                  <a @click="getDrawList(7)" class="button ">Draw 7</a>
                  <a @click="getDrawList(6)" class="button ">Draw 6</a>
                  <a @click="getDrawList(5)" class="button ">Draw 5</a>
                  <a @click="getDrawList(4)" class="button ">Draw 4</a>
                  <a @click="getDrawList(3)" class="button ">Draw 3</a>
                  <a @click="getDrawList(2)" class="button ">Draw 2</a>
                  <a @click="getDrawList(1)" class="button ">Draw 1</a>
                
              </div>
          </div>
      </div>
      <div class="column">
      </div>
    </div>
    <div class="box">
        <div class="columns">
            <div class="column" v-for="(card, index) in drawList" :key="`card-item-index-${index}`">
                <div class="is-centered">
                    <img :src="card.image">
                    <div class="columns is-size-7">
                        <div class="column">{{card.probability}}</div>
                        <div class="column">{{card.emid}}</div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['list'],
  data: function () {
    return {
      probList: [],
      drawList: [],
      emptyCard: {
        image: 'https://assets.echomtg.com/magic/cards/magic-card-back.jpg',
        probability: '-',
        emid: 0,
        mid: 0,
      },
    }
  },
  methods: {
    buildList: function () {
      this.probList = []

      for (let objectKey in this.list.card_list) {
        if (this.list.card_list[objectKey].sideboard != 1) {
          this.probList.push({
            image: this.list.card_list[objectKey].image,
            probability: '',
            emid: this.list.card_list[objectKey].emid,
            mid: this.list.card_list[objectKey].mid,
          })
        }
      }
    },
    randomizeList: function randomizeList() {
      //Fisher-Yates (aka Knuth) Shuffle
      var currentIndex = this.probList.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = this.probList[currentIndex]
        this.probList[currentIndex] = this.probList[randomIndex]
        this.probList[randomIndex] = temporaryValue
      }
    },
    getDrawList: function getDrawList(num) {
      let i = 1
      let max = 7
      this.drawList = []
      this.randomizeList()
      let $this = this
      this.probList.forEach(function (card) {
        // blank out the left overs
        if (i > num) {
          while (i <= max) {
            $this.drawList.push($this.emptyCard)
            i++
          }
          return
        }
        $this.drawList.push(card)
        i++
      })
    },
  },
  created: function () {
    this.buildList()
    this.getDrawList(7)
  },
}
</script>

<style>
</style>