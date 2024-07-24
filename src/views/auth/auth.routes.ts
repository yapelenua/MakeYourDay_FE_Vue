import type { RouteRecordRaw } from 'vue-router'
import DafaultLayoutNoAuth from '@/layouts/DefaultLayoutNoAuth.vue'

export const authRouteNames = {
  auth: 'auth',
  login: 'login',
  signUp: 'signUp'
}

export const authRoutes: RouteRecordRaw = {
  name: authRouteNames.auth,
  path: '/auth',
  redirect: { name: authRouteNames.login },
  component: DafaultLayoutNoAuth,
  children: [
    {
      path: 'login',
      name: authRouteNames.login,
      component: () => import('./Login.vue')
    },
    {
      path: 'sign-up',
      name: authRouteNames.signUp,
      component: () => import('./Register.vue')
    }
  ]
}
