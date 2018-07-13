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

  asyncData({query}) {
    return axios({
      type: 'graphql',
      query: `{
        user(code: "${query.code}") {
          token,
          is_admin
        }
      }`
    })
    .then(res => {
      const { token, is_admin: isAdmin } = res.data.user
      return {
        token,
        isAdmin
      }
    })
  },

  mounted() {
    if (this.token) {
      localStorage.setItem('token', this.token)
      localStorage.setItem('is_admin', this.isAdmin)
      this.$router.replace(sessionStorage.getItem('last_url'))
    }
    else {
      console.log('授权失败，请重试')
      this.$router.replace(sessionStorage.getItem('last_url'))
    }
  }
}
</script>