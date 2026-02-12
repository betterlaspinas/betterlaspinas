<script setup lang="ts">
const { lguName } = useSiteConfig()

const dateTime = ref({
  date: '--- --, ----',
  time: '--:-- --',
})

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
})

onUnmounted(() => {
  clearInterval(interval)
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
        class="flex items-center justify-end gap-6 flex-wrap"
        aria-live="polite"
        aria-atomic="false"
      >
        <!-- Exchange Rates -->
        <div
          class="inline-flex items-center gap-1.5 text-white"
          aria-label="Exchange rates"
        >
          <i class="bi bi-currency-exchange text-xs text-yellow-400" />
          <span class="inline-block min-w-[110px] text-left">
            <span class="inline-block text-white">1 USD = ₱ 56.50</span>
          </span>
        </div>

        <!-- Weather -->
        <div
          class="inline-flex items-center gap-1.5 text-white pl-4 border-l border-white/15"
          :aria-label="`Current weather in ${lguName}`"
        >
          <i class="bi bi-thermometer-half text-xs text-yellow-400" />
          <span class="font-normal text-white">{{ lguName }}</span>
          <span class="font-normal text-white">29°C</span>
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
