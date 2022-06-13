
var api_url = (window.location.hostname == 'dev.echomtg.com') ? 'https://dev.echomtg.com/api/' : 'https://www.echomtg.com/api/';

Vue.component('deck-list-item', {
    props: ['card','sideboard','cardInfo'],
    template: `
    <div class="tags has-addons" v-if="(sideboard == 1 && cardInfo.side > 0) || (sideboard == 0 && cardInfo.main > 0) ">
    
        <span class="tag is-size-7 is-bold"  v-if="sideboard == 1">{{cardInfo.side}}</span>
        <span class="tag is-size-7 is-bold" v-else>{{cardInfo.main}}</span> 
        
        <a 
            v-bind:class="'tag is-dark is-size-7 color-strip list-item ' + card.colors.toLowerCase().replace(',','')" 
            :title="card.name" 
            :href="card.echo_url"
            :data-tcg-mid="card.tcg_mid" 
            :data-foil-price="card.foil_price" 
            :data-image="'https://assets.echomtg.com/magic/cards/original/'+card.emid+'.jpg'">
            {{card.name}} 
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand == 0">
            <i class="fa fa-exclamation-triangle has-text-danger"></i>
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory" v-if="cardInfo.on_hand != 0 && cardInfo.missing != 0">
            <i class="fa fa-exclamation has-text-warning"></i>
        </a>
        <a class="tag is-size-7 is-dark" @click="openMissingInventory"  v-if="cardInfo.missing == 0">
            <i class="fa fa-check has-text-success"></i>
        </a>
        <span class="tag is-size-7 ">
            <a v-on:click.stop="addCard(card.mid,sideboard)"><span class="fa fa-plus-circle"></span></a> 
            <a v-on:click.stop="removeCard(card.mid,sideboard)"><span class="fa fa-minus-circle"></span></a>
        </span>
         <span class="tag is-size-7 is-dark">
            <a v-on:click.stop="moveToSideboard(card.mid,sideboard)"><span class="fa fa-exchange fa-rotate-90"></span></a>
        </span>
   </div>`,
    methods: {
        removeCard: function (cardMid,sb){
            this.$parent.$parent.removeCardByMID(cardMid,sb);

        },
        addCard: function (cardMid, sideboard){
            //this.$emit('addCard',cardMid);
            this.$parent.$parent.addCard(cardMid,sideboard);
        },
        moveToSideboard: function (cardMid,sb){
            sb = (sb == 1) ? 0 : 1;
            this.$parent.$parent.moveToSideboard(cardMid,sb);
        },
        openMissingInventory: function(){
            this.$parent.$parent.setCurrentTab('list-inventory-view');
        }
    }
});
Vue.component('deck-table-item', {
    props: ['card'],
    template: `
    <tr class="">
       <td>
        <a :href="card.echo_set_url"><img width="18px" :src="card.set_image" :alt="card.set_code"></a>
         [<a :href="card.echo_set_url">{{card.set_code}}</a>]
       </td>
       <td>
       <strong class="list-item list-item-clean" style="width: 200px" :title="card.name" :data-tcg-mid="card.tcg_mid" :data-foil-price="card.foil_price" :data-image="'https://assets.echomtg.com/magic/cards/original/'+card.emid+'.jpg'">
        <a :href="card.echo_url">{{card.name}}</a>
       </strong> 
      </td> 
       <td>{{card.types}}</td> 
       <td v-if="card.foil == 0">{{this.$parent.list.currency_symbol}}{{card.tcg_mid}} / {{this.$parent.list.currency_symbol}}{{card.tcg_low}}</td>
       <td v-else>{{this.$parent.list.currency_symbol}}{{card.foil_price}}</td>
       <td class="is-hoverable">
       <a @click="toggleFoil" v-if="card.foil == 1" class="tag is-warning">Foil</a>
       <a @click="toggleFoil" v-if="card.foil == 0" class="tag is-gray">Normal</a>
       </td> 
       <td><button @click="addCard" class="button is-dark is-small"><i class="fa fa-plus"></i></button> <button @click="removeCard" class="button is-danger is-text is-small"><i class="fa fa-trash"></i></button></td> 
   </tr>`,
    methods: {
        removeCard: function() {
            this.$emit('removeCard', this.card.id)
        },
        addCard: function (cardMid){
            this.$emit('addCard',this.card.mid);
        },
        toggleFoil: function (){

            let foil = (this.card.foil == 1) ? 0 : 1;
            this.$emit('toggleFoil',this.card.id, foil);
        }
    }
});

Vue.component('deck-list-type-title', {
    props: ['title','count'],
    template: `<h2 class="title is-6">{{title}} <span class="has-text-grey">({{count}})</span> </h2>`
});

Vue.component('list-table-view', {
    props: ['list','cardArray'],
    template: `
        <div class="">
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th v-for="header in tableHeaders">
                            <strong>{{header}}</strong>
                            <a @click.prevent="sortAscending(header)" v-bind:class="{ 'has-text-warning' : activeSortMetric == headerToMetric[header] && activeSortOrder == 'ASC'}">▼</a>
                            <a @click.prevent="sortDescending(header)" v-bind:class="{ 'has-text-warning' : activeSortMetric == headerToMetric[header] && activeSortOrder == 'DESC' }">▲</a>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <deck-table-item v-on:toggleFoil="toggleFoil" v-on:addCard="addCard" v-on:removeCard="removeCard"  v-for="item in cardArray" :key="item.id" v-bind:card="item"></deck-table-item>
                </tbody>
            </table>
        </div>`,
    data: function data() {

        return {
            tableHeaders: ['Set', 'Name', 'Type', 'Price TCG Mid/Low', 'Foil'],
            headerToMetric: {
                'Set': 'set_code',
                'Name': 'name',
                'Type': 'types',
                'Price TCG Mid/Low': 'tcg_mid',
                'Foil': 'foil'
            }

        }
    },
    computed: {
        activeSortMetric: function (){
            return this.$parent.sortMetric;
        },
        activeSortOrder: function (){
            return this.$parent.sortOrder;
        }
    },
    events: {
        eventName: function(data) {
           alert('event');
        }
    },
    methods: {
        updateStatus: function(){
            this.$emit("updateStatus");
        },
        removeCard: function (itemid){
            this.$emit('removeCard',itemid);
        },
        addCard: function (cardMid){
            this.$emit('addCard',cardMid);
        },
        toggleFoil: function (iid, foil){
            this.$emit('toggleFoil',iid,foil);
        },
        sortAscending: function(metric){

            this.$parent.sortMetric = this.headerToMetric[metric];
            this.$parent.sortOrder = 'ASC';
        },
        sortDescending: function(metric){

            this.$parent.sortMetric = this.headerToMetric[metric];
            this.$parent.sortOrder = 'DESC';
        }
    },
});

