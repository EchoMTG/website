<template>
  <div>
    <div>
        <echo-bread-crumbs :data="crumbs" />

        <div class="lists2">
          <div class="hero is-black pl-5 has-text-white pb-4">
            <div class="columns mb-0">
                <div class="column is-one-half mb-0">
                   <list-summary :list="list">
                     <div class="is-pulled-right is-flex">

                        <b-button v-if="list.public == 0" class=" is-primary" size="is-small"  @click="makePublic($vnode.key)">Make Sharable</b-button>
                        <b-button v-if="list.public == 1" type="is-warning" class="mr-1 has-background-black" size="is-small"  @click="openPublicLink">Open Public Link</b-button>
                        <social-buttons
                          v-if="list.public == 1"
                          :url="getPublicLink()"
                          :title="list.name"
                          :twitter="`echomtg`"
                          :hashtags="`magic the gathering`"
                          classes="mr-1"
                        />

                      <b-select v-model="deckdownload" classes="ml-1 mr-5" placeholder="Download Options" size="is-small" icon="download" type="is-dark" @input="openExport">

                        <option v-for="(link, index) in exportOptions" :value="link.url" :key="`option-item-${index}`">{{link.label}}</option>
                      </b-select>

                    </div>
                   </list-summary>
                </div>
            </div>
              <p class="mt-0">Search to add cards to your deck or list:</p>
              <global-search
                :callback="addCardByEMID"
                callbackname="Add to List"
                :showimage="true"></global-search>

          </div>
           <div class="columns ">

                <div class="column">

                    <div class="tabs has-background-black">
                      <ul>
                        <li :class="currentTabComponent == 'visual-deck-mode' ? ' is-active ml-2 ' : 'ml-2'" v-on:click.stop="setCurrentTab('visual-deck-mode')">
                          <a >
                            <b-icon icon="cards" size="is-small" />
                            <span>Visual Mode</span>
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': this.currentTabComponent == 'deck-view'}" v-on:click.stop="setCurrentTab('deck-view')">
                          <a >
                            <b-icon icon="archive" size="is-small" />
                            <span>Classic Mode</span>
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-table-view'}" v-on:click.stop="setCurrentTab('list-table-view')"  >
                          <a >
                            <b-icon icon="table-large" size="is-small" />
                            <span>List Mode</span>
                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': this.currentTabComponent == 'deck-statistics-view'}" v-on:click.stop="setCurrentTab('deck-statistics-view')">
                          <a >
                            <b-icon icon="chart-pie" size="is-small" />
                            <span>Statistics</span>
                          </a>
                        </li>
                        <li v-bind:class="{ 'is-active': currentTabComponent == 'list-probabilities-view'}"  v-on:click.stop="setCurrentTab('list-probabilities-view')"   >
                          <a >
                            <b-icon icon="beaker-question-outline" size="is-small" />
                            <span>Deck Testing</span>
                          </a>
                        </li>

                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-inventory-view'}" v-on:click.stop="setCurrentTab('list-inventory-view')"  >
                          <a >
                            <b-icon icon="book-open-page-variant-outline" size="is-small" />
                            <span>My Inventory</span>

                          </a>
                        </li>
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'meta-view'}" v-on:click.stop="setCurrentTab('meta-view')"  >
                          <a>
                            <b-icon icon="archive-edit" size="is-small" />
                            <span>Name/Description</span>
                          </a>
                        </li>
                        <span class="is-hidden">
                        <li  v-bind:class="{ 'is-active': currentTabComponent == 'list-sell-view'}" v-on:click.stop="setCurrentTab('list-sell-view')"  >
                          <a>
                            <b-icon icon="money" size="is-small" />
                            <span>Sell Now</span>
                          </a>
                        </li>
                        </span>


                      </ul>
                    </div>

                    <component
                        v-bind:list="list"
                        v-bind:cardArray="cardArray"
                        v-bind:items="items"
                        v-bind:callback="$fetch"
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
</div>
  </div>
</template>
<style scoped>
.tabs,.tabs ul {
  border-bottom: none !important;
}
.tabs .is-active{
  background: white;
  color: black;
  border-bottom: none;

}
.tabs .is-active a{
  border-bottom: none !important;
}
</style>

