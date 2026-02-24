<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { site, lguName, siteBrandName, lguNameConcatenated, navigation } = useConfig()
const currentYear = new Date().getFullYear()

const footerNav = navigation.footerNav

const footerNavigation = computed(() => ({
  mainSections: [
    { title: 'Quick Links', links: footerNav.quickLinks },
    { title: 'Resources', links: footerNav.resources },
    { title: 'Get Involved', links: footerNav.getInvolved },
  ],
}))

const logoPath = computed(() => site.value.logo?.white || '/logos/svg/BetterGov_Icon-White.svg')

const socialLinks = computed(() => [
  { label: 'Facebook', href: site.value.social.facebook, icon: 'bi-facebook' },
  { label: 'Twitter', href: site.value.social.twitter, icon: 'bi-twitter-x' },
  { label: 'Instagram', href: site.value.social.instagram, icon: 'bi-instagram' },
  { label: 'YouTube', href: site.value.social.youtube, icon: 'bi-youtube' },
  { label: 'Discord', href: site.value.social.discord, icon: 'bi-discord' },
].filter(link => link.href))
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 pt-12 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <img
              :src="logoPath"
              :alt="`Better${lguNameConcatenated} Logo`"
              class="h-12 w-12 mr-3"
            >

            <div>
              <div class="font-bold">
                Better {{ lguName }}
              </div>
              <div class="text-xs text-gray-400">
                {{ site.domain }}
              </div>
            </div>
          </div>
          <p class="text-gray-400 text-sm mb-4">
            Empowering the people of {{ lguName }} with transparent access to the
            services, programs, and public funds of LGU {{ lguName }}.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="`bi ${link.icon}`" class="text-xl" />
            </a>
          </div>
        </div>

        <div v-for="section in footerNavigation.mainSections" :key="section.title">
          <h3 class="text-lg font-semibold mb-4">
            {{ section.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.label">
              <a
                v-if="link.href.startsWith('http') || link.href.startsWith('mailto')"
                :href="link.href"
                class="text-gray-400 hover:text-white text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
              <NuxtLink
                v-else
                :to="link.href"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex justify-center my-24">
        <p class="text-white text-sm md:text-lg bg-gray-800 p-4 px-12 md:px-8 rounded-full border border-gray-700">
          Cost to the People of {{ lguName }}: <span class="text-green-500">₱0</span>.
        </p>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm mb-4 md:mb-0">
            © {{ currentYear }} {{ siteBrandName }}. All rights reserved. MIT | CC BY 1.0 All public
            information sourced from official government portals.
          </p>
          <div class="flex space-x-6">
            <a
              v-if="site.social.github"
              :href="site.social.github"
              class="text-gray-400 hover:text-white text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute on GitHub
            </a>
            <NuxtLink
              to="/sitemap"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