Vue.component('list-inventory-view', {
    props: ['list'],
    data: function() {
        return {
            tableHeaders: ['Card Name','Price Range','Foil Cost', 'Actions']
        }
    },
    methods: {
      addToInventory: function(mid, foil = 0){

          let $this = this;
          let endpoint = api_url + 'inventory/add/';
          let bodyFormData = new FormData();
          bodyFormData.set('mid', mid);
          if(foil != 0){
              bodyFormData.set('foil', 1);
          }

          axios({
              method: 'post',
              url: endpoint,
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          }).then(function(response){

              $this.$parent.updateStatus();
              createGrowl(' Added to Inventory public ');

          });
      },

        getUniqueObjArr: function(){
            let arr = {};
            for (let card in this.list.card_list) {
                let obj = this.list.card_list[card];

                if (obj.on_hand == false) {
                    if (arr.hasOwnProperty(obj.name)) {
                        arr[obj.name]++;
                    } else {
                        arr[obj.name] = 1;
                    }
                }


            }

            return arr;
        }
    },
    computed: {
        // a computed getter
        buyAllFromTCGplayer: function () {
            let baseURL = `http://store.tcgplayer.com/list/selectproductmagic.aspx?partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE&c=`;
            let appendString = '';
            let uoa = this.getUniqueObjArr();
            for(let cardName in uoa) {
                appendString += `${uoa[cardName]} ${cardName}||`;
            }
            // 1 Autumn's Veil||4 Chalice of the Void||
            return baseURL+appendString;
        },
        buyAllFromCardKingdom: function() {
            //https://www.cardkingdom.com/builder?partner=mtggoldfish&amp;partner_args=deck,moldy-cheerios,1476470&amp;c=1 Autumn's Veil%0D%0A4 Chalice of the Void%0D%0A4 Crimson Kobolds%0D%0A4 Crookshank Kobolds%0D%0A4 Elvish Spirit Guide%0D%0A4 Glimpse of Nature%0D%0A4 Kobolds of Kher Keep%0D%0A4 Land Grant%0D%0A4 Lotus Petal%0D%0A4 Memnite%0D%0A4 Multani's Presence%0D%0A4 Ornithopter%0D%0A2 Overgrown Tomb%0D%0A4 Phyrexian Walker%0D%0A3 Shield Sphere%0D%0A1 Songs of the Damned%0D%0A4 Street Wraith%0D%0A1 Tendrils of Agony%0D%0A&amp;utm_campaign=MTGGAffiliate&amp;utm_medium=deck&amp;utm_source=MTGGoldfish
            let baseURL = `https://www.cardkingdom.com/builder?partner=echomtg&partner_args=deck&c=`
            let appendString = '';
            let uoa = this.getUniqueObjArr();
            for(let cardName in uoa) {
                var regex = /\(.*?\)/gi;
                let cardNameCleaned = cardName.replace(regex,'');

                appendString += `${uoa[cardName]} ${cardNameCleaned}%0D%0A`;
            }
            // 1 Autumn's Veil||4 Chalice of the Void||
            return baseURL+appendString;
        },
        percentageComplete: function(){
            return parseFloat(this.list.total_cards_on_hand / this.list.total_cards * 100).toFixed(2);
        },
        cardsToComplete: function(){
            return this.list.total_cards - this.list.total_cards_on_hand
        }
    },
    template: `<div>
                <div class="columns">
                    <div class="column is-half content">
                      <h2 class="title">Completion Info</h2>
                      <p><strong class="tag">{{percentageComplete}}% complete</strong> compared to your inventory which shows you have <strong>{{list.total_cards_on_hand}}</strong> of <strong>{{list.total_cards}}</strong> in you inventory.</p>
                      <p><strong class="tag">{{cardsToComplete}}</strong> cards need to be collected to complete this list.</p> 
                    </div>
                    <div class="column is-half content">
                        <h2>Cost to Complete</h2>
                        <p><strong class="tag">{{list.currency_symbol}}{{list.cost_to_finish_low}}-{{list.currency_symbol}}{{list.cost_to_finish}}</strong> is the estimated cost to complete this list.</p>
                        <a :href="buyAllFromTCGplayer" target="_blank" class="button is-success">Buy Missing From TCGPlayer</a>
                        <a :href="buyAllFromCardKingdom" target="_blank" class="button is-info">Buy Missing From CardKingdom</a>
                        
                    </div>
                </div>
                <div class="card" style="margin-top: 20px;">
                  <header class="card-header">
                    <p class="card-header-title">
                      Cards Missing in your Inventory. Use + buttons to add to your inventory.
                    </p>
                  </header>
                  <div class="card-content" style="padding:0">
                        <table class="table is-striped">
                            <thead>
                                <tr>
                                    <td v-for="title in tableHeaders">
                                        <span>{{title}}</span>
                                    </td>
                                </tr>                        
                            </thead>
                            <tbody>
                                <tr v-for="card in list.card_list" v-if="card.on_hand == false">
                                    <td>
                                    <a :href="card.echo_url">{{card.name}}</a>
                                    [<a :href="card.echo_set_url">{{card.set_code}}</a>]</td>
                                    <td v-if="card.tcg_low > 0">
                                        {{list.currency_symbol}}{{card.tcg_low}}-{{list.currency_symbol}}{{card.tcg_mid}}
                                       
                                    </td>
                                    <td v-else class="is-size-7 is-light">N/A</td>
                                    
                                    <td v-if="card.foil_price > 0">
                                    {{list.currency_symbol}}{{card.foil_price}}
                                    </td>
                                    <td v-else> N/A</td>
                                    <td>
                                     <a v-bind:href="card.purchase_link" target="_blank" class="button has-icons-left is-small is-success">
                                            Buy
                                        </a>
                                        <a v-if="card.tcg_mid > 0" @click="addToInventory(card.mid)" class="button has-icons-left is-small is-primary">
                                            <i class="fa fa-plus icon"></i>
                                            <span>
                                                Add Regular
                                            </span>
                                        </a>
                                          <a v-if="card.foil_price > 0" @click="addToInventory(card.mid,1)" class="button has-icons-left is-small is-primary">
                                            <i class="fa fa-plus icon"></i>
                                            <span>
                                                Add Foil
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                      <footer class="card-footer">
                        <!--<a href="#" class="card-footer-item">Print</a>-->
                      </footer>
                  </div>
                </div>
                
            </div>`
});

