<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
})

const mapContainer = ref(null)
let map = null
let marker = null

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const createMap = () => {
  const coordinates = {
    lat: props.lat,
    lng: props.lng
  }

  map = new google.maps.Map(mapContainer.value, {
    center: coordinates,
    zoom: 14
  })

  marker = new google.maps.Marker({
    position: coordinates,
    map
  })
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
  if (window.google) {
    createMap()
  }
}

onMounted(() => {
  const scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPxc3D1mmEam5zKQUZTnMKID9x7kquhG4'
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
