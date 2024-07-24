<template>
  <el-header class="bg-gray-800 text-white">
    <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
      <RouterLink to="/dashboard" class="text-xl font-bold">MakeYourDay</RouterLink>
      <div class="hidden md:flex items-center space-x-6">
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/galery">Gallery</RouterLink>
        <RouterLink to="/kanban">Kanban</RouterLink>
        <ElButton type="danger" @click="logout">Logout</ElButton>
      </div>
      <button class="block md:hidden focus:outline-none" @click="toggleMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    <transition name="slide-fade">
      <div v-if="isMenuOpen" class="md:hidden">
        <RouterLink to="/dashboard" class="block px-4 py-2" @click="toggleMenu">Dashboard</RouterLink>
        <RouterLink to="/galery" class="block px-4 py-2" @click="toggleMenu">Gallery</RouterLink>
        <RouterLink to="/kanban" class="block px-4 py-2" @click="toggleMenu">Kanban</RouterLink>
        <ElButton type="danger" class="block w-full text-left px-4 py-2" @click="logout">Logout</ElButton>
      </div>
    </transition>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { supabase } from '@/supabase'

const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    console.log('Sign out success')
    router.push('/auth/login')
  }
}
</script>

<style scoped>
/* Add your custom styles for the header here */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
