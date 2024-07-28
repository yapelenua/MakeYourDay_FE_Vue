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

const {
  handleDateSelect,
  selectedDate
} = useEvents()

</script>
