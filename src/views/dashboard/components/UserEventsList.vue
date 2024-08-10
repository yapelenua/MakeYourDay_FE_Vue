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
    <div
      class="w-full flex flex-wrap gap-5"
      :class="isMobile ? 'h-[300px]' : 'h-[500px] overflow-y-auto'"
    >
      <template v-if="filteredEvents.length > 0">
        <template v-if="isMobile">
          <Swiper :slides-per-view="1" :space-between="50" class="swiper-container">
            <SwiperSlide v-for="event in filteredEvents" :key="event.id">
              <ItemObserver :removeIfInvisible="false">
                <EventCard :event="event" />

                <template #placeholder>
                  <div class="w-40 h-40" />
                </template>
              </ItemObserver>
            </SwiperSlide>
          </Swiper>
          <div ref="loadMoreTrigger" class="load-more-trigger" />
        </template>
        <template v-else>
          <template v-for="event in filteredEvents" :key="event.id">
            <ItemObserver :removeIfInvisible="false">
              <EventCard :event="event" />

              <template #placeholder>
                <div class="w-40 h-40" />
              </template>
            </ItemObserver>
          </template>
        </template>
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
import { onMounted, onBeforeUnmount } from 'vue'
import { ElButton } from 'element-plus'
import AddEventDialog from './AddEventDialog.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

const { isMobile, updateScreenSize } = useGeneral()

const {
  dialogVisible,
  filteredEvents,
  searchValue
} = useEvents()

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
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
