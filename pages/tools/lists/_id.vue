<template>
  <div>
    <div>
        <echo-bread-crumbs :data="crumbs" />

        <div class="lists2">
            <div class="columns">
                <div class="column is-one-half">
                   <list-summary :list="list">
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
                                      <option v-for="(link, index) in exportOptions" :value="link.url" :key="`option-item-${index}`">{{link.label}}</option>
                                    </select>
                                  </div>
                                  <span class="icon is-left" style="margin-left: -1px; margin-top: -2px;">

                                      <i class="fa fa-download"></i>

                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                   </list-summary>
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
</div>
  </div>
</template>

<script>
  import GlobalSearch from "@/components/GlobalSearch.vue";
  import DeckView from '@/components/single/DeckView.vue'
  import DeckStatisticsView from '@/components/single/DeckStatisticsView.vue'
  import ListInventoryView from '@/components/single/ListInventoryView.vue'
  import ListProbabilitiesView from '@/components/single/ListProbabilitiesView.vue'
  import ListSellView from '@/components/single/ListSellView.vue'
  import ListTableView from '@/components/single/ListTableView.vue'
  import MetaView from '@/components/single/MetaView.vue'
  import ListSummary from '@/components/single/ListSummary.vue'
  import EchoBreadCrumbs from "@/components/navigation/EchoBreadCrumbs.vue";


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
      EchoBreadCrumbs
    },
    async asyncData({ params, $cookies }) {
      let token = $cookies.get('token');
      const id = params.id // When calling /abc the slug will be "abc"
      try {
        const res = await fetch(`${api_url}lists/get/?list=${id}&auth=${token}`);
        const json = await res.json();
        const list = json.list
        const cardArray = json.list.card_list
        return { id, list , cardArray}
      } catch (error) {
        console.log('error fetching list SSR', error)
        return  {}
      }

    },
    data() {
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
      async getList(){

        let token = this.$cookies.get('token');
        try {
          const res = await fetch(`${api_url}lists/get/?list=${this.id}&auth=${token}`);
          const json = res.json();

          this.list = json.data.list;
          this.calculateGraphData();
          this.cardArray = this.list.card_list;
          if(this.sortOrder == 'ASC'){
              this.sortListASC();
          } else {
              this.sortListDESC();
          }


        } catch (error) {
            console.log(error);
        }

      },
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
        openExport(e){
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
            window.location.href = '/public/list/'+this.list.hash+'/';

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
        status: async function(){
            await this.getList()

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
    computed: {
      crumbs() {
        return [
          {
            label: 'Tools',
            url: '/tools/',
            icon: ''
          },
          {
            label: 'Lists and Decks',
            url: '/tools/lists/',
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
