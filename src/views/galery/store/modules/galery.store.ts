import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { v4 as uuidv4 } from 'uuid'
import type { IPhoto } from '../../types/galery.types'

export const useGaleryStore = defineStore('galeryStore', () => {
  const { user } = useGeneral()
  const photoPreviewDialog = ref(false)
  const selectedPhoto = ref<IPhoto | null>(null)

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
        message: 'Image must be smaller than 500KB!',
        type: 'error'
      })
      return false
    }

    await addImage(file)
    return false
  }

  const addImage = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string
      const newImage: IPhoto = {
        id: uuidv4(),
        src: base64Image
      }

      if (user.value && user.value.images) {
        const originalImages = [...user.value.images]
        user.value.images.push(newImage)

        try {
          const { error } = await supabase
            .from('profiles')
            .update({ images: user.value.images })
            .eq('id', user.value.id)

          if (error) throw error
        } catch (error) {
          user.value.images = originalImages
          console.error('Error adding image:', error)
        }
      }
    }
    reader.readAsDataURL(file)
  }

  const removeImage = async (id: string) => {
    photoPreviewDialog.value = false

    if (user.value && user.value.images) {
      const originalImages = [...user.value.images]
      user.value.images = user.value.images.filter((image: IPhoto) => image.id !== id)

      try {
        const { error } = await supabase
          .from('profiles')
          .update({ images: user.value.images })
          .eq('id', user.value.id)
        if (error) throw error
      } catch (error) {
        user.value.images = originalImages
        console.error('Error removing image:', error)
      }
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
      link.download = 'MakeYourDayImage.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return {
    handleBeforeUpload,
    photoPreviewDialog,
    selectedPhoto,
    addImage,
    removeImage,
    openPhotoPreview,
    downloadImage,
    user
  }
})

export function useGalery () {
  const store = useGaleryStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
