import type { RouteRecordRaw } from 'vue-router'

export const kanbanViewRouteNames = {
  kanban: 'kanban',
  kanbanDetail: 'kanban-detail'
}

export const kanbanViewRoutes: Array<RouteRecordRaw> = [
  {
    path: '/kanban',
    name: kanbanViewRouteNames.kanban,
    component: () => import('./KanbanList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/kanban/:id',
    name: kanbanViewRouteNames.kanbanDetail,
    component: () => import('./KanbanBoard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
