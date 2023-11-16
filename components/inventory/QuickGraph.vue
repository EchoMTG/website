<template>
  <line-chart
        :chart-data="chartData"
        :chart-id="`cardLineChart-${inventory_id}-${emid}`"
        :chart-options="extraOptions"
      />
</template>
<script>
import * as chartConfig from '@/components/Charts/chart.config'

export default {

 name: 'QuickGraph',
 data() {
    return {
      prices: {
        foil: [],
        date: [],
        regular: []
      },
      pointdata: [],
      extraOptions: chartConfig.chartOptionsMain
  }
 },
 props: {
  callback: {
    type: Function,
    required: false
  },
  inventory_id: {
    type: Number,
    required: false,
    default: 0
  },
  acquired_price: {
    type: Number,
    required: false,
    default: 0,
  },
  foil: {
    type: Number,
    required: false,
    default: null
  },
  acquired_date: {
    required: false
  },
  emid: {
    type: Number,
    required: true
  }
 },
 async created() {
  await this.getPriceData()
 },
 computed: {

  chartData() {
    let cd = {
      datasets: [],
      labels: this.prices.date
    }



    if(this.acquired_price){
      cd.datasets.push({
        label: 'Your Purchase',
        backgroundColor: '#009900',
        borderColor: '#CCCCCC',
        fill: false,
        pointRadius: 10,
        pointHoverRadius: 15,
        data: this.pointdata,
        parsing: {
          yAxisKey: 'user',
          xAxisKey: 'x'
        }
      })
    }
    if(this.foil == 0 || this.foil == null){
      cd.datasets.push({
        label: 'Regular',
        backgroundColor: '#666666',
        borderColor: '#666666',
        pointRadius: 3,
        tension: 0.4,
        spanGaps: true,
        pointHoverRadius: 8,
        fill: false,
        data: this.prices.regular
      });
    }
    if(this.foil == 1 || this.foil == null){
      cd.datasets.push({
          label: 'Foil',
          backgroundColor: '#b08716',
          borderColor: '#b08716',
          spanGaps: true,
          fill: false,
          pointRadius: 3,
          tension: 0.4,
          pointHoverRadius: 8,
          data: this.prices.foil

      })
    }
    return cd
  }
},
methods: {
  async getPriceData() {
    const dataEndpoint = `${this.$config.API_DOMAIN}data/item_history/?emid=${this.emid}`;

    const dataRes = await fetch(
      dataEndpoint, {
        headers: {
          'Authorization' : 'Bearer ' + this.$cookies.get('token')
        }
      }
    );
    let priceData = await dataRes.json();
    let point_data = []
    if(priceData.status == "success"){
       if(this.acquired_price){
          priceData.data.date.push(this.$moment(this.acquired_date, ['DD-MM-YYYY', 'MM-DD-YYYY']).format('YYYY-MM-DD'))
          point_data.push({
            user: this.acquired_price,
            x: this.$moment(this.acquired_date, ['DD-MM-YYYY', 'MM-DD-YYYY']).format('YYYY-MM-DD'),
          })
        }

      priceData.data.date = priceData.data.date.sort((a,b) => this.$moment(a,['YYYY-MM-DD','YYYY-DD-MM']).format('X') - this.$moment(b,['YYYY-MM-DD','YYYY-DD-MM']).format('X'));

      this.prices = priceData.data;
      this.pointdata = point_data;
    } else {
      this.$buefy.toast.open({
        message: `Failed to fetch data for graph`,
        type: 'is-danger'
      })
    }
  }
 }
}
</script>
