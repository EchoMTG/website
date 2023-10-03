function adminMenu() {
  return [{
    to: '/admin/',
    icon: 'chart-box-outline',
    label: 'Admin Dashboard'
  },
  {
    to: '/admin/users/',
    icon: 'account-group',
    label: 'App Users'
  },
  {
    to: '/admin/financials/',
    icon: 'finance',
    label: 'App Financials'
  }]
}

export default adminMenu;
