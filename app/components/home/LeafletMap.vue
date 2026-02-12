<script setup lang="ts">
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

defineProps<{
  coords: [number, number]
  popupText: string
}>()

const zoom = 13
</script>

<template>
  <div style="height: 300px; width: 100%">
    <LMap :zoom="zoom" :center="coords" :use-global-leaflet="false">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <LMarker :lat-lng="coords">
        <LPopup>{{ popupText }}</LPopup>
      </LMarker>
    </LMap>
  </div>
</template>
