import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Breadcrumbs from './Breadcrumbs.vue'

describe('breadcrumbs', () => {
  it('should render breadcrumb items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Business Permits' },
    ]

    const wrapper = mount(Breadcrumbs, {
      props: { items },
      global: {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      },
    })

    // Debug output
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Services')
    expect(wrapper.text()).toContain('Business Permits')
  })

  it('should render links for items with href', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ]

    const wrapper = mount(Breadcrumbs, {
      props: { items },
      global: {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      },
    })

    const links = wrapper.findAllComponents(RouterLinkStub)
    // Hardcoded Home + 2 items = 3 links
    expect(links.length).toBeGreaterThanOrEqual(2)
    // First link is Hardcoded Home (path /)
    // Second link is Home item from props (path /)
    // Check specific items
    const itemLinks = links.filter(l => l.props().to === '/services')
    expect(itemLinks.length).toBe(1)
  })

  it('should render last item without link', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ]

    const wrapper = mount(Breadcrumbs, {
      props: { items },
      global: {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      },
    })

    // Last item should not be a link
    const text = wrapper.text()
    expect(text).toContain('Current Page')

    const links = wrapper.findAllComponents(RouterLinkStub)
    // Hardcoded Home + 1 item link + 1 text item
    expect(links.length).toBe(2)
  })

  it('should handle single breadcrumb item', () => {
    const items = [
      { label: 'Home' },
    ]

    const wrapper = mount(Breadcrumbs, {
      props: { items },
      global: {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Home')
  })
})
