<template>
  <div>code: {{code}}</div>
</template>

<script>
export default {
  data() {
    return {
      code: this.$route.query.code
    }
  },

  mounted() {
    this.$axios({
      type: 'graphql',
      query: `{
        user(code: "${this.code}") {
          token
        }
      }`
    })
    .then(res => {
      localStorage.setItem('token', res.data.user.token)
    })
  }
}
</script>