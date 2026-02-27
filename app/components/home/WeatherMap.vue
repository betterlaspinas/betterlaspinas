<script setup lang="ts">
import LeafletMap from '@/components/home/LeafletMap.vue'
import { useConfig } from '@/composables/useConfig'

const { site, lguName, fullLocation, labels } = useConfig()
const coords = computed(() => [site.value.coordinates.lat, site.value.coordinates.lng] as [number, number])

// Weather Logic
const weatherTemp = ref<number | null>(null)
const weatherCode = ref<number>(0)
const weatherWindSpeed = ref<number | null>(null)
const weatherMaxTemp = ref<number | null>(null)
const weatherMinTemp = ref<number | null>(null)
const weatherError = ref(false)
const hourlyForecast = ref<{ time: string, temp: number, icon: string }[]>([])

function getWeatherIcon(code: number) {
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
}

const weatherIcon = computed(() => getWeatherIcon(weatherCode.value))

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
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${site.value.coordinates.lat}&longitude=${site.value.coordinates.lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&timezone=Asia%2FManila`)
    const data = await response.json()

    if (data && data.current_weather) {
      weatherTemp.value = data.current_weather.temperature
      weatherCode.value = data.current_weather.weathercode
      weatherWindSpeed.value = data.current_weather.windspeed

      if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
        weatherMaxTemp.value = data.daily.temperature_2m_max[0]
        weatherMinTemp.value = data.daily.temperature_2m_min[0]
      }

      if (data.hourly && data.hourly.time && data.hourly.temperature_2m) {
        const currentHour = new Date()
        const forecast = []

        for (let i = 0; i < data.hourly.time.length; i++) {
          const time = new Date(data.hourly.time[i])
          if (time >= currentHour && forecast.length < 4) {
            forecast.push({
              time: time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
              temp: Math.round(data.hourly.temperature_2m[i]),
              icon: getWeatherIcon(data.hourly.weathercode[i]),
            })
          }
        }
        hourlyForecast.value = forecast
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
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col hover-card-premium">
              <ClientOnly>
                <div v-if="!weatherError" class="flex flex-col h-full">
                  <!-- Current Weather -->
                  <div class="flex flex-col items-center text-center pb-6 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      {{ fullLocation }}
                    </p>
                    <div class="flex items-center justify-center gap-4 mb-2">
                      <i :class="`bi ${weatherIcon} text-6xl text-primary-600 leading-none opacity-90`" />
                      <Transition
                        mode="out-in"
                        enter-active-class="transition-opacity duration-300"
                        leave-active-class="transition-opacity duration-300"
                        enter-from-class="opacity-0"
                        leave-to-class="opacity-0"
                      >
                        <span v-if="weatherTemp !== null" class="text-6xl font-bold text-gray-900 leading-none tracking-tight">
                          {{ weatherTemp }}°
                        </span>
                        <span v-else class="text-6xl font-bold text-gray-900 leading-none tracking-tight">
                          --
                        </span>
                      </Transition>
                    </div>
                    <p class="text-lg text-gray-800 font-medium">
                      {{ weatherDescription }}
                    </p>
                  </div>

                  <!-- Weather Details -->
                  <div class="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
                    <div class="flex flex-col items-center text-center">
                      <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2 text-blue-600">
                        <i class="bi bi-wind text-sm" />
                      </div>
                      <span class="text-xs text-gray-500 mb-0.5">Wind</span>
                      <span v-if="weatherWindSpeed !== null" class="font-semibold text-gray-900 text-sm">
                        {{ weatherWindSpeed }} km/h
                      </span>
                      <span v-else class="font-semibold text-gray-900 text-sm">--</span>
                    </div>
                    <div class="flex flex-col items-center text-center">
                      <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-2 text-orange-600">
                        <i class="bi bi-thermometer-high text-sm" />
                      </div>
                      <span class="text-xs text-gray-500 mb-0.5">High</span>
                      <span v-if="weatherMaxTemp !== null" class="font-semibold text-gray-900 text-sm">
                        {{ weatherMaxTemp }}°
                      </span>
                      <span v-else class="font-semibold text-gray-900 text-sm">--</span>
                    </div>
                    <div class="flex flex-col items-center text-center">
                      <div class="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center mb-2 text-cyan-600">
                        <i class="bi bi-thermometer-low text-sm" />
                      </div>
                      <span class="text-xs text-gray-500 mb-0.5">Low</span>
                      <span v-if="weatherMinTemp !== null" class="font-semibold text-gray-900 text-sm">
                        {{ weatherMinTemp }}°
                      </span>
                      <span v-else class="font-semibold text-gray-900 text-sm">--</span>
                    </div>
                  </div>

                  <!-- Hourly Forecast -->
                  <div v-if="hourlyForecast.length > 0" class="mt-auto pt-6">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-1">
                      Hourly Forecast
                    </p>
                    <div class="flex justify-between overflow-x-auto pb-2 px-1 hide-scrollbar">
                      <div v-for="(hour, index) in hourlyForecast" :key="index" class="flex flex-col items-center min-w-[3rem]">
                        <span class="text-[0.7rem] font-medium text-gray-500 mb-2 whitespace-nowrap">{{ index === 0 ? 'Now' : hour.time }}</span>
                        <i :class="`bi ${hour.icon} text-xl text-primary-600 mb-2`" />
                        <span class="text-sm font-bold text-gray-900">{{ hour.temp }}°</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="flex items-center justify-center h-full text-gray-400 text-sm">
                  Weather unavailable
                </div>
                <template #fallback>
                  <div class="flex flex-col items-center h-full animate-pulse">
                    <div class="w-32 h-4 bg-gray-200 rounded mb-8 mt-2" />
                    <div class="w-20 h-20 bg-gray-200 rounded-full mb-4" />
                    <div class="w-24 h-8 bg-gray-200 rounded mb-2" />
                    <div class="w-32 h-4 bg-gray-200 rounded" />
                    <div class="mt-auto w-full h-24 bg-gray-200 rounded-xl" />
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Map Column -->
        <div class="flex flex-col">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
            <div
              id="map-container"
              class="h-[300px] lg:h-auto lg:flex-1 w-full relative z-0"
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
            <p class="text-sm text-gray-500 p-4 m-0 flex items-center gap-1.5 border-t border-gray-100 relative z-10 bg-white">
              <i class="bi bi-geo-alt text-primary-600" />
              {{ labels.hallName }}, {{ fullLocation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
