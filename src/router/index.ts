import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import authMiddleware from "@/middleware/auth"; // Import middleware
import CategoryView from '../views/CategoryView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
       beforeEnter: authMiddleware
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      beforeEnter: authMiddleware
    },
    {
      path:'/register',
      name:'register',
      component:Register,
    },
    {
      path:'/category',
      name:'category',
      component:CategoryView,
      beforeEnter: authMiddleware
    }
  ],
})

export default router
