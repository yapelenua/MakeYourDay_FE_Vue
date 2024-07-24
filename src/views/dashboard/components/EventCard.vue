<!-- eslint-disable max-len -->
<template>
  <ElCard
    class="max-w-[200px] bg-white flex flex-col items-center p-4 shadow-md rounded-lg cursor-pointer card"
    @click="openEventDialog(event)"
  >
    <div class="map-container">
      <GoogleMap :lat="event.coords?.lat" :lng="event.coords?.lng" />
    </div>

    <p class="font-bold truncate w-full" :title="event.title">
      {{ truncateText(event.title) }}
    </p>
    <p class="text-gray-600 truncate w-full" :title="event.description">
      {{ truncateText(event.description) }}
    </p>

    <div
      class="flex m-auto w-[70%] rounded text-white text-center items-center justify-center mt-[15px]"
      :class="changePriorityColor(event.priority.slice(0, 1))"
      :title="event.priority"
    >
      <p>{{ event.priority }}</p>
    </div>
  </ElCard>
</template>
<script lang="ts" setup>
import type { IEvent } from '../types/dashboard.types'

const {
  truncateText,
  openEventDialog
} = useEventListStore()

defineProps<{ event: IEvent }>()

const changePriorityColor = (priority: string) => {
  switch (priority) {
    case 'M':
      return 'bg-blue-300'
    case 'H':
      return 'bg-red-300'
    case 'L':
      return 'bg-green-300'
    default:
      return 'bg-green-300'
  }
}
</script>
<style scoped>
.el-card {
  transition: transform 0.2s;
}
.el-card:hover {
  transform: translateY(-5px);
}

.map-container {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.bg-blue-300{
  background-color: rgba(5, 112, 158, 0.616);
}
</style>
