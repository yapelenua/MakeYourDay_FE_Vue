<!-- eslint-disable max-len -->
<template>
  <transition name="slide-fade">
    <div v-if="isMenuOpen" class="md:hidden">
      <RouterLink v-for="route in headerRoutes" :key="route.to" :to="route.to" :class="route.class" @click="$emit('toggleMenu')">
        {{ route.title }}
      </RouterLink>
      <ElButton type="danger" class="block w-full text-left px-4 py-2" @click="$emit('logout')">Logout</ElButton>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { IRoute } from '../types/components.types'

defineEmits(['toggleMenu', 'logout'])

defineProps<{
  isMenuOpen: boolean
  headerRoutes: IRoute[]
}>()

</script>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
