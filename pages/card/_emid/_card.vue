<template>
  <div>
    <echo-bread-crumbs :data="crumbs" />
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="cardImageContainer m-3">
          <b-image
              :src="item.image"
              placeholder="https://assets.echomtg.com/magic/cards/magic-card-back.jpg"

          ></b-image>
        </div>
      </div>
      <div class="column">

        <line-chart
          :chart-data="chartData"
          :chart-options="extraOptions"
          chart-id="cardLineChart"
        />

      </div>
      <div class="column is-one-quarter">



      </div>
    </div>

    <hr />

    <div class="message m-4 p-4">

        <h1 class="title is-size-5 mt-3">{{item.card_name}}</h1>
        <h2 class="subtitle is-size-6 mb-0">{{item.expansion}}</h2>
        <div class="content">
          <p>{{item.card_text}}</p>
        </div>
    </div>
  </div>

</template>

<script>
import SetView from '@/components/sets/SetView'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import LineChart from '@/components/Charts/LineChart'
import * as chartConfig from '@/components/Charts/chart.config'


export default {
  name: 'Expansion',
  components: {
    SetView,
    EchoBreadCrumbs,
    LineChart
  },
  data () {
    return {
      item: {
        name: '',
      },
      prices: {
        foil: [],
        regular: [],
        date: []
      },
      extraOptions: chartConfig.chartOptionsMain
    }
  },
  async asyncData({ params, redirect, $config }) {

    let emid = params.emid;
    let item, res, dataRes;
    let prices = {
      'date' : [],
      'regular': [],
      'foil' : []
    }

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/item/?emid=${emid}`;
    let dataEndpoint = `${$config.API_DOMAIN}data/item_history/?emid=${emid}`;
    // try to get the json
    try {
      res = await fetch(
        endpoint, {
          headers: {
            'Authorization' : 'Bearer ' + $config.S2S_KEY
          }
        }
      );
      item = await res.json();

      dataRes = await fetch(
        dataEndpoint, {
          headers: {
            'Authorization' : 'Bearer ' + $config.S2S_KEY
          }
        }
      );
      let priceData = await dataRes.json();

      prices = priceData.data;


    } catch(err){
      console.log(err, res)
    }

    // return it
    if (item) {
      return {
        item, prices
      }
    } else {
      //redirect('/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    },


  },
  computed: {
    crumbs () {
      return [
        {
          label: 'Expansions',
          url: '/sets/',
          icon: ''
        },
        {
          label: this.item.name,
          url: this.$nuxt.$route.path,
          icon: ''
        }
      ]
    },
    chartData() {
      return {
        labels: this.prices.date,
        datasets: [
          {
            label: 'Regular',
            backgroundColor: '#666666',
            fill: false,
            data: this.prices.regular
          },
           {
            label: 'Foil',
            backgroundColor: '#b08716',
            fill: false,
            data: this.prices.foil
          }
        ]
      }
    }
  },
  head () {
    return {
        title: `${this.item.card_name} Price ${this.item.expansion} MTG `,
        description: `Card Images and Prices for the Magic the Gathering set ${this.item.card_name}, ${this.item.expansion}`
    }
  }

}
</script>
