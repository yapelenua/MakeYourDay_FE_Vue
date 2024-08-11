<template>
  <ElDialog
    v-if="galeryPrewievDialog"
    v-model="galeryPrewievDialog"
    append-to-body
    title="Choose Image"
    destroy-on-close
    class="w-[50%] max-w-[500px]"
  >
    <div class="max-h-[400px] overflow-y-auto p-5">
      <template v-for="image in user.images" :key="image.id">
        <ItemObserver :removeIfInvisible="false">
          <ul class="relative mb-4">
            <img
              :src="image.src"
              class="image h-[180px] object-contain rounded-md w-[300px] cursor-pointer transition duration-300"
              :class="{'blur-sm': image === selectedImage, 'hover:blur-[1px]': image !== selectedImage}"
              @click="selectImage(image)"
            >
            <ElIcon
              v-if="image === selectedImage"
              class="absolute inset-0 flex items-center justify-center text-white"
              size="50"
            >
              <Check />
            </ElIcon>
          </ul>
          <template #placeholder>
            <div class="w-40 h-40" />
          </template>
        </ItemObserver>
      </template>
    </div>
    <ElButton type="primary" class="mt-[10px]" :disabled="!selectedImage" @click="confirmSelection">Confirm</ElButton>
  </ElDialog>
</template>

<script lang="ts" setup>
import type { IPhoto } from '@/views/galery/types/galery.types'
import { useKanban } from '../store/modules/kanban.store'
import { Check } from '@element-plus/icons-vue'

const {
  galeryPrewievDialog,
  user,
  kanbanForm,
  dialogVisible,
  isAddedFromGalery
} = useKanban()

const selectedImage = ref()

const selectImage = (image: IPhoto) => {
  selectedImage.value = image
}

const confirmSelection = () => {
  if (selectedImage.value) {
    kanbanForm.value.image = selectedImage.value
  }
  galeryPrewievDialog.value = false
  dialogVisible.value = true
  isAddedFromGalery.value = true
  selectedImage.value = ''
}
</script>
