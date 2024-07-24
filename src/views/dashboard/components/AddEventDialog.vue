<template>
  <ElDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    append-to-body
    title="Add Event"
    destroy-on-close
    width="500"
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
          <ElOption label="Low" value="Low" />
          <ElOption label="Medium" value="Medium" />
          <ElOption label="High" value="High" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" native-type="submit">Add Event</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElSelect, ElOption, ElDatePicker } from 'element-plus'

const eventListStore = useEventListStore()

const { eventForm, dialogVisible, query } = storeToRefs(eventListStore)
const { addEvent, selectLocation, fetchSuggestions } = useEventListStore()

</script>
