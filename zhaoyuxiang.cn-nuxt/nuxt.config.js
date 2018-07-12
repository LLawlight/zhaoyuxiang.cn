module.exports = {
  head: {
    titleTemplate: '%s - 华米兹之家',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' },
      { rel: 'favicon', href: 'favicon.ico' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover' }
    ],
    script: [
      { src: 'https://unpkg.com/wired-elements@latest/dist/wired-elements.bundled.min.js' }
    ],
  },

  css: [
    { src: '~assets/css/main.less', lang: 'less' },
    { src: '~assets/css/github-markdown.css', lang: 'css' }
  ],

  dev: (process.env.NODE_ENV !== 'production'),

  transition: 'page'
}