Vue.component('meta-view', {
    props: ['list'],
    template: `
<div class="columns">
                     <div class="column">
                          <div class="container">
    <h1 class="title">{{list.name}}</h1>
    
   <div class="content">
   {{list.description}}
</div>
</div>
</div>
   

</div>`
});

Vue.component('list-sell-view', {
    props: ['list'],
    computed: {
        totalSellableValue: function(){
            let buyTotal = 0
            for (let objectKey in this.list.card_list) {
                if(parseFloat(this.list.card_list[objectKey].ck_buy) > 0) {

                    buyTotal += parseFloat(this.list.card_list[objectKey].ck_buy);

                }
            }
            return buyTotal;
        }
    },
    template: `
<div class="">
    <h1>Sell cards in this list now.</h1>
    
     <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total Sellable Value</p>
          <p class="title">{{list.currency_symbol}}{{totalSellableValue}}</p>
        </div>
      </div>
      
    </nav>
    <table class="table">
        <tr v-for="card in list.card_list" v-if="card.ck_buy > 0">
            <td>{{card.name}} [{{card.set_code}}]</td>
            <td>{{list.currency_symbol}}{{card.ck_buy}}</td>
        </tr>
    </table>

</div>`
});

Vue.component('probability-card', {
   props: ['probCard'],
   template: `
        <div class="is-centered">
            <img :src="probCard.image">
            <div class="columns is-size-7">
                <div class="column">{{probCard.probability}}</div>
                <div class="column">{{probCard.emid}}</div>
            </div>
            
        </div>
   `
});

Vue.component('list-probabilities-view', {
    props: ['list'],
    data: function(){
        return {
            probList: [],
            drawList: [],
            emptyCard: {
                'image': 'https://assets.echomtg.com/magic/cards/magic-card-back.jpg',
                'probability': '-',
                'emid': 0,
                'mid': 0
            }
        }
    },
    methods: {
        buildList: function(){
          this.probList = [];

          for (let objectKey in this.list.card_list) {
              if (this.list.card_list[objectKey].sideboard != 1) {
                  this.probList.push( {
                      'image': this.list.card_list[objectKey].image,
                      'probability': '',
                      'emid': this.list.card_list[objectKey].emid,
                      'mid': this.list.card_list[objectKey].mid
                  });
              }
          }

        },
        randomizeList: function randomizeList() {

            //Fisher-Yates (aka Knuth) Shuffle
            var currentIndex = this.probList.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this.probList[currentIndex];
                this.probList[currentIndex] = this.probList[randomIndex];
                this.probList[randomIndex] = temporaryValue;
            }

        },
        getDrawList: function getDrawList(num) {
            let i = 1;
            let max = 7;
            this.drawList = [];
            this.randomizeList();
            let $this = this;
            this.probList.forEach(function(card) {
                // blank out the left overs
                if(i > num) {

                    while(i <= max) {
                        $this.drawList.push($this.emptyCard);
                        i++;
                    }
                    return;
                }
                $this.drawList.push(card);
                i++;
            });

        }

    },
    created: function(){
        this.buildList();
        this.getDrawList(7);

    },
    template: `<div class="">
                   
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
                            <div class="column" v-for="card in drawList">
                                <probability-card v-bind:probCard="card"></probability-card>
                            </div>
                        </div>
                    </div>

                </div>`
});

Vue.component('deck-statistics-view', {
    props: ['list'],
    data: function data() {
        return {
            manaSymbolsShortCodes: {
                'Black': 'b',
                'Blue': 'u',
                'White': 'w',
                'Red': 'r',
                'Green': 'g',
                'Colorless': 'c',
            }
        }
    },
    template: `<div class="bg">
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
                      <chartjs-pie :beginatzero="false" :labels="this.$parent.colorLabels" :datasets="this.$parent.colorDataset" :bind="true"></chartjs-pie>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Spell/Creature/Land</p>
                      <chartjs-pie :beginatzero="false"  :labels="this.$parent.sclLabels" :datasets="this.$parent.sclDataset" :bind="true"></chartjs-pie>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Mana Curve</p>
                      <chartjs-bar :labels="this.$parent.curveLabels" :datasets="this.$parent.curveDataset" :bind="true"></chartjs-bar>
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
                        <tr v-for="mana in manaSymbols" v-if="mana != ''">
                            <td><span :class="'symbol ' + manaSymbolsShortCodes[mana]">{{manaSymbolsShortCodes[mana]}}</span> {{mana}}</td>
                            <td>{{totalCardsOfColor(mana)}}</td>
                             <td>{{avgCMCOfColor(mana)}}</td>
                        
                        </tr>
                    </tbody>
                </table>
            </div>`,
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
        }
    }
});


