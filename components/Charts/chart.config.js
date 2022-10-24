const footer = (tooltipItems) => {
  let sum = 0;
  console.log('tooltip',tooltipItems)
  tooltipItems.forEach(function(tooltipItem) {
    sum += tooltipItem.yLabel;
  });
  return 'Price: $' + sum;
};

export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860'
  }
}

export const baseChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'chartArea'
  },
  responsive: true
}

export const chartOptionsMain = {
  ...baseChartOptions,
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  tooltips: {
    backgroundColor: '#333',
    titleFontColor: '#FFF',
    bodyFontColor: '#CCC',
    bodySpacing: 4,
    xPadding: 12,
    yPadding: 8,
    mode: 'index',
    intersect: false,
    position: 'nearest',
    callbacks: {
      footer: footer,
    }
  },
  scales: {
    xAxes: [{
      time: {
        displayFormats: {
            quarter: 'MMM YYYY'
        }
      },
      gridLines: {
        drawBorder: false,
        color: 'rgba(0,0,0,0.025)',
        zeroLineColor: 'transparent',
        offsetGridLines: true,
        offset: true
      },
      ticks: {

        fontColor: '#ccc',
        beginAtZero: false,
        autoSkip: true,
        autoSkipPadding: 20,
        maxTicksLimit: 16

      }
    }],
    yAxes: [
      {

        gridLines: {
          drawBorder: false,
          color: 'rgba(0,0,0,0.05)',
          zeroLineColor: 'transparent'
        },

        ticks: {
          padding: 20,
          fontColor: '#9a9a9a',
          beginAtZero: false
        }
      }
    ],
  }
}
