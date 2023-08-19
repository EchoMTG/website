function toolsMenu(options={'tradesurl' :'/apps/trades/'}) {
 return [{
  to: '/',
  icon: 'chart-timeline-variant-shimmer',
  label: 'Dashboard'
},
{
  to: '/apps/inventory/',
  icon: 'book-open-page-variant-outline',
  label: 'Inventory'
},
{
  to: options.tradesurl,
  icon: 'briefcase-arrow-left-right',
  label: 'Trades'
},
{
  to: '/apps/sealed/',
  icon: 'wallet-giftcard',
  label: 'Sealed'
},
{
  to: '/apps/lists/',
  icon: 'format-list-checkbox',
  label: 'Lists'
},
{
  to: '/apps/watchlist/',
  icon: 'eye',
  label: 'Watch List'
},
{
  to: '/apps/earnings/',
  icon: 'cash-multiple',
  label: 'Earnings'
}]}

export default toolsMenu;
