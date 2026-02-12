import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { useClickOutside } from './useClickOutside'

describe('useClickOutside', () => {
  it('should call callback when clicking outside element', async () => {
    const callback = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const el = ref(null)
        useClickOutside([el], callback)
        return { el }
      },
      template: '<div ref="el">Inside</div>',
    })

    const wrapper = mount(TestComponent, {
      attachTo: document.body,
    })

    // Simulate click outside
    document.body.click()

    expect(callback).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should not call callback when clicking inside element', async () => {
    const callback = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const el = ref(null)
        useClickOutside([el], callback)
        return { el }
      },
      template: '<div ref="el">Inside</div>',
    })

    const wrapper = mount(TestComponent, {
      attachTo: document.body,
    })

    // Simulate click inside
    await wrapper.find('div').trigger('click')

    expect(callback).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})
