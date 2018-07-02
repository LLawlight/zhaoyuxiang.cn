const nuxtConfig = require('../nuxt.config')

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (!nuxtConfig.dev) {
      config.baseURL = 'http://118.24.52.91:7001/graphql'
    }

    if (config.type == 'graphql') {
      config.method = 'post'
      config.headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      config.data = {}
      config.data.query = config.query
      config.data = JSON.stringify(config.data)
    }
  })

  $axios.onResponse(response => {
    response = response.data
    return response
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}