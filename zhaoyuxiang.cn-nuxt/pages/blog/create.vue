<template>
<div class="blog-create">
  <input type="text" v-model="title" class="title"/>
  <div class="tools">
    <input type="file" @change="uploadImage" accept="image/*">
    <wired-button @click="submit">提交</wired-button>
  </div>
  <img class="cover" :src="cover" />
  <div class="edit-area">
    <textarea v-model="content" spellcheck="false"></textarea>
    <div class="preview-area markdown-body" v-html="previewContent"></div>
  </div>
</div>
</template>

<script>
import marked from '~/plugins/marked'
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
            createPost(title: "${this.title}", cover: "${this.cover}", content: ${JSON.stringify(this.content)}, id: "${this.id}") {
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
        domain: '//upyun.res.zhaoyuxiang.cn',
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
  font-size: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .title {
    display: block;
    width: 100%;
    padding: 10px 40px;
    font-size: 30px;
    font-weight: 400;
    box-sizing: border-box;
    border: none;
    outline: none;
  }

  .tools {
    padding: 11px 14px;
    background-color: #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cover {
    width: 100%;
  }

  .edit-area {
    display: flex;
    flex: 1;

    textarea, .preview-area  {
      padding: 40px 40px 80px 40px;
      box-sizing: border-box;
    }

    textarea {
      resize: none;
      width: 50%;
      border: none;
      border-right: 1px solid #d9d9d9;
    }

    .preview-area {
      position: relative;
      width: 50%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>


