<script setup lang="ts">
export interface CarouselImage {
  src: string
  alt: string
}

const props = withDefaults(defineProps<{
  images: CarouselImage[]
  interval?: number
}>(), {
  interval: 4000,
})

const currentIndex = ref(0)
const isPaused = ref(false)
const failedImages = reactive(new Set<number>())
let timer: ReturnType<typeof setInterval> | null = null

const totalSlides = computed(() => props.images.length)

// Varied gradients so placeholder slides look distinct
const gradients = [
  'from-emerald-500 to-teal-700',
  'from-amber-500 to-orange-700',
  'from-violet-500 to-purple-700',
  'from-sky-500 to-blue-700',
  'from-rose-500 to-pink-700',
]

function gradientFor(index: number) {
  return gradients[index % gradients.length]
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

function goTo(index: number) {
  currentIndex.value = index
  resetAutoplay()
}

function startAutoplay() {
  stopAutoplay()
  if (totalSlides.value > 1) {
    timer = setInterval(next, props.interval)
  }
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetAutoplay() {
  if (!isPaused.value)
    startAutoplay()
}

function onMouseEnter() {
  isPaused.value = true
  stopAutoplay()
}

function onMouseLeave() {
  isPaused.value = false
  startAutoplay()
}

function onImageError(index: number) {
  failedImages.add(index)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <div
    v-if="images.length"
    class="relative overflow-hidden rounded-2xl shadow-xl group"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Slides Track -->
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full flex-shrink-0"
      >
        <div class="relative aspect-[4/3]">
          <!-- Actual image -->
          <img
            v-if="!failedImages.has(index)"
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
            loading="lazy"
            @error="onImageError(index)"
          >

          <!-- Gradient fallback when image missing or failed -->
          <div
            v-else
            class="w-full h-full bg-gradient-to-br flex items-center justify-center"
            :class="gradientFor(index)"
          >
            <div class="text-center text-white/90 px-6">
              <i class="bi bi-image text-5xl mb-3 block opacity-60" />
              <span class="text-sm font-medium">{{ image.alt }}</span>
            </div>
          </div>

          <!-- Bottom gradient overlay for caption readability -->
          <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          <!-- Caption -->
          <div class="absolute bottom-10 left-4 right-16">
            <p class="text-white text-sm font-medium drop-shadow-lg truncate">
              {{ image.alt }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev Arrow -->
    <button
      v-if="totalSlides > 1"
      type="button"
      class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 cursor-pointer"
      aria-label="Previous slide"
      @click="prev(); resetAutoplay()"
    >
      <i class="bi bi-chevron-left text-lg" />
    </button>

    <!-- Next Arrow -->
    <button
      v-if="totalSlides > 1"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 cursor-pointer"
      aria-label="Next slide"
      @click="next(); resetAutoplay()"
    >
      <i class="bi bi-chevron-right text-lg" />
    </button>

    <!-- Dot Indicators -->
    <div v-if="totalSlides > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, index) in images"
        :key="index"
        type="button"
        class="h-2 rounded-full transition-all duration-300 cursor-pointer"
        :class="index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75 w-2'"
        :aria-label="`Go to slide ${index + 1}`"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>
