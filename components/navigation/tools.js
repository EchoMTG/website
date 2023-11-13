function toolsMenu(options={'tradesurl' :'/traders/'}) {
 return [{
  to: '/',
  icon: 'home-analytics',
  label: 'Dashboard'
},
{
  to: '/apps/inventory/',
  icon: 'book-open-page-variant-outline',
  label: 'Collection Inventory'
},
{
  to: '/apps/lists/',
  icon: 'clipboard-list',
  label: 'Lists/Decks'
},
{
  to: '/apps/earnings/',
  icon: 'cash-multiple',
  label: 'Earnings'
},
{
  to: '/apps/watchlist/',
  icon: 'table-headers-eye',
  label: 'Watchlist'
},
{
  to: options.tradesurl,
  icon: 'swap-horizontal-bold',
  label: 'Trades'
},
{
  to: '/apps/sealed/',
  icon: 'gift',
  label: 'Sealed'
},
{
  to: '/apps/statistics/',
  icon: 'chart-pie',
  label: 'Statistics'
},
{
  to: '/apps/import/',
  icon: 'file-upload-outline',
  label: 'Import'
},

]
}

export default toolsMenu;