Vue.component('deck-view', {
    props: ['list'],
    data: function data() {

        return {
            orderBy: "type",
            orderByOptions: ['type','cmc','color'],
            orderByOptionsLabels: {
                'type':'Spell Type',
                'cmc':'Mana Cost',
                'color':'Casting Color'
            },
            typeArray: ['creatures','planeswalkers','artifacts','instants','sorceries','enchantments','lands','tribals'],
            typeMap: {
                'creatures': 'Creature',
                'planeswalkers': 'Planeswalker',
                'artifacts' : 'Artifact',
                'instants': 'Instant',
                'sorceries': 'Sorcery',
                'enchantments' : 'Enchantment',
                'lands': 'Land',
                'tribals' : 'Tribal'
            },
            colorArray: ['multicolor','black','blue','green','red','white','colorless','lands']
        }
    },
    methods: {
        removeCard: function(itemid){

            this.$emit('removeCard', itemid);
        },
        addCard: function(mid){

            this.$emit('addCard', mid);
        },
        moveToSideboard: function(iid){

            this.$emit('moveToSideboard', iid);
        },
        changeOrder(event, newOrder){
          this.orderBy = newOrder;

            document.querySelectorAll('ul.deck-tabs li').forEach(el => {
                el.classList.remove('is-active');
            });

            event.target.parentElement.classList.add('is-active');
        }

    },
    template: `<div class="deck-view">
                <div class="columns">
                    <div class="column">
                        <div class="tabs is-toggle is-toggle-rounded is-small ">
                          <ul class="deck-tabs ">
                            <li>
                              <a href="javascript:void(0)" @click="changeOrder($event,'color')">
                                <span class="icon is-small"><i class="fa fa-tint"></i></span>
                                <span>Color</span>
                              </a>
                            </li>
                            <li class="is-active">
                              <a href="javascript:void(0)" @click="changeOrder($event,'type')">
                                <span class="icon is-small"><i class="fa fa-magic"></i></span>
                                <span>Spell Type</span>
                              </a>
                            </li>
                            <!--<li class="sort-type">-->
                              <!--<a @click="changeOrder('cost')">-->
                                <!--<span class="icon is-small"><i class="fa fa-usd"></i></span>-->
                                <!--<span>Mana Cost</span>-->
                              <!--</a>-->
                            <!--</li>-->
                          </ul>
                        </div>
                    </div>
                </div>
                
                <!-- order by type -->
                <div class="columns is-multiline" v-if="orderBy == 'type'">
                    <div class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd" v-for="sort in this.typeArray" v-if="list[sort].total_main > 0">
                        <deck-list-type-title :title="list[sort].scalar" :count="list[sort].total_main"></deck-list-type-title>
                        <ul>
                            <li 
                                    is="deck-list-item" 
                                v-on:moveToSideboard="moveToSideboard" 
                                v-on:addCard="addCard" 
                                v-on:removeCard="removeCard"  
                                v-for="cardInfo in list[sort].grouped_list" 
                                v-bind:card="list.card_list[cardInfo.reference_id]"
                                v-bind:cardInfo="cardInfo" 
                                v-bind:sideboard="0" 
                                ></li>
                        </ul>
                    </div>
                </div>
                <!-- order by color -->
                <div class="columns is-multiline" v-if="orderBy == 'color'">
                    <div class="column is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd" v-for="sort in this.colorArray" v-if="list[sort].total_main > 0">
                        <deck-list-type-title :title="list[sort].scalar" :count="list[sort].total_main"></deck-list-type-title>
                        <ul>
                            <li 
                                is="deck-list-item" 
                                v-on:moveToSideboard="moveToSideboard" 
                                v-on:addCard="addCard" 
                                v-on:removeCard="removeCard"  
                                v-for="(item, index) in list[sort].grouped_list" 
                                v-bind:card="list.card_list[item.reference_id]" 
                                v-bind:cardInfo="item"  
                                v-bind:sideboard="0"  
                                ></li>
                                
                        </ul>
                    </div>
                </div>
                
                <hr>
                <div class="columns">
                    <div class="column" v-if="list.sideboard.total > 0">
                        <div>
                            <deck-list-type-title :title="list.sideboard.scalar" :count="list.sideboard.total"></deck-list-type-title>
                            <ul>
                                <li is="deck-list-item" 
                                v-on:moveToSideboard="moveToSideboard" 
                                v-on:addCard="addCard" 
                                v-on:removeCard="removeCard"  
                                v-for="(item, index) in list.sideboard.grouped_list" 
                                v-bind:card="list.card_list[item.reference_id]" 
                                v-bind:cardInfo="item"  
                                v-bind:sideboard="1" ></li>
                            </ul>
                        </div>
                    </div>
                </div>
           </div>`
});

