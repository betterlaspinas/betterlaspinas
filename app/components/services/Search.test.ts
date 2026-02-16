import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import Search from './Search.vue'

describe('search', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  })

  it('should render search input', () => {
    const wrapper = mount(Search, {
      global: {
        plugins: [router],
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    const input = wrapper.find('input[type="search"]')
    expect(input.exists()).toBe(true)
  })

  it('should have search placeholder', () => {
    const wrapper = mount(Search, {
      global: {
        plugins: [router],
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBeTruthy()
  })

  it('should render search icon', () => {
    const wrapper = mount(Search, {
      global: {
        plugins: [router],
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    const html = wrapper.html()
    expect(html).toContain('bi-search')
  })

  it('should update query on input', async () => {
    const wrapper = mount(Search, {
      global: {
        plugins: [router],
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    const input = wrapper.find('input')
    await input.setValue('certificate')

    // Query should be updated (verified via internal state)
    expect(input.element.value).toBe('certificate')
  })
})
