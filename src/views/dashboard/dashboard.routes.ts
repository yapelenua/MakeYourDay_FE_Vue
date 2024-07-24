import type { RouteRecordRaw } from 'vue-router'

export const dashboardViewRouteNames = {
  dashboard: 'dashboard'
}

export const dashboardViewRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: dashboardViewRouteNames.dashboard,
    component: () => import('./Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
