import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AccountView from '@/views/panels/AccountView.vue'
import ContactView from '@/views/ContactView.vue'
import MovieView from '@/views/movie/MovieView.vue';
import MovieEditView from '@/views/movie/MovieEditView.vue';
import MovieSingle from '@/views/movie/MovieSingle.vue';
import MovieCreate from '@/views/movie/MovieCreate.vue';

import { useAuthStore } from '@/stores/auth.store'
import { useUserStore } from '@/stores/user.store'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
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
      component: RegisterView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'contact',
      path: '/contact',
      component: ContactView
    },
    {
      path: '/movie/create',
      component: MovieCreate,
      meta: {
        requireAuth: true,
        requireAdmin: true
      },
    },
    {
      path: '/movie/:id',
      component: MovieView,
      children: [
        {
          path: '',
          component: MovieSingle
        },
        {
          path: 'edit',
          component: MovieEditView,
          meta: {
            requireAuth: true,
            requireAdmin: true
          },
        }
      ]
      // children: [
      //   {
      //     path: ':id',
      //   }
      // ]
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  await userStore.getUserInfo();
  if (to.meta.requireAuth && !authStore.isLoggedIn) next('/login');
  if (to.meta.requireAdmin && userStore.user.role !== 'ADMIN') next('/');
  next();
});
export default router
