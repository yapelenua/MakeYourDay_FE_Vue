<template>
  <ElDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    append-to-body
    title="Add Event"
    destroy-on-close
    width="500"
  >
    <ElForm :model="kanbanForm" label-position="top" class="mb-4" @submit.prevent="addTask">
      <ElFormItem label="Name" required>
        <ElInput v-model="kanbanForm.title" required clearable />
      </ElFormItem>
      <ElFormItem label="Description" required>
        <ElInput v-model="kanbanForm.description" required clearable />
      </ElFormItem>
      <ElFormItem label="Deadline date" required>
        <el-date-picker
          v-model="kanbanForm.deadline"
          type="date"
          placeholder="Pick a day"
        />
      </ElFormItem>
      <ElFormItem label="Priority" required>
        <ElSelect v-model="kanbanForm.priority" placeholder="Select Priority">
          <ElOption label="Low" value="Low" />
          <ElOption label="Medium" value="Medium" />
          <ElOption label="High" value="High" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <el-upload
          class="upload-demo mb-6"
          drag
          action=""
          multiple
          :before-upload="handleBeforeUpload"
        >
          <el-icon class="el-icon--upload text-gray-700"><UploadFilled /></el-icon>
          <div class="el-upload__text text-gray-700">
            Drop file here or <em class="text-blue-500">click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip text-gray-500">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">Add Task</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>
<script lang="ts" setup>
import { useKanbanStore } from '../store/modules/kanban.store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const kanbanStore = useKanbanStore()
const {
  dialogVisible,
  kanbanForm
} = storeToRefs(kanbanStore)

const {
  addTask
} = kanbanStore

const handleBeforeUpload = async (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt500K = file.size / 1024 < 500

  if (!isJpgOrPng) {
    alert('You can only upload JPG/PNG file!')
    return false
  }

  if (!isLt500K) {
    alert('Image must be smaller than 500KB!')
    return false
  }

  const base64Image = await readFileAsBase64(file)
  kanbanForm.value.image = { id: uuidv4(), src: base64Image }

  return false
}

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}
</script>
