<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col">
    <div class="main-wrapper flex flex-wrap-reverse p-[20px] items-center place-content-around pt-[50px]">
      <UserEventsList />
      <component :is="isMobile ? DatePicker : EventsCalendar" />
    </div>
    <EventInfo />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import UserEventsList from './components/UserEventsList.vue'
import EventInfo from './components/EventInfo.vue'
import DatePicker from './components/DatePicker.vue'
import EventsCalendar from './components/EventsCalendar.vue'

const { isMobile, updateScreenSize } = useGeneral()

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>
