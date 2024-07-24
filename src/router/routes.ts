import type { RouteRecordRaw } from 'vue-router'

import { routeNames } from './route-names'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { authRoutes } from '@/views/auth/auth.routes'
import { dashboardViewRoutes } from '@/views/dashboard/dashboard.routes'
import { galeryViewRoutes } from '@/views/galery/galery.routes'
import { kanbanViewRoutes } from '@/views/kanban/kanban.routes'

const defaultLayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: routeNames.rootPage,
  redirect: { name: routeNames.login },
  component: DefaultLayout,
  children: [
    ...dashboardViewRoutes,
    ...galeryViewRoutes,
    ...kanbanViewRoutes
  ]
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  authRoutes,
  defaultLayoutRoutes
]

export {
  routes,
  defaultLayoutRoutes
}
