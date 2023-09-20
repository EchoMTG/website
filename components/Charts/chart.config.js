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
    primary: '#62c462',
    info: '#5bc0de',
    danger: '#ee5f5b'
  }
}


// chartConfig.allChartColors.yellow,
// chartConfig.allChartColors.blue,
// chartConfig.allChartColors.black,
// chartConfig.allChartColors.red,
// chartConfig.allChartColors.green,
// chartConfig.allChartColors.gold,
// chartConfig.allChartColors.red,
// chartConfig.allChartColors.grey,
// chartConfig.allChartColors.brown

export const allChartColors = {
  red: '#ee5f5b',
  orange: '#f89406',
  yellow: '#cfb982',
  gold: '#cb8a29',
  brown: '#8f6712',
  green: '#62c462',
  purple: '#8a48c7',
  black: '#0d0323',
  blue: '#5bc0de',
  grey: '#52575C',
  darkgrey: '#3A3F44',
  lightgrey: '#7A8288',
  lightestgrey: '#98a4ad'
}

export const baseChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'chartArea'
  },
  responsive: true
}
export const chartOptionsBar = {
  ...baseChartOptions,
  tooltips: {
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
    x: {
      type: 'time'
    }
  }
}
