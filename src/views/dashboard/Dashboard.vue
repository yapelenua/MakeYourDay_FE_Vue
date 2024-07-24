<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-wrap-reverse p-[20px] w-[60vw] h-[70vh] max-h-[90vh] items-center place-content-around pt-[50px]">
    <UserEventsList />
    <template v-if="screenWidth < 1200">
      <DatePicker class="mt-[40px]" />
    </template>
    <template v-else>
      <EventsCalendar />
    </template>
  </div>
  <EventInfo />
</template>

<script setup lang="ts">
import UserEventsList from './components/UserEventsList.vue'
import EventsCalendar from './components/EventsCalendar.vue'
import EventInfo from './components/EventInfo.vue'

const screenWidth = ref(window.innerWidth)

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})
</script>
