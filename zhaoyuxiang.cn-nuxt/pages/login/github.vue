<template>
  <div>code: {{code}}</div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  head () {
    return {
      title: '授权登录'
    }
  },

  data() {
    return {
      code: this.$route.query.code
    }
  },

  // asyncData({query, redirect}) {
  //   return axios({
  //     type: 'graphql',
  //     query: `{
  //       user(code: "${query.code}") {
  //         token,
  //         is_admin
  //       }
  //     }`
  //   })
  //   .then(res => {
  //     const { token, is_admin: isAdmin } = res.data.user
  //     return {
  //       token,
  //       isAdmin
  //     }
  //     // localStorage.setItem('token', res.data.user.token)
  //     // localStorage.setItem('is_admin', res.data.user.is_admin)
  //     // this.$router.replace('/')
  //   })
  //   .catch(err => {
  //     console.log('授权请求超时，请重试', err)
  //     redirect('/')
  //   })
  // },

  mounted() {
    axios({
      type: 'graphql',
      query: `{
        user(code: "${this.code}") {
          token,
          is_admin
        }
      }`
    })
    .then(res => {
      localStorage.setItem('token', res.data.user.token)
      localStorage.setItem('is_admin', res.data.user.is_admin)
      this.$router.replace('/')
    })
    .catch(err => {
      console.log('授权请求超时，请重试')
      this.$router.replace('/')
    })
  }
}
</script>