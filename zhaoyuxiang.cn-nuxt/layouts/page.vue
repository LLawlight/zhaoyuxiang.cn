<template>
  <div class="page">
    <header>
      <div class="header">
        <nuxt-link class="logo-container" to="/">
          <logo lineColor="white" />
        </nuxt-link>
        <nav>
          <nuxt-link to="/blog">博客</nuxt-link>
          <nuxt-link to="/friends">友链</nuxt-link>
          <nuxt-link to="/about">关于</nuxt-link>
        </nav>
      </div>
    </header>
    <main>
      <div class="main">
        <nuxt/>
      </div>
    </main>
    <footer>
      <p>Made with ❤ by <span @click="login">L·Lawliet</span></p>
      <p>&copy; 1993 - {{nowYear}}</p>
    </footer>
  </div>
</template>

<script>
import logo from '~/components/logo.vue'
import config from '../config.js'

export default {
  data() {
    return {
      nowYear: new Date().getFullYear()
    }
  },

  components: {
    logo
  },

  methods: {
    login() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${config.github.client_id}`
    }
  }
}
</script>


<style lang="less">
.page {
  margin: auto;
  color: black;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  footer {
    display: flex;
    align-items: center;
  }

  header, main {
    padding: 32px;
  }

  header {
    border-bottom: 1px solid gray;

    .header {
      max-width: 1024px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        margin-left: 16px;
      }
    }
    .logo-container {
      width: 56px;
      height: 56px;
      border-radius: 5px;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  main {
    flex: 1;

    .main {
      max-width: 1024px;
      margin: auto;
    }
  }

  footer {
    height: 64px;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>