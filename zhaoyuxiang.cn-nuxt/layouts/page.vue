<template>
  <div class="page">
    <header>
      <div class="header">
        <div class="header-main">
          <nuxt-link class="logo-container" to="/">
            <logo />
          </nuxt-link>
          <div class="header-buttons">
            <a v-if="!isLogin" :href="loginHref"><wired-button>登录</wired-button></a>
            <nuxt-link v-if="isLogin && isHost" to="/blog/create"><wired-button>写文章</wired-button></nuxt-link>
          </div>
        </div>

        <nav>
          <nuxt-link to="/blog"><wired-button>博客</wired-button></nuxt-link>
          <nuxt-link to="/friends"><wired-button>友链</wired-button></nuxt-link>
          <nuxt-link to="/about"><wired-button>关于</wired-button></nuxt-link>
        </nav>
      </div>
    </header>
    <main>
      <div class="main">
        <nuxt/>
      </div>
    </main>
    <footer>
      <p>Made with ❤ by L·Lawliet</p>
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
      nowYear: new Date().getFullYear(),
      loginHref: `https://github.com/login/oauth/authorize?client_id=${config.github.client_id}`,
      isLogin: false,
      isHost: false
    }
  },

  components: {
    logo
  },

  mounted() {
    this.isLogin = !!localStorage.getItem('token')
    this.isHost = Boolean(localStorage.getItem('is_admin'))
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
    .header {
      max-width: 1024px;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .header-main {
        height: 66px;
        width: 100%;
        text-align: center;
        position: relative;

        .logo-container {
          padding: 6px;
          margin-top: 3px;
          border-radius: 6px;
          background: black;
          display: inline-block;
          font-size: 0;
        }

        .header-buttons {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 66px;

        a {
          margin: 0 16px;
        }
      }
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

  @media (max-width: 768px) {
    header, main {
      padding: 16px;
    }
  }
}
</style>