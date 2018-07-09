<template>
  <div class="home">
    <header>
      <nav>
        <nuxt-link to="/blog">博客</nuxt-link>
        <nuxt-link to="/friends">友链</nuxt-link>
        <nuxt-link to="/about">关于</nuxt-link>
      </nav>
    </header>
    <main>
      <logo v-if="logoWidth" :size="logoWidth" />
    </main>
    <footer>
      <p>Made with ❤ by L·Lawliet</p>
      <p>&copy; 1993 - {{nowYear}}</p>
    </footer>
  </div>
</template>

<script>
import logo from '~/components/logo.vue'

export default {
  head () {
    return {
      title: '首页'
    }
  },

  data() {
    return {
      logoWidth: '',
      nowYear: new Date().getFullYear()
    }
  },

  components: {
    logo
  },

  mounted() {
    this.renderLogo()
  },

  methods: {
    renderLogo() {
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight - 64 * 2

      this.logoWidth = (width < height ? width : height) * .8
    }
  }
}
</script>

<style lang="less">
.home {
  background: black;
  color: white;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  header, footer {
    padding: 0 32px;
    height: 64px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  main {
    text-align: center;
  }

  footer {
    flex-direction: column;
  }

  nav {
    a {
      color: white;
      padding: 0 16px;
    }
  }
}
</style>