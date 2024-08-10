<template>
  <ElDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    append-to-body
    title="Add Event"
    destroy-on-close
    class="w-[50%] max-w-[500px]"
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
          <PriorityPicker />
        </ElSelect>
      </ElFormItem>
      <ElFormItem v-if="!kanbanForm.image.src">
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
        <ElButton class="ml-[20px]" @click="handleOpenGaleryPrewiev">Or upload from your gallery</ElButton>
      </ElFormItem>
      <ElFormItem v-else>
        <div class="relative inline-block">
          <img
            :src="kanbanForm.image.src"
            class="h-[180px] w-[300px] object-contain rounded-md cursor-pointer"
          >
          <el-icon
            class="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow-lg"
            :size="30"
            @click="removeImage"
          >
            <Delete />
          </el-icon>
        </div>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">Add Task</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
  <GaleryPrewievDialog />
</template>

<script lang="ts" setup>
import { useKanban } from '../store/modules/kanban.store'
import { v4 as uuidv4 } from 'uuid'
import PriorityPicker from '../../shared/PriorityPicker.vue'
import { Delete } from '@element-plus/icons-vue'

const {
  dialogVisible,
  kanbanForm,
  addTask,
  galeryPrewievDialog,
  isAddedFromGalery
} = useKanban()

const handleOpenGaleryPrewiev = () => {
  dialogVisible.value = false
  galeryPrewievDialog.value = true
}

const removeImage = () => {
  kanbanForm.value.image = { id: '', src: '' }
  isAddedFromGalery.value = false
}

const handleBeforeUpload = async (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt500K = file.size / 1024 < 500

  if (!isJpgOrPng) {
    ElNotification({
      title: 'Error',
      message: 'You can only upload JPG/PNG file!',
      type: 'error'
    })
    return false
  }

  if (!isLt500K) {
    ElNotification({
      title: 'Error',
      message: 'Image must be smaller than 500KB',
      type: 'error'
    })
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
