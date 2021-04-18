import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/checkin',
    name: 'checking',
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckinPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
