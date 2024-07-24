<template>
  <div class="default-layout flex flex-col h-full overflow-hiden relative">
    <Header />
    <div class="h-full flex justify-center items-center relative">
      <AnimatedLayout class="absolute inset-0 z-0 h-[120vh]" />
      <div class="relative bg-gray-100 max-w-[90vw] rounded-xl drop-shadow-xl">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedLayout from './AnimatedLayout.vue'
</script>

<style lang="scss" scoped>
  .default-layout:has(.alert) .header {
    @apply border-b-2 border-danger bg-red-200
  }

.absolute {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
