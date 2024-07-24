import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { routeNames } from './route-names'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    const generalStore = useGeneralStore()
    const session = await generalStore.fetchUserInfo()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !session) {
      next({ name: routeNames.login })
    } else if (!requiresAuth && session) {
      next({ name: routeNames.dashboard })
    } else {
      next()
    }
  } catch (error) {
    console.error('Error during route guard execution:')
    next({ name: routeNames.login })
  }
}
