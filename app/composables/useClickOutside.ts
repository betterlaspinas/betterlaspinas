export function useClickOutside(
  targets: (HTMLElement | null | undefined | Ref<HTMLElement | null | undefined>)[],
  callback: (event: Event) => void,
) {
  if (!targets)
    return

  const listener = (event: Event) => {
    const isClickInside = targets.some((target) => {
      const el = unref(target)
      return el && (el === event.target || el.contains(event.target as Node))
    })

    if (!isClickInside) {
      callback(event)
    }
  }

  onMounted(() => {
    window.addEventListener('click', listener)
  })

  onUnmounted(() => {
    window.removeEventListener('click', listener)
  })
}
