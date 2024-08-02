<!-- eslint-disable max-len -->
<template>
  <ElDialog
    v-if="eventsInfoDialogVisible"
    v-model="eventsInfoDialogVisible"
    append-to-body
    title="Event Info"
    destroy-on-close
    class="w-[50%] max-w-[500px]"
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
          <div class="relative w-full">
            <ElInput
              v-model="locationQuery"
              placeholder="Enter 3 first letters of your location"
              clearable
              :disabled="!isEditing"
              @focus="isLocationInputFocused = true"
              @blur="isLocationInputFocused = false"
            />
            <ul v-if="isLocationInputFocused && suggestions.length && selectedEvent.location.length" class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-50 max-h-60 overflow-y-auto mt-1">
              <li
                v-for="item in suggestions"
                :key="item.place_id"
                class="p-2 cursor-pointer hover:bg-gray-100"
                @mousedown.prevent="handleSelectLocation(item)"
              >
                {{ item.description }}
              </li>
            </ul>
          </div>
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
import { usePlacesAutocomplete } from 'vue-use-places-autocomplete'
const isLocationInputFocused = ref(false)

const {
  startEditing,
  saveEdit,
  cancelEdit,
  deleteEvent,
  selectLocation,
  eventsInfoDialogVisible,
  selectedEvent,
  isEditing,
  locationQuery
} = useEvents()

watch(() => selectedEvent.value?.location, (newLocation) => {
  locationQuery.value = newLocation || ''
})

const { suggestions } = usePlacesAutocomplete(locationQuery, {
  debounce: 500,
  minLengthAutocomplete: 2
})

const handleSelectLocation = (item: any) => {
  suggestions.value = []
  selectLocation(item)
  locationQuery.value = item.description
  isLocationInputFocused.value = false
}
</script>
