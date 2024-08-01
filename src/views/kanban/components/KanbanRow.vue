<template>
  <div class="kanban-board flex rounded-lg w-[75vw] h-[70vh] justify-around p-5 bg-gray-100">
    <template v-if="isMobile">
      <h1>Sorry but Kanban is not available in mobile device</h1>
    </template>
    <template v-else>
      <div
        v-for="(column, status) in columns"
        :key="status"
        :class="columnColor(status)"
        class="kanban-column p-4 pt-[20px] rounded-lg shadow-md bg-opacity-25"
        :data-status="status"
      >
        <h3 class="text-lg font-semibold mb-3 mt-[5px]">{{ status }}</h3>
        <draggable
          v-model="column.tasks"
          group="tasks"
          :animation="150"
          class="kanban-list min-h-[100px] max-h-[60vh] overflow-y-auto overflow-x-hidden"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <el-badge
              :value="element.priority.slice(0,1)"
              :type="changePriorityColor(element.priority.slice(0,1))"
              class="w-full"
            >
              <el-card
                class="kanban-item card w-full pb-[10px] mb-2 cursor-grab relative"
                @click="openTaskDialog(element)"
              >
                <div v-if="element.image.src" class="task-image-wrapper mb-[2px]">
                  <img v-if="element.image.src" :src="element.image.src" alt="Task Image" class="task-image rounded-md">
                </div>
                <h1 class="text-lg font-medium">{{ element.title }}</h1>
                <p class="text-8 mb-[10px] text-gray-500 truncate">{{ element.description }}</p>
                <p
                  class="absolute right-[10px] bottom-[8px] text-sm
                 text-gray-500 py-[3px] px-[5px] rounded-md border border-gray-400 w-fit"
                >
                  {{ element.deadline }}
                </p>
              </el-card>
            </el-badge>
          </template>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useKanban } from '../store/modules/kanban.store'

const { onDragEnd, openTaskDialog, columns } = useKanban()
const { isMobile, updateScreenSize } = useGeneral()

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})
const changePriorityColor = (priority: string) => {
  switch (priority) {
    case 'M':
      return 'primary'
    case 'H':
      return 'warning'
    case 'L':
      return 'success'
    default:
      return 'success'
  }
}

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

console.log('columns', columns.value)
</script>

<style scoped lang="scss">
.kanban-board {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kanban-column {
  width: 23%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.kanban-list {
  min-height: 100px;
  padding: 15px;
  border-radius: 5px;
}

.kanban-item {
  margin: 5px 0;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: grab;
}

.task-image-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.task-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.card-active-state {
  border-color: #3a3a3a;
  box-shadow: 0 0 0 1px #3a3a3a;
}

.card {
  @apply transition-shadow;

  &:hover {
    @apply card-active-state
  }
}
</style>
