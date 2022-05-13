<template>
    <div class="inventory inventory-advanced"> 
        <br>
        <nav class="earnings-tabs level" id="finances">
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Sealed Items</p>
                    <p class="title">{{ this.sealed.length }}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Current Value</p>
                    <p class="title">{{symbol}}{{totalValue}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Acquired For</p>
                    <p class="title">{{symbol}}{{acquiredForValue}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Difference</p>
                    <p class="title">{{symbol}}{{difference}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Gain/Loss</p>
                    <span class="title percentage red down" v-if="difference < 0">{{gainloss}}%</span>
                    <span class="title percentage green up" v-if="difference > 0">{{gainloss}}%</span>  
                </div>
            </div>
        </nav> 
        <div class="container padded">
            <div class="columns">    
                <div class="column is-two-thirds"  style="min-height: 40px">
                    <global-search  firstsearch="booster box" callbackname="Add to Sealed" :callback="addSealed" :showimage="true" />
                </div>
                <div class="column">
                    <div class="control has-icons-left has-icons-right">
                        <input v-model="search" class="input is-small is-rounded has-background-dark has-text-grey-light" placeholder="Search Your Sealed Inventory...">
                        <span class="icon is-small is-left"><i class="fa fa-search"></i></span>
                    </div>
                </div>
            </div>    
        </div>
        <div class="container">
            <table class="table is-narrow is-bordered is-striped w-100 my-3">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Market Value</th>
                        <th>Gain/Loss</th>
                        <th>Acquired Price</th>
                        <th>Acquired Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sealedItems" :data-id="item.inventory_id" :key="`sealed-item-${index}`">
                        <td><a v-bind:href="item.echo_set_url"><img v-bind:src="item.set_image" style="max-height:18px; max-width:14px" /></a></td>
                        <td>
                            <span v-if="item.foil == 1" class="foil foiled" style="border:1px grey solid; border-radius:3px; padding: 0px 3px;">F</span>	
                            <a v-bind:href="item.echo_url">{{item.name}}</a>
                        </td>
                        <td>{{symbol}} {{item.tcg_mid}}</td>
                        <td>
                            <span class="percentage red down" v-if="item.gain < 0">{{item.gain}}%</span>
                            <span class="percentage green up" v-if="item.gain > 0">{{item.gain}}%</span>     
                        </td>
                        <td>{{symbol}} <input class="adjust-box" data-call="inventory/adjust/" @change="updatePrice($event, item)" :value="item.price_acquired"/></td>
                        <td>
                            <input class="adjust-box input is-small acquired-date-input" type="date"  data-call="inventory/adjust_date/" @change="updateDate($event, item)" :value="item.date_acquired_html"/>
                        </td>
                        <td>
                            <button class="ignore  button small black has-background-black has-text-white pull-right" :data-id="item.id" @click="deleteItem(item.inventory_id)" href="javascript:void(0);">
                            <span class="fa fa-trash"></span> </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import GlobalSearch from '@/components/GlobalSearch'
export default {
  components: { GlobalSearch },
  props: ['symbol'],
  data() {
    return {
      limit: 1000,
      start: 0,
      status: 0,
      sealed: [],
      search: '',
    }
  },
  methods: {
    fetchSealedData(){
      let token = this.$cookies.get('token');
      let url = `${process.env.API_DOMAIN}/inventory/view/?start=${this.start}&limit=${this.limit}&auth=${token}&set_code=`
      // get only inventory with PACK and SEAL as the sets
      // get it all here, not pagination
      fetch(url + 'PACK')
        .then((response) => response.json())
        .then((data) => {
          this.sealed = [...data.items]
          fetch(url + 'SEAL')
            .then((response) => response.json())
            .then((data) => {
              this.sealed = [...this.sealed, ...data.items]
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    searchFilter(q) {
      this.search = q
    },
    deleteItem(id) {
      fetch(`${api_url}inventory/remove/inventory_id=${id}`).then(
        (response) => {
          this.updateStatus()
        }
      )
    },
    addSealed(itemid) {
      var $this = this
      var postBody = {
        emid: itemid,
        quantity: 1,
        language: 'EN',
      }
      var apiURL = api_url + 'inventory/add/'
      fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(postBody),
      })
        .then((res) => res.json())
        .then((res) => {
          createGrowl(res.message)
          $this.updateStatus()
        })
    },
    updateStatus: function updateStatus() {
      this.status++
    },
    updatePrice(input, item) {
      let token = this.$cookies.get('token');
      let id = item.inventory_id;
      let value = input.target.value;

      let url = `${process.env.API_DOMAIN}/inventory/adjust/id=${id}&adjusted_price=${value}&auth=${token}`;
      fetch(url).then(response => response.json())
        .then(data=> {
          console.log(data);
        })
    },
    updateDate(input, item) {
      let token = this.$cookies.get('token');
      let id = item.inventory_id;
      let value = input.target.value;

      let url = `${process.env.API_DOMAIN}/inventory/adjust_date/id=${id}&value=${value}&auth=${token}`;
      fetch(url).then(response => response.json())
        .then(data=> {
          console.log(data);
        })
    }
  },
  computed: {
    sealedItems: function () {
      if (this.search == '') return this.sealed

      return this.sealed.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    totalValue: function () {
      return this.sealed.reduce((total, r) => total + parseFloat(r.tcg_mid), 0);
    },
    acquiredForValue: function () {
        return this.sealed.reduce((total, r) => total + parseFloat(r.price_acquired), 0);
    },
    difference: function () {
      return (this.totalValue - this.acquiredForValue).toFixed(2)
    },
    gainloss: function () {
      return ((this.difference / this.totalValue) * 100).toFixed(2)
    },
  },
  watch: {
    status: function () {
      this.getItems()
    },
  },
  created() {
    this.fetchSealedData()
  },
}
</script>

<style>
.w-100 {
    width: 100%;
}

</style>