Vue.component('list-summary', {
    props: ['list'],
    template: ` 
            <div class="list-summary">
                <div class="content">
                 
                    <h1 class="is-title"><strong class="has-text-white">{{list.name}}</strong>  <small class="is-size-5 has-text-grey"> ({{list.total_cards_on_hand}} of {{list.total_cards}} in inventory)</small></h1>
                    <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                            <span class="tags has-addons">
                                <span class="tag">Total</span>
                                <span class="tag is-dark">{{list.total_cards}}</span>
                            </span> 
                         </div>
                         <div class="control">
                            <span class="tags has-addons">
                                <span class="tag">Main</span> 
                                <span class="tag is-dark" v-if="list.hasOwnProperty('sideboard')">{{list.total_cards - list.sideboard.total}}</span>
                                <span class="tag is-dark" v-else>{{list.total_cards}}</span>
                            </span>
                         </div>
                        <div class="control">
                            <span class="tags has-addons" v-if="list.hasOwnProperty('sideboard')">
                                <span class="tag">Sideboard</span> 
                                <span class="tag is-dark" >{{list.sideboard.total}}</span>
                            </span>
                         </div> 
                         <div class="control">
                            <span class="tags has-addons">
                                <span class="tag">Est. Value</span> 
                                <span class="tag is-dark"><strong class="has-text-white">{{list.currency_symbol}}{{list.current_low_value}}</strong> - <strong class="has-text-white">{{list.currency_symbol}}{{list.current_value}}</strong></span>
                            </span>
                         </div>    
                          <div class="control">
                            <span class="tags has-addons">
                                <span class="tag">Created On</span> 
                                <span class="tag is-dark">
                                    <strong class="has-text-white"><time :datetime="list.date_created">{{list.date_created}}</time></strong>
                                </span>
                            </span>
                         </div>                          
                    </div>
                     
                    
                  </div>
                  
            </div>`
});

