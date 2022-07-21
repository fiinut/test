import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _036d30f2 = () => interopDefault(import('../pages/add-content.vue' /* webpackChunkName: "pages/add-content" */))
const _596f5d74 = () => interopDefault(import('../pages/client-home.vue' /* webpackChunkName: "pages/client-home" */))
const _088e8ab1 = () => interopDefault(import('../pages/client-preview.vue' /* webpackChunkName: "pages/client-preview" */))
const _01a31dcf = () => interopDefault(import('../pages/client-search.vue' /* webpackChunkName: "pages/client-search" */))
const _d780313e = () => interopDefault(import('../pages/edit-content.vue' /* webpackChunkName: "pages/edit-content" */))
const _3567070a = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _d5427e64 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _5c50ce6d = () => interopDefault(import('../pages/preview.vue' /* webpackChunkName: "pages/preview" */))
const _32bff405 = () => interopDefault(import('../pages/style-guide.vue' /* webpackChunkName: "pages/style-guide" */))
const _6891c492 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/add-content",
    component: _036d30f2,
    name: "add-content"
  }, {
    path: "/client-home",
    component: _596f5d74,
    name: "client-home"
  }, {
    path: "/client-preview",
    component: _088e8ab1,
    name: "client-preview"
  }, {
    path: "/client-search",
    component: _01a31dcf,
    name: "client-search"
  }, {
    path: "/edit-content",
    component: _d780313e,
    name: "edit-content"
  }, {
    path: "/home",
    component: _3567070a,
    name: "home"
  }, {
    path: "/login",
    component: _d5427e64,
    name: "login"
  }, {
    path: "/preview",
    component: _5c50ce6d,
    name: "preview"
  }, {
    path: "/style-guide",
    component: _32bff405,
    name: "style-guide"
  }, {
    path: "/",
    component: _6891c492,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
