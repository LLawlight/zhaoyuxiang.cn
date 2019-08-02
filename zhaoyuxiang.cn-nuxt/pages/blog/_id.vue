<template>
  <div class="blog-post">
    <article>
      <img class="cover" :src="post.cover" />
      <h1>{{post.title}}</h1>
      <div class="markdown-body" v-html="post.content"></div>
    </article>

    <div id="comments"></div>
  </div>
</template>

<script>
import marked from '~/plugins/marked'
import axios from '~/plugins/axios'

export default {
  layout: 'page',

  head () {
    return {
      title: this.post.title
    }
  },

  asyncData({params}) {
    return axios({
      type: 'graphql',
      query: `{
        post(id: "${params.id}") {
          title,
          cover,
          content,
          created_at
        }
      }`
    })
    .then(res => {
      const post = res.data.post
      post.content = marked(post.content)

      return {
        post
      }
    })
  }
}
</script>

<style lang="less">
.blog-post {
  max-width: 768px;
  margin: auto;

  .cover {
    width: 100%;
  }
}
</style>

