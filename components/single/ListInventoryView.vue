<template>
  <div>
    <div class="columns p-5">
        <div class="column is-half content">
          <h2 class="title">Completion Info</h2>
          <p><b-tag>{{percentageComplete}}% complete</b-tag> compared to your inventory which shows you have <b-tag>{{list.total_cards_on_hand}}</b-tag> of <b-tag>{{list.total_cards}}</b-tag> in you inventory.</p>
          <p><b-tag>{{cardsToComplete}}</b-tag> cards need to be collected to complete this list.</p>
        </div>
        <div class="column is-half content">
            <h2>Cost to Complete</h2>
            <p><b-tag>{{list.currency_symbol}}{{list.cost_to_finish_low}}-{{list.currency_symbol}}{{list.cost_to_finish}}</b-tag> is the estimated cost to complete this list.</p>
            <a :href="buyAllFromTCGplayer" target="_blank" class="button is-success">Buy Missing From TCGPlayer</a>
            <a :href="buyAllFromCardKingdom" target="_blank" class="button is-info">Buy Missing From CardKingdom</a>

        </div>
    </div>
    <div class="card">

        <p class="has-text-centered ">
          Cards Missing in your Inventory. Use + buttons to add to your inventory.
        </p>

      <div class="card-content" style="padding:0;">
            <table class="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <td v-for="(title, index) in tableHeaders" :key="`title-item-index-${index}`"><span>{{title}}</span></td>
                    </tr>
                </thead>
                <tbody>
                  <template v-for="(card, index) in list.card_list">
                    <tr :key="`card-item-${index}`" v-if="!card.on_hand">
                        <td><a :href="card.echo_url.replace('https://www.echomtg.com','')">{{card.name}}</a>[<a :href="card.echo_set_url">{{card.set_code}}</a>]</td>
                        <td v-if="card.tcg_low > 0">{{list.currency_symbol}}{{card.tcg_low}}-{{list.currency_symbol}}{{card.tcg_mid}}</td>
                        <td v-else class="is-size-7 is-light">N/A</td>
                        <td v-if="card.foil_price > 0">{{list.currency_symbol}}{{card.foil_price}}</td>
                        <td v-else> N/A</td>
                        <td>
                          <a v-bind:href="card.purchase_link" target="_blank" class="button has-icons-left is-small is-success">Buy</a>
                          <a v-if="card.tcg_mid > 0" @click="addToInventory(card.emid)" class="button has-icons-left is-small is-primary"><b-icon icon="plus" size="is-small" /><span>Add Regular</span></a>
                          <a v-if="card.foil_price > 0" @click="addToInventory(card.emid,1)" class="button has-icons-left is-small is-primary"><b-icon icon="plus" size="is-small" /></i><span>Add Foil</span></a>
                        </td>
                    </tr>
                  </template>
                </tbody>
            </table>
          </div>
          <footer class="card-footer">
            <!--<a href="#" class="card-footer-item">Print</a>-->
          </footer>
      </div>
  </div>
</template>

<script>

export default {
  props: ['list','callback'],
  data: function () {
    return {
      tableHeaders: ['Card Name', 'Price Range', 'Foil Cost', 'Actions'],
    }
  },
  methods: {
    async addToInventory(emid, foil = 0) {
      const res = await this.$echomtg.inventoryQuickAdd(emid,foil)
      this.$buefy.toast.open({
        message: `${res.message}`,
        type: 'is-success'
      })
      if(this.callback){
        this.callback()
      }
    },

    getUniqueObjArr: function () {
      let arr = {}
      for (let card in this.list.card_list) {
        let obj = this.list.card_list[card]

        if (obj.on_hand == false) {
          if (arr.hasOwnProperty(obj.name)) {
            arr[obj.name]++
          } else {
            arr[obj.name] = 1
          }
        }
      }

      return arr
    },
  },
  computed: {
    // a computed getter
    buyAllFromTCGplayer: function () {
      let baseURL = `http://store.tcgplayer.com/list/selectproductmagic.aspx?partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE&c=`
      let appendString = ''
      let uoa = this.getUniqueObjArr()
      for (let cardName in uoa) {
        appendString += `${uoa[cardName]} ${cardName}||`
      }
      // 1 Autumn's Veil||4 Chalice of the Void||
      return baseURL + appendString
    },
    buyAllFromCardKingdom: function () {
      //https://www.cardkingdom.com/builder?partner=mtggoldfish&amp;partner_args=deck,moldy-cheerios,1476470&amp;c=1 Autumn's Veil%0D%0A4 Chalice of the Void%0D%0A4 Crimson Kobolds%0D%0A4 Crookshank Kobolds%0D%0A4 Elvish Spirit Guide%0D%0A4 Glimpse of Nature%0D%0A4 Kobolds of Kher Keep%0D%0A4 Land Grant%0D%0A4 Lotus Petal%0D%0A4 Memnite%0D%0A4 Multani's Presence%0D%0A4 Ornithopter%0D%0A2 Overgrown Tomb%0D%0A4 Phyrexian Walker%0D%0A3 Shield Sphere%0D%0A1 Songs of the Damned%0D%0A4 Street Wraith%0D%0A1 Tendrils of Agony%0D%0A&amp;utm_campaign=MTGGAffiliate&amp;utm_medium=deck&amp;utm_source=MTGGoldfish
      let baseURL = `https://www.cardkingdom.com/builder?partner=echomtg&partner_args=deck&c=`
      let appendString = ''
      let uoa = this.getUniqueObjArr()
      for (let cardName in uoa) {
        var regex = /\(.*?\)/gi
        let cardNameCleaned = cardName.replace(regex, '')

        appendString += `${uoa[cardName]} ${cardNameCleaned}%0D%0A`
      }
      // 1 Autumn's Veil||4 Chalice of the Void||
      return baseURL + appendString
    },
    percentageComplete: function () {
      return parseFloat(
        (this.list.total_cards_on_hand / this.list.total_cards) * 100
      ).toFixed(2)
    },
    cardsToComplete: function () {
      return this.list.total_cards - this.list.total_cards_on_hand
    },
  },
}
</script>

<style>
</style>
