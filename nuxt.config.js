module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'custom-bot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Project to test bot customization on dialogflow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'}
    ],
    script: [
      { src: '/js/recorder.js' }
    ]
  },
  modules: [
    ['nuxt-sass-resources-loader', './assets/main.scss'],
    '@nuxtjs/font-awesome',
    '@nuxtjs/axios',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'rgb(221, 209, 209)' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Server Middleware
  */
  serverMiddleware: [
    '~/handlers/index.js'
  ],
  axios: {
    baseUrl: process.env.API_URL || 'http://localhost:3000'
  },
  plugins: [
    { src: '~/plugins/recorder', ssr: false },
  ],
}
