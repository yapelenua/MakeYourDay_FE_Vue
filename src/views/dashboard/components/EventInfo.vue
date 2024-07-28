<template>
  <ElDialog
    v-if="eventsInfoDialogVisible"
    v-model="eventsInfoDialogVisible"
    append-to-body
    title="Event Info"
    destroy-on-close
    width="500"
    custom-class="overflow-y-hidden"
  >
    <div v-if="selectedEvent" class="overflow-hidden">
      <ElForm :model="selectedEvent" label-position="top" class="mb-4">
        <ElFormItem label="Name">
          <ElInput v-model="selectedEvent.title" :disabled="!isEditing" clearable />
        </ElFormItem>
        <ElFormItem label="Description">
          <ElInput v-model="selectedEvent.description" :disabled="!isEditing" clearable />
        </ElFormItem>
        <ElFormItem label="Date" required>
          <ElDatePicker
            v-model="selectedEvent.date"
            type="date"
            placeholder="Pick a day"
            :disabled="!isEditing"
            clearable
          />
        </ElFormItem>
        <ElFormItem label="Location" required>
          <el-autocomplete
            v-model="selectedEvent.location"
            :fetch-suggestions="fetchSuggestions"
            clearable
            class="inline-input w-50"
            :disabled="!isEditing"
            @select="selectLocation"
          />
        </ElFormItem>
        <h1>Your location</h1>
        <GoogleMap :lat="selectedEvent.coords?.lat ?? 50.450001" :lng="selectedEvent.coords?.lng ?? 30.523333" />
        <ElFormItem class="pt-[10px]">
          <ElButton v-if="!isEditing" type="primary" @click="startEditing">Edit</ElButton>
          <ElButton type="success" :disabled="!isEditing" @click="saveEdit">Save</ElButton>
          <ElButton v-if="isEditing" type="danger" @click="cancelEdit">Cancel</ElButton>
          <ElButton type="danger" @click="deleteEvent(selectedEvent.id)">Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </ElDialog>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog } from 'element-plus'
import GoogleMap from './GoogleMap.vue'

const {
  startEditing,
  saveEdit,
  cancelEdit,
  deleteEvent,
  fetchSuggestions,
  selectLocation,
  eventsInfoDialogVisible,
  selectedEvent,
  isEditing
} = useEvents()
</script>
