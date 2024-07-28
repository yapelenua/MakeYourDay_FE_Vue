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
}
)

export function useGalery () {
  const store = useGaleryStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
