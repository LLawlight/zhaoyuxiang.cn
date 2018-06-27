<template>
<div class="blog-create">
  <input type="text" v-model="title" />
  <div class="edit-area">
    <textarea v-model="content"></textarea>
    <div class="preview-area" v-html="previewContent"></div>
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
      title: '',
      content: ''
    }
  },

  computed: {
    previewContent() {
      return marked(this.content)
    }
  },

  methods: {
    submit() {
      this.$axios({
        type: 'graphql',
        query:
          `mutation {
            createPost(title: "${this.title}", content: "${this.content}") {
              title,
              content
            }
          }`
      }, res => {
        console.log(res)
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


