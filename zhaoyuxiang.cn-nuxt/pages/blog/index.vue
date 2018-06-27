<template>
  <ul class="blogs">
    <li v-for="(post, index) in list" :key="index">
      <nuxt-link :to="`/blog/${post.id}`">{{post.title}}</nuxt-link>
      <button @click="deletePost(post.id)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  layout: 'page',

  head () {
    return {
      title: '博客列表'
    }
  },

  data() {
    return {
      list: [],
      page: 1
    }
  },

  mounted() {
    this.$axios({
      type: 'graphql',
      query: `{
        posts(page: ${this.page++}) {
          id,
          title,
          content,
          created_at
        }
      }`
    })
    .then(res => {
      this.list = res.data.posts
    })
  },

  methods: {
    deletePost(id) {
      this.$axios({
        type: 'graphql',
        query: `mutation {
          deletePost(id: "${id}") {
            title,
            content
          }
        }`
      })
      .then(res => {
        console.log(res)
      })
    }
  }
}
</script>