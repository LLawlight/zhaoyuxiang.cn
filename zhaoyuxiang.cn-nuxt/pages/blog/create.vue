<template>
<div class="blog-create">
  <input type="text" v-model="title" />
  <div class="edit-area">
    <textarea v-model="content" spellcheck="false"></textarea>
    <div class="preview-area">
      <div class="markdown-body" v-html="previewContent"></div>
    </div>
  </div>
  <button @click="submit">提交</button>
</div>
</template>

<script>
import marked from 'marked'

export default {
  head () {
    return {
      title: '创建文章'
    }
  },

  data() {
    return {
      id: '',
      title: '',
      content: ''
    }
  },

  computed: {
    previewContent() {
      return marked(this.content)
    }
  },

  mounted() {
    this.id = this.$route.query.id

    if (this.id) {
      this.getPost()
    }
  },

  methods: {
    submit() {
      this.$axios({
        type: 'graphql',
        query:
          `mutation {
            createPost(title: "${this.title}", content: "${this.content.replace(/\n/g, '\\n')}", id: "${this.id}") {
              title,
              content
            }
          }`
      })
      .then(res => {
        console.log('res', res)
        // this.$router.back()
      })
      .catch(err => {
        console.log('err123', err)
      })
    },

    getPost() {
      this.$axios({
        type: 'graphql',
        query: `{
          post(id: "${this.$route.query.id}") {
            title,
            content,
            created_at
          }
        }`
      })
      .then(res => {
        const { title, content } = res.data.post
        this.title = title
        // post.content = marked(post.content)
        this.content = content
      })
    }
  }
}
</script>

<style lang="less">
.blog-create {
  .edit-area {
    border: 1px solid black;
    min-height: 500px;
    display: flex;

    textarea, .write-area {
      resize: none;
      width: 50%;
      border: none;
    }

    .preview-area {
      position: relative;
      width: 50%;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: black;
      }
    }
  }
}
</style>


