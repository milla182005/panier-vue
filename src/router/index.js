import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CartPage from '@/views/CartPage.vue'
import ContactPage from '@/views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/panier',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // 🔹 Revenir en haut de la page à chaque changement de route
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
