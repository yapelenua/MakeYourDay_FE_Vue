<template>
  <div class="kanban-board flex rounded-lg w-[70vw] h-[70vh] justify-around p-5 bg-gray-100">
    <template v-if="screenWidth < 1000">
      <h1>Sorry but Kanban is not available in mobile device</h1>
    </template>
    <template v-else>
      <div
        v-for="(column, status) in columns"
        :key="status"
        class="kanban-column p-4 bg-gray-200 rounded-lg shadow-md"
        :data-status="status"
      >
        <h3 class="text-lg font-semibold mb-3">{{ status }}</h3>
        <draggable
          v-model="column.tasks"
          group="tasks"
          class="kanban-list bg-white rounded-lg min-h-[100px] max-h-[60vh] overflow-y-auto overflow-x-hidden"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <el-badge :value="element.priority.slice(0,1)" :type="changePriorityColor(element.priority.slice(0,1))">
              <el-card class="kanban-item p-3 mb-2 cursor-grab" @click="openTaskDialog(element)">
                <div class="task-image-wrapper">
                  <img v-if="element.image.src" :src="element.image.src" alt="Task Image" class="task-image">
                  <div v-else class="task-image-placeholder">
                    <ElIcon><PictureFilled /></ElIcon>
                  </div>
                </div>
                <h1 class="text-base font-medium mb-[7px]">{{ element.title }}</h1>
                <p class="text-sm mb-[7px]">{{ element.description }}</p>
                <p class="text-sm text-gray-500">{{ element.deadline }}</p>
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
import { ElIcon } from 'element-plus'
import { PictureFilled } from '@element-plus/icons-vue'

const { onDragEnd, openTaskDialog, columns } = useKanban()
const { screenWidth, updateScreenSize } = useGeneral()

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
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kanban-column {
  width: 23%;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.kanban-list {
  min-height: 100px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
}

.kanban-item {
  padding: 5px;
  margin: 5px 0;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: grab;
  width: 200px;
}

.task-image-wrapper {
  width: 100%;
  height: 120px;
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
</style>
