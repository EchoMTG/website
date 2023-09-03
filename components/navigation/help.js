function helpMenu() {
  return [
    {
      to: '/help/support/',
      icon: 'lifebuoy',
      label: 'General Support',
      description: 'General Support information.'
    },
    {
      to: '/help/faqs/',
      icon: 'chat-question',
      label: 'Frequently Asked Questions',
      description: 'Frequently Asked Questions and Answers users commonly ask about EchoMTG'
    },
    {
      to: '/help/contributing/',
      icon: 'github',
      label: 'Contributing',
      description: 'Learn about the options for contributing'
    },
    {
      to: '/help/report-bug/',
      icon: 'bug-outline',
      label: 'Report Bug',
      description: 'Report an issue with the website or mobile apps.'
    }
    ,
    {
      to: '/help/billing/',
      icon: 'credit-card',
      label: 'Billing Questions',
      description: 'How billing works and how to get something fixed.'
    }
  ]
}
 export default helpMenu;
