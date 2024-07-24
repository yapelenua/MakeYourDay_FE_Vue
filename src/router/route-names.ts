import { authRouteNames } from '@/views/auth/auth.routes'
import { dashboardViewRouteNames } from '@/views/dashboard/dashboard.routes'
import { galeryViewRouteNames } from '@/views/galery/galery.routes'
import { kanbanViewRouteNames } from '@/views/kanban/kanban.routes'

export const routeNames = {
  rootPage: 'rootPage',
  ...authRouteNames,
  ...dashboardViewRouteNames,
  ...galeryViewRouteNames,
  ...kanbanViewRouteNames,

  additionalDefaultLayoutRoute: 'additionalDefaultLayoutRoute',
  additionalNoLayoutRoute: 'additionalNoLayoutRoute'
}
