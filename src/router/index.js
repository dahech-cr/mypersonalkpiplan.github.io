import Vue from 'vue'
import VueRouter from 'vue-router'
import MainGroup from '../components/vGroups/vMainGroups.vue'
import MainSessionLesson from '../components/vSessionLesson/vMainSessionLesson.vue'
import MainTeacher from '../components/vTeacher/vMainTeacher.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/searchgroup',
    name: 'SearchGroup',
    component: MainGroup
  },
  {
    path: '/session',
    name: 'Session',
    component: MainSessionLesson
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: MainTeacher
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
