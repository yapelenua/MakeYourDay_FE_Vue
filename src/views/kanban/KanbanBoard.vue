<template>
  <ElButton plain type="primary" class="m-5" @click="dialogVisible = !dialogVisible">
    Add new task
  </ElButton>
  <KanbanRow />

  <CreateTaskDialog />
  <TaskInfoDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useKanbanStore } from './store/modules/kanban.store'
import { storeToRefs } from 'pinia'
import CreateTaskDialog from './components/CreateTaskDialog.vue'
import TaskInfoDialog from './components/TaskInfoDialog.vue'
import KanbanRow from './components/KanbanRow.vue'

const kanbanStore = useKanbanStore()
const {
  dialogVisible
} = storeToRefs(kanbanStore)

const {
  fetchKanbanData
} = kanbanStore

onMounted(() => {
  fetchKanbanData()
})

</script>
