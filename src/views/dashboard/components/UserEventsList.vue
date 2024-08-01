<template>
  <div class="flex flex-col h-full w-full sm:w-3/4 lg:w-1/2">
    <div class="flex flex-wrap gap-4 mb-8 justify-center">
      <h2 class="text-2xl font-bold">MakeYourEvents</h2>

      <ElButton plain type="primary" @click="dialogVisible = !dialogVisible">
        Add new event
      </ElButton>
    </div>

    <AddEventDialog />
    <el-input
      v-model="searchValue"
      placeholder="Search your event"
      clearable
      class="h-[30px] w-full mb-[10px]"
    />

    <!-- User Events List -->
    <div
      class="w-full flex flex-wrap gap-5"
      :class="isMobile ? 'h-[300px]' : 'h-[500px] overflow-y-auto'"
    >
      <template v-if="filteredEvents.length > 0">
        <template v-if="isMobile">
          <Swiper :slides-per-view="1" :space-between="50" class="swiper-container">
            <SwiperSlide v-for="event in visibleEvents" :key="event.id">
              <EventCard :event="event" />
            </SwiperSlide>
          </Swiper>
          <div ref="loadMoreTrigger" class="load-more-trigger" />
        </template>
        <template v-else>
          <div v-for="event in visibleEvents" :key="event.id" class="mt-5">
            <EventCard :event="event" />
          </div>
        </template>
        <div ref="loadMoreTrigger" class="load-more-trigger" />
      </template>
      <template v-else>
        <div class="h-96 w-full">
          <el-empty description="No Events for today" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, onUpdated } from 'vue'
import { ElButton } from 'element-plus'
import AddEventDialog from './AddEventDialog.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import type { IEvent } from '../types/dashboard.types'

const { isMobile, updateScreenSize } = useGeneral()
const visibleEvents = ref<IEvent[]>([])
const loadMoreTrigger = ref<HTMLDivElement | null>(null)

const {
  dialogVisible,
  filteredEvents,
  searchValue,
  selectedDate
} = useEvents()

const loadMoreEvents = () => {
  const currentLength = visibleEvents.value.length
  const nextBatch = filteredEvents.value.slice(currentLength, currentLength + 2)
  visibleEvents.value = [...visibleEvents.value, ...nextBatch]
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreEvents()
  }
}, {
  rootMargin: '20px',
  threshold: 1.0
})

const observeLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
}

const unobserveLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  visibleEvents.value = filteredEvents.value.slice(0, 4)
  observeLoadMoreTrigger()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
  unobserveLoadMoreTrigger()
})

onUpdated(() => {
  unobserveLoadMoreTrigger()
  observeLoadMoreTrigger()
})

watch([filteredEvents, selectedDate], () => {
  visibleEvents.value = filteredEvents.value.slice(0, 4)
  unobserveLoadMoreTrigger()
  observeLoadMoreTrigger()
})
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.load-more-trigger {
  width: 100%;
  height: 10px;
}
</style>
