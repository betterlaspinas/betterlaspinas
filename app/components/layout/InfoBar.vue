<script setup lang="ts">
const { lguName } = useConfig()

const dateTime = ref({
  date: '--- --, ----',
  time: '--:-- --',
})

// Exchange Rates Logic
const currencies = ['USD', 'GBP', 'SAR', 'AED', 'JPY', 'CAD', 'AUD']
const exchangeRates = ref<Record<string, number>>({})
const currentCurrencyIndex = ref(0)
let currencyInterval: ReturnType<typeof setInterval>

const currentRateText = computed(() => {
  const currency = currencies[currentCurrencyIndex.value] || 0
  const rate = exchangeRates.value[currency]

  if (!rate) {
    return 'Loading...'
  }

  // Base is PHP, so rate is 1 PHP = X Currency
  // We want to show 1 Currency = Y PHP (so Y = 1/rate)
  const phpValue = 1 / rate

  return `1 ${currency} = ₱ ${phpValue.toFixed(2)}`
})

// No fallback rates to avoid misinformation
const hasError = ref(false)

async function fetchRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/PHP')
    const data = await response.json()

    if (data && data.result === 'success' && data.rates) {
      exchangeRates.value = data.rates
      hasError.value = false
    }
    else {
      // Silently handle error
      hasError.value = true
    }
  }
  catch {
    // Silently handle error
    hasError.value = true
  }
}

// Weather Logic
const weatherTemp = ref<number | null>(null)
const weatherCode = ref<number>(0)
const weatherError = ref(false)

const weatherIcon = computed(() => {
  const code = weatherCode.value
  // WMO Weather interpretation codes (WW)
  if (code === 0) {
    return 'bi-sun' // Clear sky
  }
  if (code === 1 || code === 2 || code === 3) {
    return 'bi-cloud-sun' // Mainly clear, partly cloudy, and overcast
  }
  if (code === 45 || code === 48) {
    return 'bi-cloud-fog' // Fog
  }
  if (code >= 51 && code <= 67) {
    return 'bi-cloud-drizzle' // Drizzle / Rain
  }
  if (code >= 80 && code <= 82) {
    return 'bi-cloud-rain-heavy' // Rain showers
  }
  if (code >= 95 && code <= 99) {
    return 'bi-cloud-lightning-rain' // Thunderstorm
  }
  return 'bi-thermometer-half' // Default
})

async function fetchWeather() {
  try {
    // Las Piñas Coordinates: Latitude: 14.4445, Longitude: 120.9939
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=14.4445&longitude=120.9939&current_weather=true')
    const data = await response.json()

    if (data && data.current_weather) {
      weatherTemp.value = data.current_weather.temperature
      weatherCode.value = data.current_weather.weathercode
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

function updateDateTime() {
  const now = new Date()
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  dateTime.value = {
    date: now.toLocaleDateString('en-US', dateOptions),
    time: now.toLocaleTimeString('en-US', timeOptions),
  }
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  updateDateTime()
  interval = setInterval(updateDateTime, 1000)

  // Exchange Rates
  fetchRates()
  fetchWeather()
  currencyInterval = setInterval(() => {
    currentCurrencyIndex.value = (currentCurrencyIndex.value + 1) % currencies.length
  }, 4000) // Change every 4 seconds
})

onUnmounted(() => {
  clearInterval(interval)
  clearInterval(currencyInterval)
})
</script>

<template>
  <div
    class="bg-[#00184d] text-white py-1.5 text-[0.6875rem] font-normal tracking-tight"
    role="complementary"
    aria-label="Real-time information"
  >
    <div class="container mx-auto px-4">
      <div
        class="flex items-center justify-end gap-3 flex-wrap"
        aria-live="polite"
        aria-atomic="false"
      >
        <!-- Exchange Rates -->
        <div
          v-if="!hasError"
          class="inline-flex items-center gap-1.5 text-white min-w-[115px]"
          aria-label="Exchange rates"
        >
          <i class="bi bi-currency-exchange text-xs text-yellow-400" />
          <ClientOnly>
            <Transition
              mode="out-in"
              enter-active-class="transition-opacity duration-300"
              leave-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span
                :key="currentCurrencyIndex"
                class="inline-block text-white"
              >
                {{ currentRateText }}
              </span>
            </Transition>
            <template #fallback>
              <span class="inline-block text-white">Loading rates...</span>
            </template>
          </ClientOnly>
        </div>

        <!-- Weather -->
        <div
          v-if="!weatherError"
          class="inline-flex items-center gap-1.5 text-white pl-4 border-l border-white/15"
          :aria-label="`Current weather in ${lguName}`"
        >
          <ClientOnly>
            <i :class="`bi ${weatherIcon} text-xs text-yellow-400`" />
            <span class="font-normal text-white">{{ lguName }}</span>
            <Transition
              mode="out-in"
              enter-active-class="transition-opacity duration-300"
              leave-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span v-if="weatherTemp" class="font-normal text-white">{{ weatherTemp }}°C</span>
              <span v-else class="font-normal text-white text-xs">...</span>
            </Transition>
          </ClientOnly>
        </div>

        <!-- Date & Time -->
        <div
          class="inline-flex items-center gap-1.5 text-white pl-4 border-l border-white/15"
          aria-label="Philippine Date and Time"
        >
          <i class="bi bi-calendar3 text-xs text-yellow-400" />
          <span class="font-normal text-white">{{ dateTime.date }}</span>
          <span
            class="text-white mx-0.5 text-[0.5rem]"
            aria-hidden="true"
          >
            •
          </span>
          <i class="bi bi-clock text-xs text-yellow-400" />
          <span class="font-medium text-white">{{ dateTime.time }}</span>
          <span class="font-normal text-white text-[0.625rem] uppercase tracking-wide">
            PHT
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
