<template>
  <ElDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    append-to-body
    title="Add Event"
    destroy-on-close
    class="w-[50%] max-w-[500px]"
  >
    <ElForm :model="eventForm" label-position="top" class="mb-4" @submit.prevent="addEvent">
      <ElFormItem label="Name" required>
        <ElInput v-model="eventForm.name" required clearable />
      </ElFormItem>
      <ElFormItem label="Description" required>
        <ElInput v-model="eventForm.description" required clearable />
      </ElFormItem>
      <ElFormItem label="Location" required>
        <el-autocomplete
          v-model="query"
          :fetch-suggestions="fetchSuggestions"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="selectLocation"
        />
      </ElFormItem>
      <ElFormItem label="Date" required>
        <ElDatePicker
          v-model="eventForm.date"
          type="date"
          placeholder="Pick a day"
        />
      </ElFormItem>
      <ElFormItem label="Priority" required>
        <ElSelect v-model="eventForm.priority" placeholder="Select Priority">
          <PriorityPicker />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">Add Event</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElSelect, ElDatePicker } from 'element-plus'
import PriorityPicker from '../../shared/components/PriorityPicker.vue'

const {
  eventForm,
  dialogVisible,
  query,
  addEvent,
  selectLocation,
  fetchSuggestions
} = useEvents()

</script>
