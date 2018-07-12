import * as axios from 'axios'

const options = {}

options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 7001}/graphql`

if (process.server) {
  options.headers = {'Content-Type': 'application/json'}
}
else if (process.client) {
  options.headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
}

const instance = axios.create(options);

instance.interceptors.request.use(function (config) {
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
    return Promise.reject(response.data.errors[0].message)
  }
  else {
    return response.data
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance