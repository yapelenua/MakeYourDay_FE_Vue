<template>
  <div class="default-layout flex flex-col h-full overflow-hiden relative">
    <component :is="isHeaderAvaiable ? Header : ''" />
    <div class="h-full flex justify-center items-center relative">
      <AnimatedLayout class="absolute inset-0 z-0" />
      <div class="relative bg-gray-100 rounded-xl drop-shadow-xl">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedLayout from './AnimatedLayout.vue'
import Header from '../components/layout/Header.vue'

const { isHeaderAvaiable } = useGeneral()
</script>

<style lang="scss" scoped>
  .default-layout:has(.alert) .header {
    @apply border-b-2 border-danger bg-red-200
  }
</style>
