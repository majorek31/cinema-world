import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterView
    }
  ]
})
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if (!to.meta.protected) return
  if (!(await authStore.isLoggedIn)) return { name: 'login' }
  return
})
export default router
