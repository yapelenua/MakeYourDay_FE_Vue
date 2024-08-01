<!-- eslint-disable max-len -->
<template>
  <div class="p-[40px] w-[85vw] h-[80vh]">
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
    <div
      class="max-h-[400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] overflow-y-auto p-[20px]"
    >
      <el-card
        v-for="(image, index) in visiblePhotos"
        :key="index"
        class="relative shadow-lg group max-w-[300px] max-h-[200px]"
        @click="openPhotoPreview(image)"
      >
        <img :src="image.src" class="image h-[180px] object-contain rounded-md w-[300px]">
      </el-card>
      <div ref="loadMoreTrigger" class="w-full h-10" />
    </div>
  </div>
  <PreviewModal />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useGalery } from './store/modules/galery.store'
import { UploadFilled } from '@element-plus/icons-vue'
import type { IPhoto } from './types/galery.types'

const {
  handleBeforeUpload,
  openPhotoPreview,
  user
} = useGalery()

const loadMoreTrigger = ref<HTMLDivElement | null>(null)
const visiblePhotos = ref<IPhoto[]>([])

const loadMoreEvents = () => {
  const currentLength = visiblePhotos.value.length
  const nextBatch = user.value.images.slice(currentLength, currentLength + 4)
  if (nextBatch.length > 0) {
    visiblePhotos.value = [...visiblePhotos.value, ...nextBatch]
  }
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreEvents()
  }
}, {
  rootMargin: '20px',
  threshold: 1.0
})

const observeLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
}

const unobserveLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
}

onMounted(() => {
  visiblePhotos.value = user.value.images.slice(0, 4)
  observeLoadMoreTrigger()
})

onBeforeUnmount(() => {
  unobserveLoadMoreTrigger()
})

watch(() => user.value.images, (newImages) => {
  visiblePhotos.value = newImages.slice(0, 4)
  unobserveLoadMoreTrigger()
  observeLoadMoreTrigger()
}, { deep: true })
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
