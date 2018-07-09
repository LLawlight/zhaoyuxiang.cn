const nuxtConfig = require('../nuxt.config')

export default function ({ $axios, redirect }) {
  $axios.interceptors.response.use(function(response) {
    if (response.data.errors && response.data.errors.length) {
      return Promise.reject(response.data.errors[0].message)
    }
    else {
      return response.data
    }
  }, function(error) {
    return Promise.reject(error)
  })

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
    return response
  })

  $axios.onError(error => {
    if (error.status != 200) {
      error = {
        msg: '系统错误！'
      }
    }
    return Promise.reject(error)
  })
}