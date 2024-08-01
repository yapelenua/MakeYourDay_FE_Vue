import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useGeneralStore = defineStore('generalStore', () => {
  const user = ref()
  const generalLoading = ref(false)
  const screenWidth = ref(window.innerWidth)
  const isHeaderAvaiable = ref(false)

  const fetchUserInfo = async () => {
    try {
      generalLoading.value = true
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session) throw sessionError || new Error('No session found')

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, nickname, events, images, kanbans')
        .eq('id', session.user.id)
        .single()
      if (profileError) throw profileError

      user.value = profile
      isHeaderAvaiable.value = true
      return session
    } catch (error) {
      console.error('Error fetching user info:')
    } finally {
      generalLoading.value = false
    }
  }

  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth
  }

  const isMobile = computed(() => screenWidth.value < 1250)

  return {
    user,
    fetchUserInfo,
    screenWidth,
    updateScreenSize,
    isMobile,
    isHeaderAvaiable
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}

export function useGeneral () {
  const store = useGeneralStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
