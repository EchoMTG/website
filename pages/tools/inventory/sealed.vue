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
                    <span class="title percentage red down" v-if="difference <= 0">{{gainloss}}%</span>
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
            <b-table class="my-3"
              :data="sealedItems"
              :striped="true"
              :narrowed="true"
              :focusable="true"
              default-sort="name"
              default-sort-direction="asc"
              >

                <b-table-column field="name" label="Item Name" v-slot="props" sortable>
                    <a v-bind:href="props.row.echo_set_url"><img v-bind:src="props.row.set_image" style="max-height:18px; max-width:14px" /></a>
                    <a v-bind:href="props.row.echo_set_url">{{props.row.name}}</a>
                </b-table-column>
                <b-table-column field="tcg_mid" label="Current Price" v-slot="props" sortable>
                  {{symbol}} {{props.row.tcg_mid}}
                </b-table-column>
                <b-table-column field="price_acquired" label="Acquired For" v-slot="props" sortable>
                  {{symbol}} <input class="adjust-box" data-call="inventory/adjust/" @change="updatePrice($event, props.row)" :value="props.row.price_acquired"/>
                </b-table-column>
                <b-table-column field="date_acquired" label="Date Acquired" v-slot="props" sortable>
                  <input class="adjust-box input is-small acquired-date-input" type="date"  data-call="inventory/adjust_date/" @change="updateDate($event, props.row)" :value="props.row.date_acquired_html"/>
                </b-table-column>
                <b-table-column field="gain" label="7 Day Change" v-slot="props" sortable>
                  <span class="percentage red down" v-if="props.row.gain < 0">{{props.row.gain}}%</span>
                  <span class="percentage green up" v-if="props.row.gain > 0">{{props.row.gain}}%</span>
                </b-table-column>
                <b-table-column v-slot="props">
                  <button class="ignore  button small black has-background-black has-text-white pull-right" :data-id="props.row.id" @click="deleteItem(props.row.inventory_id)" href="javascript:void(0);">
                  <span class="fa fa-trash"></span> </button>
                </b-table-column>
            </b-table>
        </div>
    </div>
</template>
<script>

import GlobalSearch from '@/components/GlobalSearch'
export default {
  components: { GlobalSearch },
  //props: ['symbol'],
  data() {
    return {
      limit: 1000,
      start: 0,
      status: 0,
      symbol: '$',
      sealed: [],
      search: '',
    }
  },
  methods: {
    fetchSealedData(){
      let token = this.$cookies.get('token');
      let url = `${this.$config.API_DOMAIN}/inventory/view/?start=${this.start}&limit=${this.limit}&auth=${token}&set_code=`
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
              console.log('sealed',this.sealed);

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
      let token = this.$cookies.get('token');
      fetch(`${this.$config.API_DOMAIN}/inventory/remove/?inventory_id=${id}&auth=${token}`).then(
        (response) => {
          this.updateStatus()
        }
      )
    },
    addSealed(itemid) {
      let token = this.$cookies.get('token');
      var postBody = {
        emid: itemid,
        quantity: 1,
        language: 'EN',
      }
      var apiURL = `${this.$config.API_DOMAIN}/inventory/add/?auth=${token}`
      fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(postBody),
      })
        .then((res) => res.json())
        .then((res) => {
          createGrowl(res.message)
          this.updateStatus()
        })
    },
    updateStatus: function updateStatus() {
      this.status++
    },
    updatePrice(input, item) {
      let token = this.$cookies.get('token');
      let id = item.inventory_id;
      let value = input.target.value;

      let url = `${this.$config.API_DOMAIN}/inventory/adjust/id=${id}&value=${value}&auth=${token}`;
      fetch(url).then(response => response.json())
        .then(data=> {
          console.log(data);
        })
    },
    updateDate(input, item) {
      let token = this.$cookies.get('token');
      let id = item.inventory_id;
      let value = input.target.value;

      let url = `${this.$config.API_DOMAIN}/inventory/adjust_date/id=${id}&value=${value}&auth=${token}`;
      fetch(url).then(response => response.json())
        .then(data=> {
          console.log(data);
        })
    }
  },
  computed: {
    sealedItems() {
      if (this.search == '') return this.sealed

      return this.sealed.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    totalValue() {
      return this.sealed.reduce((total, r) => total + parseFloat(r.tcg_mid), 0).toFixed(2);
    },
    acquiredForValue() {
        return this.sealed.reduce((total, r) => total + parseFloat(r.price_acquired), 0).toFixed(2);
    },
    difference() {
      return (this.totalValue - this.acquiredForValue).toFixed(2)
    },
    gainloss() {
      return ((this.difference / this.totalValue) * 100).toFixed(2)
    },
  },
  watch: {
    status: function () {
      this.fetchSealedData()
    },
  },
  created() {
    this.fetchSealedData()
  },
  mounted() {
  }
}
</script>

