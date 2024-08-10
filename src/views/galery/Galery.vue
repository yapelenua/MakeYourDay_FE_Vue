<!-- eslint-disable max-len -->
<template>
  <div class="main-wrapper p-[40px]">
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
      <template v-for="image in user.images" :key="image.id">
        <ItemObserver :removeIfInvisible="false">
          <el-card
            class="relative shadow-lg group max-w-[300px] max-h-[200px]"
            @click="openPhotoPreview(image)"
          >
            <img :src="image.src" class="image h-[180px] object-contain rounded-md w-[300px]">
          </el-card>

          <template #placeholder>
            <div class="w-40 h-40" />
          </template>
        </ItemObserver>
      </template>
    </div>
  </div>
  <PreviewModal />
</template>

<script setup lang="ts">
import { useGalery } from './store/modules/galery.store'
import { UploadFilled } from '@element-plus/icons-vue'

const {
  handleBeforeUpload,
  openPhotoPreview,
  user
} = useGalery()
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
