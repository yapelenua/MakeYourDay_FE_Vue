<template>
  <el-header class="bg-gray-800 text-white">
    <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
      <RouterLink to="/dashboard" class="text-xl font-bold">MakeYourDay</RouterLink>
      <div class="hidden md:flex items-center space-x-6">
        <RouterLink v-for="route in headerRoutes" :key="route.to" :to="route.to" :class="route.class">
          {{ route.title }}
        </RouterLink>
        <ElButton type="danger" @click="logout">Logout</ElButton>
      </div>
      <button class="block md:hidden focus:outline-none" @click="toggleMenu">
        <MenuIcon />
      </button>
    </div>
    <MobileMenu :isMenuOpen="isMenuOpen" :headerRoutes="headerRoutes" @toggleMenu="toggleMenu" @logout="logout" />
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { supabase } from '@/supabase'
import MobileMenu from '../components/MobileMenu.vue'
import { useGeneral } from '../../store/modules/general.store'
const { isHeaderAvaiable } = useGeneral()

const router = useRouter()
const isMenuOpen = ref(false)

const headerRoutes = [
  { to: '/dashboard', title: 'Dashboard', class: 'block px-4 py-2' },
  { to: '/galery', title: 'Gallery', class: 'block px-4 py-2' },
  { to: '/kanban', title: 'Kanban', class: 'block px-4 py-2' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    console.log('Sign out success')
    isHeaderAvaiable.value = false
    router.push('/auth/login')
  }
}
</script>
