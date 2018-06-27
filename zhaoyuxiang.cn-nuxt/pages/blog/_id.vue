<template>
  <article class="blog-post">
    {{post.title}}
    <div v-html="post.content"></div>
  </article>
</template>

<script>
import marked from 'marked';

export default {
  layout: 'page',

  head () {
    return {
      title: this.$route.params.id
    }
  },

  data() {
    return {
      post: {}
    }
  },

  mounted() {
    this.getPost()
  },

  methods: {
    getPost() {
      this.$axios({
        type: 'graphql',
        query: `{
          post(id: "${this.$route.params.id}") {
            title,
            content,
            created_at
          }
        }`
      })
      .then(res => {
        const post = res.data.post
        post.content = marked(post.content)
        this.post = post
      })
    }
  }
}
</script>
