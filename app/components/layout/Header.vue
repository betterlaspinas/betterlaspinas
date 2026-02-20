<script setup lang="ts">
import {
  ChevronDown,
  Globe,
  Menu,
  Search,
  X,
} from 'lucide-vue-next'
import { ref } from 'vue'
import LanguageSelector from '@/components/ui/LanguageSelector.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useSiteConfig } from '@/composables/useSiteConfig'
import { getNavigationConfig } from '@/utils/configHelper'

const isOpen = ref(false)
const activeMenu = ref<string | null>(null)
const hoveredDropdown = ref<string | null>(null)

const route = useRoute()
const { translate } = useLanguage()
const { site, lguName, lguNameConcatenated, getOfficialWebsite, siteBrandName } = useSiteConfig()
const officialWebsite = getOfficialWebsite()

const mainNavigation = getNavigationConfig().mainNav

function isActiveRoute(pathname: string, href: string): boolean {
  if (!href)
    return false
  // Remove trailing slash for comparison unless it's root
  const currentPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
  if (href === '/')
    return currentPath === '/'
  return currentPath.startsWith(href)
}

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    activeMenu.value = null
  }
}

function closeMenu() {
  isOpen.value = false
  activeMenu.value = null
}

function toggleSubmenu(label: string) {
  activeMenu.value = activeMenu.value === label ? null : label
}

const logoPath = computed(() => site.logo?.main || '/logos/svg/BetterGov_Icon-Primary.svg')
</script>

<template>
  <nav class="bg-white shadow-xs sticky top-0 z-50">
    <!-- Top bar with language switcher and additional links -->
    <div class="border-b border-gray-200">
      <div class="container mx-auto px-4 flex justify-end items-center h-10">
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/join-us"
            class="text-xs leading-12 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            🚀 Join Us
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-xs leading-12 text-gray-800 hover:text-primary-600 transition-colors"
          >
            About <span class="hidden md:inline">{{ siteBrandName }}</span>
          </NuxtLink>
          <a
            :href="officialWebsite"
            class="text-xs leading-12 text-gray-800 hover:text-primary-600 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            Official {{ lguName }} Website
          </a>

          <NuxtLink
            to="/contact"
            class="text-xs leading-12 text-gray-800 hover:text-primary-600 transition-colors"
          >
            Hotlines
          </NuxtLink>
          <div class="hidden md:block">
            <LanguageSelector class="text-xs" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main navigation -->
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img
              :src="logoPath"
              :alt="`${lguName} Logo`"
              class="h-12 w-12 mr-3"
            >
            <div>
              <div class="text-black font-bold">
                Better{{ lguNameConcatenated }}
              </div>
              <div class="text-xs text-gray-800 hidden xl:block">
                A community-run portal for {{ lguName }}
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop navigation -->
        <div class="hidden lg:flex items-center lg:space-x-4 xl:space-x-8 lg:pr-6 xl:pr-24 lg:leading-10">
          <div
            v-for="item in mainNavigation"
            :key="item.label"
            class="relative group"
            @mouseenter="hoveredDropdown = item.label"
            @mouseleave="hoveredDropdown = null"
          >
            <NuxtLink
              :to="item.href"
              class="flex items-center font-medium transition-colors pb-1 border-b-2 whitespace-nowrap"
              :class="isActiveRoute(route.path, item.href)
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-700 hover:text-primary-600 border-transparent'"
            >
              {{ translate(`nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}
              <ChevronDown
                v-if="item.children"
                class="ml-1 h-4 w-4 transition-colors"
                :class="isActiveRoute(route.path, item.href)
                  ? 'text-primary-600'
                  : 'text-gray-800 group-hover:text-primary-600'"
              />
            </NuxtLink>
            <div
              v-if="item.children"
              class="absolute left-0 mt-2 lg:mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 transition-all duration-200 z-50"
              :class="hoveredDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'"
            >
              <div class="py-1" role="menu" aria-orientation="vertical">
                <template v-for="child in item.children" :key="child.label">
                  <a
                    v-if="child.href.startsWith('http')"
                    :href="child.href"
                    class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    role="menuitem"
                    target="_blank"
                  >
                    {{ child.label }}
                  </a>
                  <NuxtLink
                    v-else
                    :to="child.href"
                    class="text-left block px-4 py-2 text-sm"
                    :class="route.path === child.href
                      ? 'bg-primary-500 text-primary-50 hover:bg-primary-500 hover:text-primary-50'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'"
                    role="menuitem"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:flex items-center space-x-6">
          <NuxtLink
            to="/services"
            class="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            <Search class="h-4 w-4 mr-1" />
            Search
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden flex items-center">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary-500"
            @click="toggleMenu"
          >
            <span class="sr-only">Open main menu</span>
            <X v-if="isOpen" class="block h-6 w-6" aria-hidden="true" />
            <Menu v-else class="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="lg:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
        <div v-for="item in mainNavigation" :key="item.label">
          <button
            v-if="item.children"
            type="button"
            class="w-full flex justify-between items-center px-4 py-2 text-base font-medium transition-colors"
            :class="isActiveRoute(route.path, item.href)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'"
            @click="toggleSubmenu(item.label)"
          >
            <div class="flex items-center w-full">
              {{ translate(`nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}
            </div>
            <ChevronDown
              class="h-5 w-5 transition-transform"
              :class="[
                activeMenu === item.label ? 'transform rotate-180' : '',
                isActiveRoute(route.path, item.href) ? 'text-primary-600' : '',
              ]"
            />
          </button>
          <NuxtLink
            v-else
            :to="item.href"
            class="w-full flex justify-between items-center px-4 py-2 text-base font-medium transition-colors"
            :class="isActiveRoute(route.path, item.href)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'"
            @click="toggleMenu()"
          >
            <div class="flex items-center w-full">
              {{ translate(`nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}
            </div>
          </NuxtLink>
          <div v-if="item.children && activeMenu === item.label" class="pl-6 py-2 space-y-1 bg-gray-50">
            <template v-for="child in item.children" :key="child.label">
              <a
                v-if="child.href.startsWith('http')"
                :href="child.href"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                target="_blank"
                @click="closeMenu"
              >
                {{ child.label }}
              </a>
              <NuxtLink
                v-else
                :to="child.href"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                @click="closeMenu"
              >
                {{ child.label }}
              </NuxtLink>
            </template>
          </div>
        </div>
        <NuxtLink
          to="/join-us"
          class="block px-4 py-2 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
          @click="closeMenu"
        >
          🚀 Join Us
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          @click="closeMenu"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/services"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          @click="closeMenu"
        >
          Search Services
        </NuxtLink>
        <NuxtLink
          to="/sitemap"
          class="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          @click="closeMenu"
        >
          Sitemap
        </NuxtLink>
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="flex items-center">
            <Globe class="h-5 w-5 text-gray-800 mr-2" />
            <LanguageSelector class="text-sm" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
