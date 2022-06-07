import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView.vue'
import RegView from '../views/RegView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import("@/views/AuthView.vue"),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/RegView.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router