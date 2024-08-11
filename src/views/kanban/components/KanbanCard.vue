<!-- eslint-disable max-len -->
<template>
  <el-badge
    :value="task.priority.slice(0, 1)"
    :type="changePriorityColor(task.priority.slice(0, 1))"
    class="w-full"
  >
    <el-card
      class="kanban-item card w-full pb-[10px] mb-2 cursor-grab relative"
      @click="openTaskDialog(task)"
    >
      <div v-if="task.image.src" class="task-image-wrapper mb-[2px]">
        <img v-if="task.image.src" :src="task.image.src" alt="Task Image" class="task-image rounded-md">
      </div>
      <h1 class="text-lg font-medium">{{ task.title }}</h1>
      <p class="text-8 mb-[10px] text-gray-500 truncate">{{ task.description }}</p>
      <p
        class="absolute right-[10px] bottom-[8px] text-sm text-gray-500 py-[3px] px-[5px] rounded-md border border-gray-400 w-fit"
      >
        {{ task.deadline }}
      </p>
    </el-card>
  </el-badge>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { ITask } from '../types/kanban.types'

const { openTaskDialog } = useKanban()

defineProps<{
  task: ITask
}>()

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
</script>

<style scoped lang="scss">
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
