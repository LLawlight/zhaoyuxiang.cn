import * as axios from 'axios'
import config from '../nuxt.config'


const options = {}

if (config.dev) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 7001}/graphql`
}
else {
  options.baseURL = 'https://api.zhaoyuxiang.cn/graphql'
}

const instance = axios.create(options);

instance.interceptors.request.use(function (config) {
  if (process.server) {
    config.headers = {'Content-Type': 'application/json'}
  }
  else if (process.client) {
    config.headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
  }

  if (config.type == 'graphql') {
    config.method = 'post'
    config.data = {}
    config.data.query = config.query
    config.data = JSON.stringify(config.data)
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  if (response.data.errors && response.data.errors.length) {
    const errorMessage = response.data.errors[0].message

    if (errorMessage.status == 401) {
      if (window) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('is_admin')
      }
    }

    return Promise.reject(errorMessage)
  }
  else {
    return response.data
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance