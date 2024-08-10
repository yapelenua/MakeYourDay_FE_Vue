<template>
  <div class="w-[500px] min-w-[300px] bg-[#4e54c8] p-4 rounded-lg shadow-md">
    <ElCalendar class="rounded-md" @input="handleDateSelect">
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
</template>
<script setup lang="ts">
import { ElCalendar } from 'element-plus'

const {
  handleDateSelect,
  hasEventOnDate
} = useEvents()
</script>

<style lang="scss">
.el-calendar {
  &__body {
    padding: 0 15px 15px;
  }

  &-day {
    &:has(.has-event) {
      background: #ecf4fc;
      font-weight: 600;
    }
    position: relative;
  }

  &__header {
    .el-calendar__title {
      color: white;
      font-weight: 600;
    }
    padding-top: 0;
    background-color: #4e54c8;
  }
}

.has-event {
  &:after {
    content: '';
    position: absolute;
    top: 17px;
    right: 23px;
    width: 5px;
    height: 5px;
    z-index: 300;
    background: #4e54c8;
    border-radius: 100%;
  }
}

.is-selected {
  background: #fff !important;
}

.el-calendar-table td .el-calendar-day:hover {
  background-color: #b4ebff;
}

.el-calendar-table td.is-selected .el-calendar-day {
  background-color: #4e54c8;
  color: white;
}
</style>
