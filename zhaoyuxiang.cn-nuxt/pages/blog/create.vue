<template>
<div class="blog-create">
  <input type="text" v-model="title" />
  <input type="file" @change="uploadImage">
  <img class="cover" :src="cover" />
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
import md5 from 'blueimp-md5'
import axios from '~/plugins/axios'

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
      cover: '',
      content: ''
    }
  },

  computed: {
    previewContent() {
      return marked(this.content)
    }
  },

  mounted() {
    this.id = this.$route.query.id || ''

    if (this.id) {
      this.getPost()
    }
  },

  methods: {
    submit() {
      axios({
        type: 'graphql',
        query:
          `mutation {
            createPost(title: "${this.title}", cover: "${this.cover}", content: "${this.content.replace(/\n/g, '\\n')}", id: "${this.id}") {
              title,
              cover,
              content
            }
          }`
      })
      .then(res => {
        this.$router.back()
      })
      .catch(err => {
        console.log('catchError', err)
      })
    },

    getPost() {
      axios({
        type: 'graphql',
        query: `{
          post(id: "${this.$route.query.id}") {
            title,
            cover,
            content,
            created_at
          }
        }`
      })
      .then(res => {
        const { title, cover, content } = res.data.post
        this.title = title
        this.cover = cover
        // post.content = marked(post.content)
        this.content = content
      })
    },

    uploadImage(event) {
      const files = Array.from(event.target.files)
      const file = files[0]

      if (!file) return

      const upyun = {
        api: 'http://v0.api.upyun.com/',
        bucket: 'zhaoyuxiang',
        apiSecret: 'CF2g51Hq7uNp6rzIYJ0KnDj3Gpk=',
        domain: '//zhaoyuxiang.test.upcdn.net',
        'save-key': '/img/{year}{mon}{day}/{filemd5}{.suffix}'
      }

      const url = upyun.api + upyun.bucket

      let options = {}
      options.bucket = upyun.bucket
      options['save-key'] = upyun['save-key']
      options.expiration = Math.floor(new Date().getTime() / 1000) + 86400

      const policy = window.btoa(JSON.stringify(options))
      const signature = md5(policy + '&' + upyun.apiSecret)

      const params = new FormData()
      params.append('policy', policy)
      params.append('signature', signature)
      params.append('file', file)

      axios.post(url, params).then(res => {
        console.log(res)
        this.cover = upyun.domain + res.url
      })
    }
  }
}
</script>

<style lang="less">
.blog-create {
  .cover {
    width: 100%;
  }

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