<script>
  import GlobalSearch from "@/components/GlobalSearch.vue";
  import DeckView from '@/components/single/DeckView.vue'
  import VisualDeckMode from '@/components/decks/VisualDeckMode.vue'
  import DeckStatisticsView from '@/components/single/DeckStatisticsView.vue'
  import ListInventoryView from '@/components/single/ListInventoryView.vue'
  import ListProbabilitiesView from '@/components/single/ListProbabilitiesView.vue'
  import ListSellView from '@/components/single/ListSellView.vue'
  import ListTableView from '@/components/single/ListTableView.vue'
  import MetaView from '@/components/single/MetaView.vue'
  import ListSummary from '@/components/single/ListSummary.vue'
  import EchoBreadCrumbs from "@/components/navigation/EchoBreadCrumbs.vue";
import SocialButtons from '@/components/cta/SocialButtons.vue'

  import axios from 'axios'
  const api_url = process.env.API_DOMAIN;
  export default {
    components: {
      GlobalSearch,
      DeckView,
      DeckStatisticsView,
      ListInventoryView,
      ListProbabilitiesView,
      ListSellView,
      ListTableView,
      MetaView,
      ListSummary,
      EchoBreadCrumbs,
      VisualDeckMode,
      SocialButtons
    },
    async fetch() {

      this.id = this.$route.params['id'] // When calling /abc the slug will be "abc"
      try {
        const res = await this.$echomtg.getList(this.id);
        this.list = res.list;
        this.calculateGraphData();
        this.cardArray = this.list.card_list;
        this.items = this.list.items;
      } catch (error) {
        this.$echomtg.log('error fetching list SSR', error)
      }

    },
    data() {
        return {
          id: 0,
            list: {
              name: ''
            },
            deckdownload:'',
            cardArray: {},
            items: [],
            status: 1,
            public: false,
            sortMetric: 'name',
            sortOrder: 'ASC',
            currentTabComponent: 'visual-deck-mode',
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
                {'label':'Magic Online (modo)','url':'lists/modo_deck/?list='},
                {'label':'Command Seperated (csv)','url':'lists/csv_deck/?list='},
                {'label':'Decklist (dek)','url':'lists/dek_deck/?list='},
                {'label':'Plain Text (txt)','url':'lists/text_deck/?list='},
                {'label':'Plain Text with Prices','url':'lists/text/?show_prices=true&list='},
                {'label':'Cockatrice (cok)','url':'lists/cock_deck/?list='},
                {'label':'XMage (dck)','url':'lists/xmage_deck/?list='},
            ]
        };

    },

    methods: {

        calculateGraphData(){
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
        async removeCard(itemid){

            const res = await this.$echomtg.removeFromList(itemid,this.list.id)

            this.$buefy.toast.open({
              message: `${res.message}`,
              type: 'is-success'
            })

            this.updateStatus();

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
        async addCardByEMID(emid,sideboard=0){

            const res = await this.$echomtg.addToList(emid, this.list.id, 0, sideboard);
            this.$buefy.toast.open({
              message: `${res.message}`,
              type: 'is-success'
            })
            await this.$fetch()


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
        openExport(){

                let url = this.$echomtg.getAPIURL() + this.deckdownload + this.list.id;
                window.location.href = url

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
        getPublicLink(){
          return 'https://www.echomtg.com/public/list/'+this.list.hash+'/';
        },
        openPublicLink: function (event) {
            window.location.href = this.getPublicLink()

        },
        makePublic: function(){
            let token = this.$cookies.get('token');
            let $this = this;

            let endpoint = `${this.$config.API_DOMAIN}lists/toggle_public/?&auth=${token}`;
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
    computed: {
      crumbs() {
        return [
          {
            label: 'Apps',
            url: '/apps/',
            icon: ''
          },
          {
            label: 'Lists and Decks',
            url: '/apps/lists/',
            icon: ''
          },
          {
            label: this.list.name,
            url: this.$nuxt.$route.path,
            icon: ''
          }
        ]
      }
    }
  }
</script>

<style>

</style>
