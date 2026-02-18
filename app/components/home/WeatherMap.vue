<script setup lang="ts">
import LeafletMap from '@/components/home/LeafletMap.vue'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { site, lguName, fullLocation, labels } = useSiteConfig()
const coords = [site.coordinates.lat, site.coordinates.lng] as [number, number]

// Weather Logic
const weatherTemp = ref<number | null>(null)
const weatherCode = ref<number>(0)
const weatherWindSpeed = ref<number | null>(null)
const weatherMaxTemp = ref<number | null>(null)
const weatherMinTemp = ref<number | null>(null)
const weatherError = ref(false)

const weatherIcon = computed(() => {
  const code = weatherCode.value
  switch (true) {
    case code === 0:
      return 'bi-sun'
    case code >= 1 && code <= 3:
      return 'bi-cloud-sun'
    case code === 45 || code === 48:
      return 'bi-cloud-fog'
    case code >= 51 && code <= 67:
      return 'bi-cloud-drizzle'
    case code >= 80 && code <= 82:
      return 'bi-cloud-rain-heavy'
    case code >= 95 && code <= 99:
      return 'bi-cloud-lightning-rain'
    default:
      return 'bi-thermometer-half'
  }
})

const weatherDescription = computed(() => {
  const code = weatherCode.value
  switch (true) {
    case code === 0:
      return 'Clear Sky'
    case code === 1:
      return 'Mainly Clear'
    case code === 2:
      return 'Partly Cloudy'
    case code === 3:
      return 'Overcast'
    case code === 45 || code === 48:
      return 'Foggy'
    case code >= 51 && code <= 55:
      return 'Drizzle'
    case code >= 56 && code <= 57:
      return 'Freezing Drizzle'
    case code >= 61 && code <= 65:
      return 'Rain'
    case code >= 66 && code <= 67:
      return 'Freezing Rain'
    case code >= 71 && code <= 77:
      return 'Snow'
    case code >= 80 && code <= 82:
      return 'Rain Showers'
    case code >= 85 && code <= 86:
      return 'Snow Showers'
    case code >= 95 && code <= 99:
      return 'Thunderstorm'
    default:
      return 'Weather data unavailable'
  }
})

async function fetchWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=14.4445&longitude=120.9939&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FManila')
    const data = await response.json()

    if (data && data.current_weather) {
      weatherTemp.value = data.current_weather.temperature
      weatherCode.value = data.current_weather.weathercode
      weatherWindSpeed.value = data.current_weather.windspeed

      if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
        weatherMaxTemp.value = data.daily.temperature_2m_max[0]
        weatherMinTemp.value = data.daily.temperature_2m_min[0]
      }

      weatherError.value = false
    }
    else {
      weatherError.value = true
    }
  }
  catch {
    weatherError.value = true
  }
}

onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-xl font-bold text-gray-900 m-0">
          Weather and Map of {{ lguName }}
        </h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-stretch">
        <!-- Weather Column -->
        <div class="flex flex-col">
          <div id="weather-container" class="h-full">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <ClientOnly>
                <div v-if="!weatherError" class="flex flex-col h-full">
                  <div class="flex items-start gap-4 pb-4">
                    <i :class="`bi ${weatherIcon} text-5xl text-primary-600 leading-none opacity-90`" />
                    <div class="flex-1">
                      <Transition
                        mode="out-in"
                        enter-active-class="transition-opacity duration-300"
                        leave-active-class="transition-opacity duration-300"
                        enter-from-class="opacity-0"
                        leave-to-class="opacity-0"
                      >
                        <span v-if="weatherTemp !== null" class="text-4xl font-bold text-gray-900 leading-none tracking-tight">
                          {{ weatherTemp }}°C
                        </span>
                        <span v-else class="text-4xl font-bold text-gray-900 leading-none tracking-tight">
                          ...
                        </span>
                      </Transition>
                      <p class="text-[0.9375rem] text-gray-800 font-medium mt-1.5 mb-1">
                        {{ weatherDescription }}
                      </p>
                      <p class="text-xs text-gray-500 flex items-center gap-1">
                        <i class="bi bi-geo-alt text-primary-600 text-[0.6875rem]" />
                        {{ fullLocation }}
                      </p>
                    </div>
                  </div>

                  <!-- Weather Details -->
                  <div class="mt-auto pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                    <div class="flex flex-col items-center text-center">
                      <span class="text-xs text-gray-500 mb-1">Wind</span>
                      <span v-if="weatherWindSpeed !== null" class="font-semibold text-gray-900">
                        {{ weatherWindSpeed }}<span class="text-xs font-normal text-gray-500 ml-0.5">km/h</span>
                      </span>
                      <span v-else class="font-semibold text-gray-900">--</span>
                    </div>
                    <div class="flex flex-col items-center text-center">
                      <span class="text-xs text-gray-500 mb-1">High</span>
                      <span v-if="weatherMaxTemp !== null" class="font-semibold text-gray-900">
                        {{ weatherMaxTemp }}°
                      </span>
                      <span v-else class="font-semibold text-gray-900">--</span>
                    </div>
                    <div class="flex flex-col items-center text-center">
                      <span class="text-xs text-gray-500 mb-1">Low</span>
                      <span v-if="weatherMinTemp !== null" class="font-semibold text-gray-900">
                        {{ weatherMinTemp }}°
                      </span>
                      <span v-else class="font-semibold text-gray-900">--</span>
                    </div>
                  </div>
                </div>
                <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
                  Weather unavailable
                </div>
                <template #fallback>
                  <div class="flex items-start gap-4 pb-4 animate-pulse">
                    <div class="w-12 h-12 bg-gray-200 rounded-full" />
                    <div class="flex-1 space-y-2">
                      <div class="h-8 bg-gray-200 rounded w-1/3" />
                      <div class="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Map Column -->
        <div class="flex flex-col">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div
              id="map-container"
              class="h-[300px] w-full relative z-0"
            >
              <ClientOnly>
                <LeafletMap :coords="coords" :popup-text="labels.hallName" />
                <template #fallback>
                  <div class="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
                    Loading map...
                  </div>
                </template>
              </ClientOnly>
            </div>
            <p class="text-sm text-gray-500 p-4 m-0 flex items-center gap-1.5">
              <i class="bi bi-geo-alt text-primary-600" />
              {{ labels.hallName }}, {{ fullLocation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
