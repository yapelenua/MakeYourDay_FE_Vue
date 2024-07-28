<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  lat: number
  lng: number
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: google.maps.Map | null = null
let marker: google.maps.Marker | null = null

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

const createMap = () => {
  const coordinates = {
    lat: props.lat,
    lng: props.lng
  }

  if (mapContainer.value) {
    map = new google.maps.Map(mapContainer.value, {
      center: coordinates,
      zoom: 14
    })

    marker = new google.maps.Marker({
      position: coordinates,
      map
    })
  }
}

const updateMap = () => {
  if (map && marker) {
    const coordinates = {
      lat: props.lat,
      lng: props.lng
    }
    map.setCenter(coordinates)
    marker.setPosition(coordinates)
  }
}

const loadMap = () => {
  if (window.google && window.google.maps) {
    createMap()
  }
}

onMounted(() => {
  const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_GOOGLE_KEY}`
  loadScript(scriptSrc).then(loadMap).catch(error => {
    console.error('Failed to load the Google Maps script:', error)
  })
})

watch(() => [props.lat, props.lng], updateMap)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 220px;
}
</style>
