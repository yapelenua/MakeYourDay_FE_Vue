<!-- eslint-disable max-len -->
<template>
  <el-container>
    <el-main class="p-4">
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
      <div class="max-h-[500px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto">
        <el-card
          v-for="(image, index) in user.images"
          :key="index"
          class="relative shadow-lg relative group max-w-[300px] max-h-[200px]"
          @click="openPhotoPreview(image)"
        >
          <img :src="image.src" class="image h-full object-cover rounded-md h-[70px] w-[300px]">
        </el-card>
      </div>
    </el-main>
  </el-container>
  <ElDialog
    v-if="photoPreviewDialog"
    v-model="photoPreviewDialog"
    append-to-body
    destroy-on-close
  >
    <div v-if="selectedPhoto" class="h-[50%]">
      <img :src="selectedPhoto.src" class="image object-cover rounded-md">
      <el-button type="warning" class="mt-[10px]" @click="removeImage(selectedPhoto.id)">
        Delete
      </el-button>
      <el-button type="warning" class="mt-[10px]" @click="downloadImage()">
        Download
      </el-button>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { supabase } from '@/supabase'
import { useGeneralStore } from '@/store/modules/general.store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface IPhoto {
  id: string
  src?: string
}

const generalStore = useGeneralStore()
const { user } = storeToRefs(generalStore)
const photoPreviewDialog = ref(false)
const selectedPhoto = ref<IPhoto | null>(null)

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

  await addImage(file)
  return false
}

const addImage = async (file: File) => {
  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string

      if (user.value && user.value.images) {
        const newImage: IPhoto = {
          id: uuidv4(),
          src: base64Image
        }
        user.value.images.push(newImage)

        const { error } = await supabase
          .from('profiles')
          .update({ images: user.value.images })
          .eq('id', user.value.id)

        if (error) throw error
      }
    }
    reader.readAsDataURL(file)
  } catch (error) {
    console.error('Error adding image:', error)
  }
}

const removeImage = async (id: string) => {
  try {
    if (user.value && user.value.images) {
      user.value.images = user.value.images.filter((image: IPhoto) => image.id !== id)

      const { error } = await supabase
        .from('profiles')
        .update({ images: user.value.images })
        .eq('id', user.value.id)
      if (error) throw error

      photoPreviewDialog.value = false
    }
  } catch (error) {
    console.error('Error removing image:', error)
  }
}

const openPhotoPreview = (image: IPhoto) => {
  selectedPhoto.value = image
  photoPreviewDialog.value = true
}

const downloadImage = () => {
  if (selectedPhoto.value?.src) {
    const link = document.createElement('a')
    link.href = selectedPhoto.value.src
    link.download = 'MakeYpurDayImage.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>

<style scoped>
.upload-demo {
  border: 2px dashed #d3dce6;
  background-color: #fafafa;
  cursor: pointer;
  padding: 20px;
  text-align: center;
  transition: border-color 0.3s, background-color 0.3s;
}

.upload-demo:hover {
  border-color: #409eff;
  background-color: #f0f9ff;
}

.image {
  width: 100%;
}
</style>
