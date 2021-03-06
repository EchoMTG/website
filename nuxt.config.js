export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'website',
    htmlAttrs: {
      lang: 'en',
      class: ['has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top']
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    script: [
        {
            type: 'text/javascript',
            src: '/cookiesClient.js',
            body: true
        },
    ],
    serverMiddleware: ['~/server-middleware/logger'],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://storage.googleapis.com/assets.echomtg.com/interface/echo.png' },
      { rel: 'stylesheet', href: '//rawgit.com/andrewgioia/Keyrune/master/css/keyrune.min.css'},
      { rel: 'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Nunito'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   '@/assets/scss/main.scss'
  // ],
  //css: ['~/assets/scss/style-light-dark.scss'],
   css: ['~/assets/scss/style-default.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    // { src: '~/plugins/global-components.js', mode: 'client' },
    //{ src: '~/plugins/cookiesServer.js', mode: 'server' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module'
    '@nuxtjs/dotenv'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
     // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
  ],
  axios: {},
  gtm: {
    id: 'GTM-5S54B96'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
      config.externals.moment = 'moment'
    }
  },
  publicRuntimeConfig: {
    API_DOMAIN: process.env.API_DOMAIN
  },
  privateRuntimeConfig: {
    S2S_KEY: process.env.S2S_KEY
  }
}
