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

        <h1 class="title is-size-5 mt-3">{{item.card_name}}</h1>
        <h2 class="subtitle is-size-6 mb-0">{{item.expansion}}</h2>
        <div class="content">
          <p>{{item.card_text}}</p>
        </div>

      </div>
      <div class="column is-one-quarter">
         <card-component
          title="Lifetime Price History"
          icon="finance"
          header-icon="reload"
          @header-icon-click="true"
        >
          <!-- <div v-if="defaultChart.chartData" class="chart-area">
            <line-chart
              ref="bigChart"
              style="height: 100%"
              chart-id="big-line-chart"
              :chart-data="defaultChart.chartData"
              :extra-options="defaultChart.extraOptions"
            />
          </div> -->
        </card-component>

      </div>
    </div>
      {{item.card_name}}
   </div>

</template>

<script>
import SetView from '@/components/sets/SetView'
import EchoBreadCrumbs from '~/components/navigation/EchoBreadCrumbs.vue';
import LineChart from '@/components/Charts/LineChart'


export default {
  name: 'Expansion',
  components: {
    SetView,
    EchoBreadCrumbs,
    LineChart
  },
  props: {

  },
  data () {
    return {
      item: {
        name: '',
      },
    }
  },
  async asyncData({ params, redirect, $config, env }) {

    let emid = params.emid;
    let item;

    // fetch the set
    let endpoint = `${$config.API_DOMAIN}data/item/?emid=${emid}`;

    const res = await fetch(
      endpoint, {
        headers: {
          'Authorization' : 'Bearer ' + $config.S2S_KEY
        }
      }
    );

    // try to get the json
    try {
      item = await res.json();
      console.log('fetching item from', item)
    } catch(err){
      console.log(err, res)
    }

    // return it
    if (item) {
      return {
        item
      }
    } else {
      redirect('/sets/')
    }
  },
  methods: {

    makeSetPath(code, path_part){
      return `/set/${code}/${path_part}/`
    }

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
