export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
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