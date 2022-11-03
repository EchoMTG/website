<template>
  <line-chart
        :chart-data="chartData"
        :chart-id="`cardLineChart-${inventory_id}-${emid}`"
        :chart-options="chartOptions"
      />
</template>
<script>

export default {

 name: 'QuickGraph',
 data() {
    return {
      prices: {
        foil: [],
        date: [],
        regular: []
      },
      pointdata: []
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
 created() {
  this.getPriceData()
 },
 computed: {

  chartData() {
    let cd = {
      datasets: []
    }

    if(this.acquired_price){
      cd.datasets.push({
        label: 'Your Purchase',
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        fill: false,
        pointRadius: 10,
        pointHoverRadius: 15,
        data: this.pointdata,
        parsing: {
          yAxisKey: 'user'
        }
      })
    }
    if(this.foil == 0 || this.foil == null){
      cd.datasets.push({
        label: 'Regular',
        backgroundColor: '#666666',
        borderColor: '#666666',
        pointRadius: 5,
        spanGaps: true,
        pointHoverRadius: 8,
        fill: false,
        data: this.pointdata,
        parsing: {
            yAxisKey: 'reg'
        }
      });
    }
    if(this.foil == 1 || this.foil == null){
      cd.datasets.push({
          label: 'Foil',
          backgroundColor: '#b08716',
          borderColor: '#b08716',
          spanGaps: true,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 8,
          data: this.pointdata,
          parsing: {
              yAxisKey: 'foil'
          }
      })
    }




    console.log(cd)
    return cd
  },
  chartOptions() {
    return {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time'
        }]
      },
      tooltip: {
        intersect: false,
    position: 'nearest',
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: 'true'
      },
      plugins: {
        legend: {
          display: false,

        }
      }

    }
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

    if(priceData.status == "success"){
       if(this.acquired_price){
          priceData.point_data.push({
            user: this.acquired_price,
            x: this.$moment(this.acquired_date, ['DD-MM-YYYY', 'MM-DD-YYYY']).format('YYYY-DD-MM'),
          })
        }

      priceData.point_data = priceData.point_data.sort((a,b) => this.$moment(a.x,['YYYY-MM-DD','YYYY-DD-MM']).format('X') - this.$moment(b.x,['YYYY-MM-DD','YYYY-DD-MM']).format('X'));
      console.log('sorting ' +  this.emid);
      console.log( priceData.point_data[0].x)
      console.log( this.$moment(priceData.point_data[0].x,['YYYY-MM-DD']).format('X'))
      this.prices = priceData.prices;
      this.pointdata = priceData.point_data;
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
