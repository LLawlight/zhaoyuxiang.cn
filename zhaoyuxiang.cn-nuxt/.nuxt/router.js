import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _1f6c005d = () => import('..\\pages\\friends.vue' /* webpackChunkName: "pages_friends" */).then(m => m.default || m)
const _6223eb56 = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */).then(m => m.default || m)
const _7979c690 = () => import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */).then(m => m.default || m)
const _6bd0fd14 = () => import('..\\pages\\login\\github.vue' /* webpackChunkName: "pages_login_github" */).then(m => m.default || m)
const _665675f4 = () => import('..\\pages\\blog\\create.vue' /* webpackChunkName: "pages_blog_create" */).then(m => m.default || m)
const _07e0ed20 = () => import('..\\pages\\blog\\_id.vue' /* webpackChunkName: "pages_blog__id" */).then(m => m.default || m)
const _22b435cc = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/friends",
			component: _1f6c005d,
			name: "friends"
		},
		{
			path: "/about",
			component: _6223eb56,
			name: "about"
		},
		{
			path: "/blog",
			component: _7979c690,
			name: "blog"
		},
		{
			path: "/login/github",
			component: _6bd0fd14,
			name: "login-github"
		},
		{
			path: "/blog/create",
			component: _665675f4,
			name: "blog-create"
		},
		{
			path: "/blog/:id",
			component: _07e0ed20,
			name: "blog-id"
		},
		{
			path: "/",
			component: _22b435cc,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
