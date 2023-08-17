export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EchoMTG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv' :"Permissions-Policy",  content: "interest-cohort=()" }

    ],
    link: [
      { 
        rel: 'icon', 
        type: 'image/x-icon', 
        href: 'https://storage.googleapis.com/assets.echomtg.com/interface/echo.png' 
      },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css'},
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/mana-font@latest/css/mana.css'},
      { rel: 'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css'
      }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   '@/assets/scss/main.scss'
  // ],
    css: ['@/assets/scss/style-light-dark.scss'],
  //  css: ['~/assets/scss/style-default.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    { src: '~/plugins/echomtg.js' },
    {src: '~/plugins/chart/chart.js', mode: 'client'}
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,
  middleware: ['mw'],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module'
    '@nuxtjs/dotenv',
    '@nuxtjs/moment'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
     // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
    '@nuxtjs/device',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    '@nuxtjs/markdownit'
  ],
  device: {
    refreshOnResize: true
  },
  axios: {},
  markdownit: {
    runtime: true
  },
  gtm: {
    id: 'GTM-5S54B96'
  },
  router: {
    middleware: 'mw'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc

    }
  },
  env: {
    API_DOMAIN: process.env.API_DOMAIN || 'https://api.echomtg.com/api/',
    S2S_KEY: process.env.S2S_KEY || ''

  },
  publicRuntimeConfig: {
    API_DOMAIN: process.env.API_DOMAIN || 'https://api.echomtg.com/api/',
    VUE_APP_API_DOMAIN: process.env.API_DOMAIN || 'https://api.echomtg.com/api/'
  },
  privateRuntimeConfig: {
    S2S_KEY: process.env.S2S_KEY
  }


}
