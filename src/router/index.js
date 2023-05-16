import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coin/:id',
      name: 'coin',
      // route level code-splitting
      // this generates a separate chunk (Coin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CoinView.vue')
    }
  ]
})

export default router
