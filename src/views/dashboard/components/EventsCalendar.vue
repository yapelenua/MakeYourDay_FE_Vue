<template>
  <div class="w-[500px] min-w-[300px]">
    <div class="calendar-container bg-white p-4 rounded-lg shadow-md">
      <ElCalendar @input="handleDateSelect">
        <template #date-cell="{ data }">
          <div
            :class="{
              'has-event': hasEventOnDate(data.day),
            }"
          >
            {{ data.day.split('-').slice(2).join('-') }}
          </div>
        </template>
      </ElCalendar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElCalendar } from 'element-plus'

const {
  handleDateSelect,
  hasEventOnDate
} = useEvents()
</script>

<style>

.el-calendar {
  --el-calendar-cell-width: 40px;
  --el-calendar-cell-height: 40px;
  --el-calendar-cell-border-radius: 50%;
}

.el-calendar-table {
  width: 100%;
  height: 50%;
}

.el-calendar-table td {
  border: none;
}

.is-today {
  color: black !important;
}

.el-calendar-table td .el-calendar-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: var(--el-calendar-cell-height);
  line-height: var(--el-calendar-cell-height);
  border-radius: var(--el-calendar-cell-border-radius);
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.el-calendar-table td .el-calendar-day:hover {
  background-color: #b4ebff;
}

.el-calendar-table td.is-selected .el-calendar-day {
  background-color: #409EFF;
}

.has-event {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  padding: 15px;
  border-radius: var(--el-calendar-cell-border-radius);
  height: 20px;
  background-color: #409EFF;
}

.is-selected {
  background: #fff !important;
}
</style>
