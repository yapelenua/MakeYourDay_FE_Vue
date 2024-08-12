<template>
  <div class="main-wrapper flex rounded-lg justify-around p-5 bg-gray-100">
    <template v-if="isMobile">
      <h1>Sorry but Kanban is not available in mobile device</h1>
    </template>
    <template v-else>
      <div
        v-for="(column, status) in columns"
        :key="status"
        :class="columnColor(status)"
        class="p-4 w-[23%] pt-[20px] rounded-lg shadow-md bg-opacity-25"
        :data-status="status"
      >
        <h3 class="text-lg font-semibold mb-3 mt-[5px]">{{ status }}</h3>
        <draggable
          v-model="column.tasks"
          group="tasks"
          :animation="150"
          class="rounded-md p-[15px] h-[90%] overflow-y-auto overflow-x-hidden"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <KanbanCard
              :task="element"
            />
          </template>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useKanban } from '../store/modules/kanban.store'

const { onDragEnd, columns } = useKanban()
const { isMobile, updateScreenSize } = useGeneral()

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

const columnColor = (row: string) => {
  switch (row) {
    case 'Done':
      return 'bg-[#d9f99d]'
    case 'In Progress':
      return 'bg-[#fef08a]'
    case 'New':
      return 'bg-[#c7d2fe]'
    default:
      return 'bg-[#a5f3fc]'
  }
}
</script>

<style scoped lang="scss">
</style>