Vue.component('card-adder',{
    template: `
        <div>
            <div class="card search is-shady" @mouseover="openSearchResults" @mouseout="closeSearchResults" >
              <header class="card-header">
                    <p class="card-header-title">
                       <span class="icon">
                        <i class="fa fa-search-plus"></i>
                        </span>
                        <span>Add a Card by Searching</span>
                        
                    </p>
                    <div class="card-header-icon">
                      <span class="icon">
                        <i class="fa fa-caret-down"></i>
                        <i class="fa fa-caret-left is-hidden" ></i>
                      </span>
                    </div>
                    
              </header>
              <div class="card-content" >
                
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-small is-dark">
                        Name
                      </a>
                    </p>
                    <p  ref="searchBox" class="control is-expanded">
                      <input v-model="nameSearch" class="input is-small" type="text" placeholder="Search to Add a Card">
                    </p>
                  </div>
                  
                  
                  <div class="manasearch control ">
                    <!-- color -->
                    
                    <div class="radio">
                        <fieldset title="White" >
                            <label class="symbol w" for="colorwhite">White</label>
                            <input type="checkbox" @change="addColor" name="color[]" id="colorwhite" value="White">
                        </fieldset>	
                    </div>
                     <div class="radio">
                    <fieldset title="Blue">
                        <label class="symbol u" for="colorblue">Blue</label>
                        <input type="checkbox" @change="addColor" name="color[]" id="colorblue" value="Blue">
                    </fieldset>
                    </div>
                     <div class="radio">	
                    <fieldset title="Black">
                        <label class="symbol b" for="colorblack">Black</label>
                        <input type="checkbox" @change="addColor" name="color[]" id="colorblack" value="Black">
                    </fieldset>
                    </div>
                     <div class="radio">
                    <fieldset title="Red">
                        <label class="symbol r" for="colorred">Red</label>
                        <input type="checkbox" @change="addColor" name="color[]" id="colorred" value="Red">
                    </fieldset>
                    </div>			
                     <div class="radio">			
                    <fieldset title="Green">
                        <label class="symbol g" for="colorgreen">Green</label>
                        <input type="checkbox" @change="addColor" name="color[]" id="colorgreen" value="Green">
                    </fieldset>
                    </div>			
                     <div class="radio">			
                    
                    <fieldset title="Colorless">
                        <label class="symbol a" for="colorless">Artifact</label>
                        <input type="checkbox" @change="addColor" name="color[]" id="colorless" value="Colorless">
                    </fieldset>			
                    </div>								
                </div>
                        
                
              </div>
              <footer class="card-footer" >
                
                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <tr v-for="card in results">
                     <td><a v-on:click.stop="addToList(card.emid)"><span class="fa fa-plus-circle"></span></a></td>
                     <td class="is-size-7">{{card.name}} [{{card.setcode}}]</td>
                     <td class="is-size-7"  v-html="card.mana_cost"></td>
                     
                     <td class="is-size-7">{{card.main_type}}</td>
                     
                    </tr>
                  </table>
                  <div style="clear:both"></div>
              </footer>
            </div>
        </div>
    `,
    data: function data() {

        return {
            results: [],
            nameSearch: '',
            type: '',
            mana_cost: 100,
            rarity: '',
            rating: 0,
            expansion: '',
            limit: 50,
            textSearch: '',
            typeSearch: '',
            duplicates: 'yes',
            colors: []
        }
    },
    watch: {
        nameSearch: function () {

            this.search();

        },
        colors: function () {

            this.search();

        }
    },
    methods: {
        collectColors: function collectColors(){
            let str = '';
            if(this.colors.length> 0) {
                str = '&color%5B%5D=' + this.colors.join('&color%5B%5D=');
            }
            return str;
        },
        search: function search(){
            let nameSearch = this.nameSearch.replace(' ','%');
            let colors = this.collectColors();
            let apiURL = 'search/mass/?type='+this.type+'&mana_cost='+this.mana_cost+'&rarity='+this.rarity+'&rating='+this.rating+'&expansion='+this.expansion+'&limit='+this.limit+'&textsearch='+this.textSearch+'&typesearch='+this.typeSearch+'&search='+nameSearch+'&duplicates='+this.duplicates+colors;
            let $this = this;
            $this.$refs['searchBox'].className='control is-small is-loading';
            axios
                .get(api_url + apiURL)
                .then(function (response) {
                    $this.results = response.data.data
                    $this.$refs.searchBox.className='control is-small';
                    $this.openSearchResults();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        addToList: function addToList(emid){
            var apiURL = api_url + 'lists/add/list='+ this.$parent.list.id+'&echomtg_id=' + emid;
            var $this = this;
            axios.get(apiURL).then(function (response) {
                //console.log(response);
                $this.$emit('addToList');
            }).catch(function (error) {
                console.log(error);
            });
        },
        addColor: function addColor(event){
            event.target.parentElement.classList.toggle('on');

            if(event.target.parentElement.classList.contains('on')){
                this.colors.push(event.target.value);
            } else {
                this.colors.splice(this.colors.indexOf(event.target.value),1);
            }

        },
        toggleSearchResultsOpen: function toggleSearchResultsOpen(event){
            if(document.querySelector('.card.search .card-footer').classList.contains('closed')){
                this.openSearchResults();
            } else {
                this.closeSearchResults();
            }
        },
        openSearchResults: function openSearchResults(event){
            document.querySelector('.card.search .card-footer').classList.remove('closed');
            document.querySelector('.card.search .card-header .fa-caret-down').classList.remove('is-hidden');
            document.querySelector('.card.search .card-header .fa-caret-left').classList.add('is-hidden');
            document.querySelector('.card.search').classList.add('fixed');

        },
        closeSearchResults: function closeSearchResults(event){
            document.querySelector('.card.search .card-footer').classList.add('closed');
            document.querySelector('.card.search .card-header .fa-caret-down').classList.add('is-hidden');
            document.querySelector('.card.search .card-header .fa-caret-left').classList.remove('is-hidden');
            document.querySelector('.card.search').classList.remove('fixed');
        }
    }
});

Vue.component('export-option', {
    props: ['link','listID'],
    template: `
        <option v-bind:value="link.url">{{link.label}}</option>
   `
});

Vue.component('list-view', {
    props: ['listId'],
    data: function data() {

        return {
            list: {},
            cardArray: [],
            status: 1,
            public: false,
            sortMetric: 'name',
            sortOrder: 'ASC',
            currentTabComponent: 'deck-view',
            curveLabels: [],
            curveDataset:[{
                'label': 'CMC',
                'data' : [],
                'backgroundColor' : []
            }],
            colorLabels: [],
            colorData: [],
            sclLabels: ['Spells','Creatures','Lands'],
            sclDataset: [{
                'data' : [],
                'backgroundColor' : []
            }],
            chartOptions: {
                legend: {
                    display: false
                }
            },
            chartsColors: {
                'Black': 'rgba(38,38,38, 1)',
                'Blue': 'rgba(12,128,236, 1)',
                'Red': 'rgba(193,5,5, 1)',
                'White': 'rgba(255,255,178, 1)',
                'Green': 'rgba(54,124,73, 1)',
                'Colorless': 'rgba(180,169,144, 1)',
                'Multicolor': 'rgba(246,188,6, 1)',
                'Gold': 'rgba(246,188,6, 1)',
                'ManaCurve': 'rgba(200,200,200, 1)'
            },
            colorDataset: [{
                'data' : [],
                'backgroundColor' : []
            }],
            exportOptions: [
                {'label':'Magic Online (modo)','url':'/api/lists/modo_deck/list='},
                {'label':'Command Seperated (csv)','url':'/api/lists/csv_deck/list='},
                {'label':'Decklist (dek)','url':'/api/lists/dek_deck/list='},
                {'label':'Plain Text (txt)','url':'/api/lists/text_deck/list='},
                {'label':'Plain Text with Prices','url':'/api/lists/text/show_prices=true&list='},
                {'label':'Cockatrice (cok)','url':'/api/lists/cock_deck/list='},
                {'label':'XMage (dck)','url':'/api/lists/xmage_deck/list='},
            ]
        };

    },

    methods: {
        calculateGraphData: function calculateGraphData(){
            // read the cmcs for curve

            // read the colors for distribution chart
            let colorData = {};
            let curveData = {};
            let sclData = {'spells':0,'creatures':0,'lands':0};
            let $this = this;
            // loop through he deck to build the

            for (let objectKey in $this.list.card_list) {

                // do spell create land distribtion
                if (/creature/i.test($this.list.card_list[objectKey].types)) {
                    sclData.creatures++;
                } else if (/land/i.test($this.list.card_list[objectKey].types)) {
                    sclData.lands++;
                } else {
                    sclData.spells++;
                }
            }
            for (let objectKey in $this.list.decklist.card_list) {

                // do colors
                if(this.list.decklist.card_list[objectKey].card_info.colors != null){

                    // go through mana curve
                    if(curveData[$this.list.decklist.card_list[objectKey].card_info.cmc] !== undefined) {
                        if(/land/i.test($this.list.decklist.card_list[objectKey].card_info.types)){
                            curveData['land'] += $this.list.decklist.card_list[objectKey].main
                        } else {
                            curveData[$this.list.decklist.card_list[objectKey].card_info.cmc] += $this.list.decklist.card_list[objectKey].main
                        }
                    } else {
                        if(/land/i.test($this.list.decklist.card_list[objectKey].card_info.types)){
                            curveData['land'] = $this.list.decklist.card_list[objectKey].main
                        } else {
                            curveData[$this.list.decklist.card_list[objectKey].card_info.cmc] = $this.list.decklist.card_list[objectKey].main
                        }
                        curveData[$this.list.decklist.card_list[objectKey].card_info.cmc] = $this.list.decklist.card_list[objectKey].main
                    }

                    // go through colors
                    let colors = $this.list.decklist.card_list[objectKey].card_info.colors.split(', ');
                    colors.forEach(function(color) {
                        if(colorData[color] !== undefined) {
                            colorData[color] += $this.list.decklist.card_list[objectKey].main
                        } else {
                            colorData[color] = $this.list.decklist.card_list[objectKey].main
                        }


                    });
                }
            }

            // reset previous data
            this.colorDataset[0].data = [];
            this.colorLabels = [];
            this.colorDataset[0].backgroundColor = [];
            this.curveLabels = [];
            this.curveDataset[0].data = [];

            this.sclDataset[0].data = [sclData.spells,sclData.creatures,sclData.lands];
            this.sclDataset[0].backgroundColor = [
                this.chartsColors.Blue,
                this.chartsColors.Green,
                this.chartsColors.Colorless
            ];
            // set new data

            // color distribution
            for (let objectKey in colorData) {
                this.colorLabels.push(objectKey);
                this.colorDataset[0].data.push(colorData[objectKey]);
                this.colorDataset[0].backgroundColor.push(this.chartsColors[objectKey]);
            }

            // mana curve
            for (let objectKey in curveData) {
                this.curveLabels.push(objectKey);
                this.curveDataset[0].data.push(curveData[objectKey]);
                this.curveDataset[0].backgroundColor.push(this.chartsColors['ManaCurve']);

            }
        },
        updateStatus: function (){
            this.status++;
        },
        removeCard: function (itemid){

            var $this = this;

            var apiURL = api_url + 'lists/remove/list='+ this.list.id+'&id=' + itemid;

            axios.get(apiURL).then(function (response) {
                $this.updateStatus();
                createGrowl('1 '+ listEntry.name + ' removed.');
            }).catch(function (error) {
                console.log(error);
            });

        },
        removeCardByMID: function (cardMid,sb){

            for (var objectKey in this.list.card_list) {

                var listEntry = this.list.card_list[objectKey];
                var $this = this;

                if (cardMid == listEntry.mid && listEntry.sideboard == sb) {
                    var apiURL = api_url + 'lists/remove/list='+ this.list.id+'&id=' + objectKey;

                    axios.get(apiURL).then(function (response) {
                        $this.updateStatus();
                        createGrowl('1 '+ listEntry.name + ' removed.');
                    }).catch(function (error) {
                        console.log(error);
                    });

                    break;
                }

            }
        },
        toggleFoil: function (iid,foil){
            let apiURL = api_url + `lists/toggle_foil/id=${iid}&list_id=${this.list.id}&foil=${foil}`;
            let $this = this;
            axios.get(apiURL).then(function (response) {
                $this.updateStatus();
                createGrowl('Foil Toggled');
            }).catch(function (error) {
                console.log(error);
            });

        },
        addCardByEMID: function (emid,sideboard=0){
            var $this = this;
            var apiURL = api_url + 'lists/add/list='+ this.list.id+'&echomtg_id=' + emid + '&sb=' + sideboard;

            axios.get(apiURL).then(function (response) {
                $this.updateStatus();
                createGrowl(response.data.message);
            }).catch(function (error) {
                console.log(error);
            });

        },
        addCard: function (cardMid,sideboard=0){

            for (var objectKey in this.list.card_list) {

                var listEntry = this.list.card_list[objectKey];

                var $this = this;

                if (cardMid == listEntry.mid) {
                    var apiURL = api_url + 'lists/add/list='+ this.list.id+'&echomtg_id=' + listEntry.emid + '&sb=' + sideboard;

                    axios.get(apiURL).then(function (response) {
                        $this.updateStatus();
                        createGrowl('An additional '+ listEntry.name + ' was added.');
                    }).catch(function (error) {
                        console.log(error);
                    });

                    break;
                }

            }
        },
        moveToSideboard: function (cardMid,sb=2){

            for (var objectKey in this.list.card_list) {

                var listEntry = this.list.card_list[objectKey];

                if (cardMid == listEntry.mid && listEntry.sideboard != sb) {

                    var side = (sb !== 2) ? '&sb='+sb : '';
                    var apiURL = api_url + 'lists/toggle_sideboard/list_id='+ this.list.id+'&id=' + objectKey + side;
                    var $this = this;

                    axios.get(apiURL).then(function (response) {
                        $this.updateStatus();
                        createGrowl('1 '+ listEntry.name + ' sideboard toggled.');
                    }).catch(function (error) {
                        console.log(error);
                    });


                    break;
                }

            }
        },
        openExport: function openExport(e){
            if(e.target.options.selectedIndex > -1) {
                let selected = e.target.options[e.target.options.selectedIndex];
                let url = selected.value + this.list.id;
                window.location.href = url
            }

        },
        sortListASC: function (){
            let metric = this.sortMetric;
            if(metric == 'tcg_mid') {
                this.cardArray.sort(function (obj1, obj2) {
                    // Ascending: first age less than the previous
                    return obj1[metric] - obj2[metric];
                });
            } else {
                this.cardArray.sort(function(a, b) {
                    var strA = a[metric].toUpperCase();
                    var strB = b[metric].toUpperCase();
                    if (strA < strB) {
                        return -1;
                    }
                    if (strA > strB) {
                        return 1;
                    }
                    return 0;
                });
            }

        },
        sortListDESC: function (){
            let metric = this.sortMetric;
            if(metric == 'tcg_mid') {
                this.cardArray.sort(function (obj1, obj2) {
                    return obj2[metric] - obj1[metric];
                });
            } else {
                this.cardArray.sort(function(a, b) {
                    var strA = a[metric].toUpperCase();
                    var strB = b[metric].toUpperCase();
                    if (strB < strA) {
                        return -1;
                    }
                    if (strB > strA) {
                        return 1;
                    }
                    return 0;
                });
            }

        },
        openPublicLink: function (event) {
            window.location.href = '/decks/list/'+this.list.hash+'/';

        },
        makePublic: function(){

             let $this = this;

            let endpoint = api_url + 'lists/toggle_public/';
            let bodyFormData = new FormData();
            bodyFormData.set('list', this.list.id);
            bodyFormData.set('public', 1);

            axios({
                method: 'post',
                url: endpoint,
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response){

                $this.updateStatus();
                createGrowl(' made public ');

            });

        },
        setCurrentTab(tabname){
            this.currentTabComponent = tabname;
        }
    },
    watch: {
        status:function(){
            let $this = this;
            axios
                .get(api_url + 'lists/get/list='+this.listId)
                .then(function (response) {
                    $this.list = response.data.list;
                    $this.calculateGraphData();
                    $this.cardArray = [];
                    for(index in $this.list.card_list){
                        $this.cardArray.push($this.list.card_list[index]);
                    }
                    if($this.sortOrder == 'ASC'){
                        $this.sortListASC();
                    } else {
                        $this.sortListDESC();
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        sortOrder: function(){
            if(this.sortOrder == 'ASC'){
                this.sortListASC();
            } else {
                this.sortListDESC();
            }
        },
        sortMetric: function(){
            if(this.sortOrder == 'ASC'){
                this.sortListASC();
            } else {
                this.sortListDESC();
            }
        },

        currentTabComponent:function(){

            // hit the ref remove the class then add the class to proper ref
        }

    },
    created () {

      this.updateStatus()

    },
    template: `
        <div>
        
       
        <nav class="breadcrumb" aria-label="breadcrumbs">
            
            <div class="is-pulled-right">
                <div class="columns">
                    <div class="column">
                        <button v-if="list.public == 0" class="button is-primary is-small"  @click="makePublic($vnode.key)">Make Sharable</button>
                        <button v-if="list.public == 1" class="button is-info is-small"  @click="openPublicLink">Open Public View</button>
                    </div>
                    <div class="column">
                        <div class="control has-icons-left">
                          <div class="select is-small">
                            <select @change="openExport">
                              <option selected>Export Options</option>
                               <option is="export-option"
                                                     v-for="link in exportOptions"
                                                     v-bind:link="link" v-bind:listID="list.id"></option>
                            </select>
                          </div>
                          <span class="icon is-left" style="margin-left: -1px; margin-top: -2px;">
                           
                              <i class="fa fa-download"></i>
                           
                          </span>
                        </div>
                    </div>
                </div>
            </div>
               
          <ul>
            <li><a href="/lists/"><span class="fa fa-archive has-text-grey-light"></span>&nbsp; <span>Lists</span></a></li>
            <li class="is-active"><a href="#" aria-current="page">{{list.name}}</a></li>
          </ul>
          
                  
          
          
        </nav>
        
        
        <div class="lists2">
        
            <div class="columns">
                <div class="column is-one-half">
                   <list-summary v-bind:list="list"></list-summary>
                </div>
            </div>
            <div class="container" style="min-height: 80px">
                <p>Search to add cards to your list:</p>
              <global-search  
                        :callback="addCardByEMID"
                        callbackname="Add to List"
                        :showimage="true"></global-search>  
                </div>
           <div class="columns ">
                
                <div class="column">
                    
                    <div class="tabs">
                      <ul>
                        <li  v-bind:class="{ 'is-active': this.currentTabComponent == 'deck-view'}" v-on:click.stop="setCurrentTab('deck-view')">
                          <a >
                            <span class="icon is-small"><i class="fa fa-archive" aria-hidden="true"></i></span>
                            <span>Deck Mode</span>
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-table-view'}" v-on:click.stop="setCurrentTab('list-table-view')"  >
                          <a >
                            <span class="icon is-small"><i class="fa fa-table" aria-hidden="true"></i></span>
                            <span>List Mode</span>
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': this.currentTabComponent == 'deck-statistics-view'}" v-on:click.stop="setCurrentTab('deck-statistics-view')">
                          <a >
                            <span class="icon is-small"><i class="fa fa-pie-chart" aria-hidden="true"></i></span>
                            <span>Statistics</span>
                          </a>
                        </li>
                        <li v-bind:class="{ 'is-active': currentTabComponent == 'list-probabilities-view'}"  v-on:click.stop="setCurrentTab('list-probabilities-view')"   >
                          <a >
                            <span class="icon is-small"><i class="fa fa-question-circle" aria-hidden="true"></i></span>
                            <span>Probabilities</span>
                          </a>
                        </li>
                        
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-inventory-view'}" v-on:click.stop="setCurrentTab('list-inventory-view')"  >
                          <a >
                            <span class="icon is-small"><i class="fa fa-book" aria-hidden="true"></i></span>
                            <span>My Inventory</span>
                            
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'meta-view'}" v-on:click.stop="setCurrentTab('meta-view')"  >
                          <a>
                            <span class="icon is-small"><i class="fa fa-info" aria-hidden="true"></i></span>
                            <span>Meta</span>
                          </a>
                        </li>
                        <span class="is-hidden">
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-sell-view'}" v-on:click.stop="setCurrentTab('list-sell-view')"  >
                          <a>
                            <span class="icon is-small"><i class="fa fa-money" aria-hidden="true"></i></span>
                            <span>Sell Now</span>
                          </a>
                        </li>
                        </span>
                        
                        
                      </ul>
                    </div>
                    
                    <component 
                        v-bind:list="list"  
                        v-bind:cardArray="cardArray" 
                        v-on:toggleFoil="toggleFoil" 
                        v-on:updateStatus="updateStatus" 
                        v-on:addCard="addCard" 
                        v-on:moveToSideboard="moveToSideboard" 
                        v-on:removeCard="removeCard" 
                        v-bind:is="currentTabComponent">    
                    </component>
                    
                </div> 
            </div>  
        </div>
</div>`

});



