<template>
  <ul class="blogs">
    <li v-for="(post, index) in list" :key="index">
      <nuxt-link :to="`/blog/${post.id}`">
        <h3>{{post.title}}</h3>
        <div class="post-main">
          <div class="cover" v-if="post.cover">
            <img :src="post.cover" />
          </div>
          <div class="content">
            <p>{{post.content}}</p>
          </div>
        </div>
      </nuxt-link>
      <div class="footer">
        <span class="c">创建于{{post.created_at}}</span>
        <div class="action-buttons" v-if="isHost">
          <wired-button @click="editPost(post.id)">修改</wired-button>
          <wired-button @click="deletePost(post.id, index)">删除</wired-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'page',

  head () {
    return {
      title: '博客列表'
    }
  },

  asyncData() {
    return axios({
      type: 'graphql',
      query: `{
        posts(page: 1) {
          id,
          title,
          cover,
          content,
          created_at
        }
      }`
    })
    .then(res => {
      return {
        list: res.data.posts
      }
    })
  },

  data() {
    return {
      list: [],
      page: 2,
      isHost: false,
      isLoading: false,
      isLastPage: false
    }
  },

  beforeRouteLeave(to, from, next) {
    window.onscroll = null

    next()
  },

  mounted() {
    this.isHost = localStorage.getItem('is_admin') == 'true'

    window.onscroll = this.throttle(() => {
      const scrollTop = document.documentElement.scrollTop
      const bodyHeight = document.querySelector('body').clientHeight
      const windowHeight = window.innerHeight

      if (bodyHeight - (scrollTop + windowHeight) < 100) {
        this.getPostList()
      }
    }, 1000)
  },

  methods: {
    getPostList() {
      if (this.isLoading || this.isLastPage) return

      this.isLoading = true
      axios({
        type: 'graphql',
        query: `{
          posts(page: ${this.page++}) {
            id,
            title,
            cover,
            content,
            created_at
          }
        }`
      })
      .then(res => {
        const list = res.data.posts

        this.list = this.list.concat(list)
        this.isLoading = false

        if (list.length < 10) {
          this.isLastPage = true
        }
      })
    },

    editPost(id) {
      this.$router.push(`/blog/create?id=${id}`)
    },

    deletePost(id, index) {
      axios({
        type: 'graphql',
        query: `mutation {
          deletePost(id: "${id}") {
            title,
            content
          }
        }`
      })
      .then(res => {
        this.list.splice(index, 1);
      })
    },

    throttle(fn, delay) {
      let startTime = 0

      return function() {
        const currtTime = +new Date()

        if (currtTime - startTime >= delay) {
          fn.apply(this, arguments)
          startTime = currtTime
        }
      }
    }
  }
}
</script>

<style lang="less">
.blogs {
  .post-main {
    display: flex;

    .cover {
      width: 160px;
      height: 90px;
      flex-shrink: 0;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      p {
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.5;
        color: #444;
      }
    }
  }

  .footer {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #8590a6;

    .action-buttons {
      flex-shrink: 0;

      wired-button {
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    .post-main {
      flex-direction: column;

      .cover {
        width: 100%;
        height: 180px;
        margin-right: 0;
        margin-bottom: 10px;
      }

      .content {
        p {
          -webkit-line-clamp: 3;
        }
      }
    }
  }
}
</style>
