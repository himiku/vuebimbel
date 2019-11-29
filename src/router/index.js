import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/list-soal',
    name:'Listsoal',
    component:() => import('../views/Listsoal.vue')
  },
  {
    path:'/detil/:id',
    name:'Detilsoal',
    component:() => import('../views/Detilsoal.vue')
  },
  {
    path:'/edit-soal-no/:id/:no',
    name:'Editsoalno',
    component:() => import('../views/Editsoalno.vue')
  },
  {
    path:'/buat-paket-soal',
    name:'Buatsoal',
    component:() => import('../views/Buatsoal.vue')
  },
  {
    path:'/list-materi',
    name:'Listmateri',
    component:() => import('../views/Listmateri.vue')
  },
  {
    path:'/edit-materi/:tingkat/:mapel/:id',
    name:'Editmateri',
    component:() => import('../views/Editmateri.vue')
  },
  {
    path:'/edit-materi',
    name:'Buatmateri',
    component:() => import('../views/Editmateri.vue')
  },
  {
    path:'/list-user',
    name:'Listuser',
    component:() => import('../views/Listuser.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
