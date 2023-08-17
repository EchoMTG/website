const footer = (tooltipItems) => {
  let sum = 0;
  //console.log('tooltip',tooltipItems)
  tooltipItems.forEach(function(tooltipItem) {
    sum += tooltipItem.yLabel;
  });
  return 'Price: $' + sum.toLocaleString("en-US");
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
    // tension: {
    //   duration: 1000,
    //   easing: 'linear',
    //   from: 1,
    //   to: 0,
    //   loop: true
    // }
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
   
  }
}
