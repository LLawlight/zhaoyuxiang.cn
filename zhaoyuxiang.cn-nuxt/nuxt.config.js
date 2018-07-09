module.exports = {
  head: {
    titleTemplate: '%s - 华米兹之家',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  },

  css: [
    { src: '~assets/css/main.less', lang: 'less' },
    { src: '~assets/css/github-markdown.css', lang: 'css' }
  ],

  dev: (process.env.NODE_ENV !== 'production'),

  transition: 'page',

  modules: [
    '@nuxtjs/axios'
  ],

  plugins: ['~/plugins/axios'],

  axios: {
    host: '127.0.0.1',
    port: 7001,
    prefix: '/graphql'
  }
}