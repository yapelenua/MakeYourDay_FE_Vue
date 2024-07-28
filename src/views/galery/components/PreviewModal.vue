<template>
  <ElDialog
    v-if="photoPreviewDialog"
    v-model="photoPreviewDialog"
    append-to-body
    destroy-on-close
  >
    <div v-if="selectedPhoto" class="h-[50%]">
      <img :src="selectedPhoto.src" class="image object-contain max-h-[400px] rounded-md">
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
import { useGalery } from '../store/modules/galery.store'

const {
  downloadImage,
  removeImage,
  selectedPhoto,
  photoPreviewDialog
} = useGalery()
</script>

<style scoped>
.image {
  width: 100%;
}
</style>
