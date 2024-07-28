<template>
  <ElDialog
    v-if="taskDialogVisible"
    v-model="taskDialogVisible"
    append-to-body
    title="Task Info"
    destroy-on-close
    width="500"
  >
    <div v-if="selectedTask">
      <ElForm :model="selectedTask" label-position="top" class="mb-4">
        <ElFormItem label="Title">
          <ElInput v-model="selectedTask.title" :disabled="!isEditing" clearable />
        </ElFormItem>
        <ElFormItem label="Description">
          <ElInput v-model="selectedTask.description" :disabled="!isEditing" clearable />
        </ElFormItem>
        <ElFormItem label="Priority">
          <ElSelect v-model="selectedTask.priority" :disabled="!isEditing" clearable>
            <ElOption label="High" value="High" />
            <ElOption label="Medium" value="Medium" />
            <ElOption label="Low" value="Low" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Deadline">
          <ElDatePicker v-model="selectedTask.deadline" :disabled="!isEditing" />
        </ElFormItem>
        <ElFormItem v-if="selectedTask.image && selectedTask.image.src">
          <ElImage :src="selectedTask.image.src" class="w-full h-64 object-cover rounded-md mb-4" />
        </ElFormItem>
        <ElFormItem>
          <ElButton v-if="!isEditing" type="primary" @click="startEditing">Edit</ElButton>
          <ElButton type="success" :disabled="!isEditing" @click="saveTask">Save</ElButton>
          <ElButton v-if="isEditing" type="danger" @click="cancelEdit">Cancel</ElButton>
          <ElButton type="danger" @click="deleteTask(selectedTask.id)">Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </ElDialog>
</template>
<script lang="ts" setup>
import { useKanban } from '../store/modules/kanban.store'
import { ElImage } from 'element-plus'

const {
  taskDialogVisible,
  selectedTask,
  isEditing,
  startEditing,
  cancelEdit,
  saveTask,
  deleteTask
} = useKanban()

</script>
<style scoped>
.el-card {
  transition: transform 0.2s;
}
.el-card:hover {
  transform: translateY(-5px);
}
</style>
