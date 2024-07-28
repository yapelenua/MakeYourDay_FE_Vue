<template>
  <ElButton plain type="primary" class="m-5" @click="toggleCreateTaskModal">
    Add new task
  </ElButton>
  <KanbanRow />

  <CreateTaskDialog />
  <TaskInfoDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useKanban } from './store/modules/kanban.store'
import CreateTaskDialog from './components/CreateTaskDialog.vue'
import TaskInfoDialog from './components/TaskInfoDialog.vue'
import KanbanRow from './components/KanbanRow.vue'

const {
  fetchKanbanData,
  toggleCreateTaskModal
} = useKanban()

onMounted(() => {
  fetchKanbanData()
})

</script>
