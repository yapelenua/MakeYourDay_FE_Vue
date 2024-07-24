<template>
  <el-date-picker
    v-model="selectedDate"
    type="date"
    placeholder="Pick a day"
    class="mt-[30px]"
    @change="handleDateSelect"
  />
</template>
<script lang="ts" setup>
const eventListStore = useEventListStore()

const {
  selectedDate
} = storeToRefs(eventListStore)

const {
  handleDateSelect
} = useEventListStore()

console.log(selectedDate.value)
</script>
