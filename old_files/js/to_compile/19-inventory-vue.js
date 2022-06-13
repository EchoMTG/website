//
//
//
// Vue.component('sealed-header', {
//     props: ['symbol','stats','totalPages','pagination','currentPage'],
//     data: function data() {
//
//         return {
//             searchFilter: ''
//         };
//
//     },
//     methods: {
//         filterInput: function filterInput(searchTerm){
//
//             this.$parent.search = searchTerm;
//         },
//         changePage: function changePage(page){
//           this.$parent.currentPage = page;
//         },
//         tabOn: function tabOn(selection, event){
//             let tabSelections = this.$el.querySelectorAll('.tabs li');
//             [].forEach.call(tabSelections, function(el) {
//                 // do whatever
//                 el.classList.remove('is-active');
//             });
//
//             let tabs = this.$el.querySelectorAll('.earnings-tabs');
//
//             [].forEach.call(tabs, function(el) {
//                 // do whatever
//                 el.classList.add('is-hidden');
//             });
//             this.$el.querySelector('#'+selection).classList.remove('is-hidden');
//
//             event.target.closest('li').classList.add('is-active');
//
//         }
//
//
//     },
//     watch: {
//         searchFilter:  function(){
//             this.filterInput(this.searchFilter)
//         }
//     },
//     template: `
//         <div class="r" id="locked-top">
// 			<div class="c-1">
//
// 			<div class="tabs is-small">
//               <ul>
//                 <li class="is-active" @click="tabOn('finances', $event)">
//                   <a >
//                     <span class="icon is-small"><i class="fa fa-usd" aria-hidden="true"></i></span>
//                     <span>Financial Breakdown</span>
//                   </a>
//                 </li>
//                 <li @click="tabOn('rarities', $event)"><a >Rarity Breakdown</a></li>
//                 <!-- <li><a @click="tabOn('graphs')">Graphs</a></li>-->
//                 <li >
//                   <a target="_blank" href="/api/earnings/export/">
//                     <span class="icon is-small"><i class="fa fa-download" aria-hidden="true"></i></span>
//                     <span>Export to CSV</span>
//                   </a>
//                 </li>
//                 <li >
//                   <a href="/user/profile/">
//                     <span class="icon is-small"><i class="fa fa-money" aria-hidden="true"></i></span>
//                     <span>Change Currency</span>
//                   </a>
//                 </li>
//
//
//               </ul>
//             </div>
//
// 			<nav class="earnings-tabs level" id="finances">
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Total Sold For</p>
//                   <p class="title">{{symbol}}{{stats.sold_value}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Total Acquired For</p>
//                   <p class="title">{{symbol}}{{stats.acquired_value}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Difference</p>
//                   <p class="title">{{symbol}}{{stats.difference}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Gain/Loss</p>
//                   <p class="title">{{stats.gainLoss}}%</p>
//                 </div>
//               </div>
//                 <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Total Sold</p>
//                   <p class="title">{{stats.total_cards}} </p>
//                 </div>
//               </div>
//             </nav>
//
//             <nav class="earnings-tabs level is-hidden" id="rarities">
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Foils</p>
//                   <p class="title">{{stats.foils}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Mythics</p>
//                   <p class="title">{{stats.mythics}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Rares</p>
//                   <p class="title">{{stats.rares}}</p>
//                 </div>
//               </div>
//               <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Uncommons</p>
//                   <p class="title">{{stats.uncommons}}</p>
//                 </div>
//               </div>
//                 <div class="level-item has-text-centered">
//                 <div>
//                   <p class="heading">Commons</p>
//                   <p class="title">{{stats.commons}}</p>
//                 </div>
//               </div>
//             </nav>
//
//              <div class="columns">
//                 <div class="column">
//
//                 </div>
//                 <div class="column is-one-fifth">
//                     <div class="control has-icons-left has-icons-right">
//                       <input v-model="searchFilter" class="input is-small" placeholder="Search Earnings...">
//                       <span class="icon is-small is-left">
//                         <i class="fa fa-search"></i>
//                       </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
// });
//
//
// Vue.component('sealed-inventory-view', {
//     props: ['symbol'],
//     data: function data() {
//
//         return {
//             list: {},
//             cardArray: [],
//             limit: 50,
//             start: 0,
//             currentPage: 1,
//             totalPages: 1,
//             status: 0,
//             sealed: [],
//             search: '',
//             stats: {}
//
//         };
//
//     },
//
//     methods: {
//
//         changePagination: function (start, limit = 50){
//             this.start = start;
//             this.limit = limit;
//         },
//         changePage: function changePage(page){
//             this.currentPage = page;
//         },
//         addSealed: function (itemid){
//
//             var $this = this;
//
//             var apiURL = api_url + 'inventory/add/'
//
//             /*
//             {
//     "emid": 92175,
//     "quantity" : 1,
//     "language": "EN",
//     "acquired_price": "4.00",
//     "acquired_date": "5-1-2020",
//     "condition": "MP",
//     "foil": 1
// }
//
//              */
//             axios.get(apiURL).then(function (response) {
//                 $this.updateStatus();
//                 createGrowl('1 '+ listEntry.name + ' removed.');
//             }).catch(function (error) {
//                 console.log(error);
//             });
//
//         },
//         updateStatus: function updateStatus(){
//             this.status++;
//         }
//
//     },
//     computed: {
//         // totalPages: function (){
//         //     return Math.ceil(this.stats.total_cards / this.limit);
//         // },
//         pagination: function (){
//             let pages = [];
//             for(let i=0; i < this.totalPages; i++){
//                 pages.push(i+1);
//             }
//             return pages;
//         }
//     },
//     watch: {
//         status:function(){
//             let $this = this;
//             let url = api_url + 'inventory/view/start='+this.start+'&limit='+this.limit+'&set_code=PACK'
//
//             fetch(url).then(response => response.json())
//                 .then(data => {
//                     console.log('here',data)
//                     $this.sealed = data.items;
//                     $this.totalPages = data.meta.total_pages
//                     //$this.currentPage = data.meta.current_page
//                 }).catch(function (error) {
//                 console.log(error);
//             });
//
//
//         },
//         search: function(){
//             this.limit = 50;
//             this.start = 0;
//             if(this.currentPage == 1){
//                 this.updateStatus();
//             } else {
//                 this.currentPage = 1; // this run the the status update
//             }
//
//         },
//         currentPage: function(){
//             this.start = (this.currentPage - 1) * this.limit;
//             this.updateStatus();
//         }
//
//     },
//     created () {
//
//         this.updateStatus();
//     },
//     template: `
//         <div class="inventory inventory-advanced">
//        <pagination v-bind:pagination="pagination" v-bind:totalPages="totalPages" v-bind:currentPage="currentPage"></pagination>
//             <table class="table is-narrow is-bordered is-striped">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>Name</th>
//                         <th>Sold</th>
//                         <th>Gain/Loss</th>
//                         <th>Acquired</th>
//                         <th>Date Sold</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr v-for="item in sealed" v-bind:data-id="item.id">
//                         <td><a v-bind:href="item.echo_set_url"><img v-bind:src="item.set_image" style="max-height:18px; max-width:14px" /></a></td>
//                         <td>
//                             <span v-if="item.foil == 1" class="foil foiled" style="border:1px grey solid; border-radius:3px; padding: 0px 3px;">F</span>
//                             <a v-bind:href="item.echo_url">{{item.name}}</a>
//                         </td>
//                         <td>
// 				            {{symbol}} <input class="adjust-box" data-call="earningearnings/adjust_sold/" v-bind:value="item.price"/>
// 				        </td>
// 				        <td>
// 				            <span class="percentage red down" v-if="item.gain < 0">{{item.gain}}%</span>
// 				            <span class="percentage green up" v-if="item.gain > 0">{{item.gain}}%</span>
//                         </td>
//                         <td>
// 				            {{symbol}} <input class="adjust-box" data-call="earnings/adjust_acquired/" v-bind:value="item.price_acquired"/>
// 				        </td>
// 				        <td>
// 				            <input class="adjust-box input is-small acquired-date-input" type="date" data-call="earnings/adjust_date/" v-bind:value="item.date_sold_html"/>
// 				        </td>
// 				        <td>
// 				            <button class="ignore remove-earnings button small black has-background-black has-text-white pull-right" v-bind:data-id="item.id" href="javascript:void(0);">
// 				            <span class="fa fa-trash"></span> </button>
// 				        </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     `
//
// });
//
//
