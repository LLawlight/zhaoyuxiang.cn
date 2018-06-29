let nuxtConfig = require('./nuxt.config.js')

let config = {}

if (nuxtConfig.dev) {
  config = {
    github: {
      client_id: '96d281e838dbce3f2d1d'
    }
  }
}
else {
  config = {
    github: {
      client_id: '0dcf34c3cea92290a532'
    }
  }
}

export default config