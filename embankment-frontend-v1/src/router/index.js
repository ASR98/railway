import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import EarthworkCalculation from '../components/EarthworkCalculation';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'earthwork-calculation',
    component: EarthworkCalculation
  },
  {
    path: 'dashboard',
    name: 'app-dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
