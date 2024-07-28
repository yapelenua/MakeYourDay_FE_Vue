import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'
import { v4 as uuidv4 } from 'uuid'
import { parseISO, format, startOfToday } from 'date-fns'
import type { IEvent } from '../../types/dashboard.types'

export const useEventListStore = defineStore('eventListStore', () => {
  const selectedDate = ref<string>('')
  const today = startOfToday()
  selectedDate.value = format(today, 'yyyy-MM-dd')

  const eventForm = ref({
    name: '',
    description: '',
    date: selectedDate.value,
    location: '',
    coords: { lat: '', lng: '' },
    priority: ''
  })
  const { user } = useGeneral()

  const dialogVisible = ref(false)
  const eventsInfoDialogVisible = ref(false)
  const selectedEvent = ref<IEvent>()
  const originalEvent = ref<IEvent>()
  const isEditing = ref(false)
  const searchValue = ref('')
  const query = ref('')

  const addEvent = async () => {
    try {
      if (!eventForm.value.name.trim() || !eventForm.value.description.trim() || !eventForm.value.date) {
        alert('Please fill in all fields.')
        return
      }

      const newEvent: IEvent = {
        id: uuidv4(),
        title: eventForm.value.name,
        description: eventForm.value.description,
        date: format(new Date(eventForm.value.date), 'yyyy-MM-dd') || selectedDate.value,
        location: eventForm.value.location,
        coords: await getLatLong(eventForm.value.location),
        priority: eventForm.value.priority
      }

      if (user.value && user.value.events) {
        user.value.events.push(newEvent)

        const { error } = await supabase
          .from('profiles')
          .update({ events: user.value.events })
          .eq('id', user.value.id)

        if (error) throw error

        eventForm.value.name = ''
        eventForm.value.description = ''
        eventForm.value.date = ''
        dialogVisible.value = false
      }
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const truncateText = (text: string, maxLength: number = 9) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  const openEventDialog = (event: IEvent) => {
    selectedEvent.value = { ...event }
    originalEvent.value = { ...event }
    eventsInfoDialogVisible.value = true
    isEditing.value = false
  }

  const startEditing = () => {
    isEditing.value = true
  }

  const getLatLong = async (address: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_API_GOOGLE_KEY}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location
        return { lat: location.lat, lng: location.lng }
      } else {
        throw new Error('Geocoding failed. Please check your input.')
      }
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  const saveEdit = async () => {
    try {
      if (selectedEvent.value && user.value) {
        const newCoords = await getLatLong(selectedEvent.value.location)

        if (newCoords) {
          selectedEvent.value.date = format(new Date(selectedEvent.value.date), 'yyyy-MM-dd')
          selectedEvent.value.coords = newCoords

          const index = user.value.events.findIndex((event: IEvent) => event.id === selectedEvent.value!.id)
          if (index !== -1) {
            user.value.events[index] = { ...selectedEvent.value }

            const { error } = await supabase
              .from('profiles')
              .update({ events: user.value.events })
              .eq('id', user.value.id)

            if (error) throw error

            isEditing.value = false
          }
        } else {
          throw new Error('Failed to get coordinates for the new location.')
        }
      }
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const cancelEdit = () => {
    if (originalEvent.value) {
      selectedEvent.value = { ...originalEvent.value }
    }
    isEditing.value = false
  }

  const handleDateSelect = (date: Date) => {
    selectedDate.value = format(date, 'yyyy-MM-dd')
  }

  const hasEventOnDate = (date: string) => {
    return user.value?.events.some((event: IEvent) => format(parseISO(event.date), 'yyyy-MM-dd') === date)
  }

  const filteredEvents = computed(() => {
    if (!user.value || !user.value.events) return []

    if (!selectedDate.value) {
      return user.value.events.filter((event: IEvent) =>
        event.title.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    }

    return user.value.events.filter((event: IEvent) => {
      const eventDate = format(parseISO(event.date), 'yyyy-MM-dd')
      return eventDate === selectedDate.value &&
        event.title.toLowerCase().includes(searchValue.value.toLowerCase())
    })
  })

  const deleteEvent = async (id: string) => {
    try {
      if (user.value) {
        user.value.events = user.value.events.filter((event: IEvent) => event.id !== id)

        const { error } = await supabase
          .from('profiles')
          .update({ events: user.value.events })
          .eq('id', user.value.id)

        if (error) throw error

        eventsInfoDialogVisible.value = false
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const fetchSuggestions = (queryString: string, cb: any) => {
    if (!queryString) {
      cb([])
      return
    }

    const autocompleteService = new google.maps.places.AutocompleteService()
    autocompleteService.getPlacePredictions({ input: queryString }, (predictions: any, status: string) => {
      if (status !== google.maps.places.EPlacesServiceStatus.OK) {
        cb([])
        return
      }
      cb(predictions.map((prediction: any) => ({
        value: prediction.description,
        place_id: prediction.place_id
      })))
    })
  }

  const selectLocation = (item: any) => {
    eventForm.value.location = item.value
    query.value = item.value
  }

  return {
    eventForm,
    dialogVisible,
    eventsInfoDialogVisible,
    selectedEvent,
    originalEvent,
    isEditing,
    selectedDate,
    addEvent,
    truncateText,
    openEventDialog,
    startEditing,
    saveEdit,
    cancelEdit,
    handleDateSelect,
    hasEventOnDate,
    deleteEvent,
    fetchSuggestions,
    selectLocation,
    searchValue,
    filteredEvents,
    query
  }
})

export function useEvents () {
  const store = useEventListStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
