<!-- eslint-disable max-len -->
<template>
  <ElDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    append-to-body
    title="Add Event"
    destroy-on-close
    class="w-[50%] max-w-[500px] p-[30px]"
  >
    <ElForm :model="eventForm" label-position="top" class="mb-4" @submit.prevent="addEvent">
      <ElFormItem label="Name" required>
        <ElInput v-model="eventForm.name" required clearable />
      </ElFormItem>
      <ElFormItem label="Description" required>
        <ElInput v-model="eventForm.description" required clearable />
      </ElFormItem>
      <ElFormItem label="Location" required>
        <div class="relative w-full">
          <ElInput
            v-model="query"
            placeholder="Enter 3 first letters of your location"
            clearable
          />
          <ul v-if="suggestions.length && query.length" class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-50 max-h-60 overflow-y-auto mt-1">
            <li
              v-for="item in suggestions"
              :key="item.place_id"
              class="p-2 cursor-pointer hover:bg-gray-100"
              @click="handleSelectLocation(item)"
            >
              {{ item.description }}
            </li>
          </ul>
        </div>
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
import PriorityPicker from '../../shared/PriorityPicker.vue'
import { usePlacesAutocomplete } from 'vue-use-places-autocomplete'

const {
  eventForm,
  dialogVisible,
  query,
  addEvent,
  selectLocation
} = useEvents()

const { suggestions } = usePlacesAutocomplete(query, {
  debounce: 500,
  minLengthAutocomplete: 2
})

const handleSelectLocation = (item: any) => {
  suggestions.value = []
  selectLocation(item)
}
</script>
