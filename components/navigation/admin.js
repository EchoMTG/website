function adminMenu() {
  return [{
    to: '/admin/',
    icon: 'chart-box-outline',
    label: 'Admin'
  },
  {
    to: '/admin/users/',
    icon: 'account-group',
    label: 'User Management'
  },
  {
    to: '/admin/performance/',
    icon: 'finance',
    label: 'Performance'
  },{
    to: '/admin/data_totals/',
    icon: 'database',
    label: 'Data Totals'
  }]
}

export default adminMenu;
