function adminMenu() {
  return [{
    to: '/admin/',
    icon: 'poll',
    label: 'App Stats'
  },
  {
    to: '/admin/users/',
    icon: 'account-group',
    label: 'App Users'
  }]
}

export default adminMenu;
