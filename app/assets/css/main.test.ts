import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

// Regression guard: the container's max-width must stay below each breakpoint
// so side gutters are visible. Asserts the invariant, not exact px values, so
// retuning the widths is fine but an edge-to-edge container (the old bug) fails.

// CSS is not a JS module, so read main.css as text and parse it. Resolve from
// the project root (vitest's cwd) rather than import.meta.url, which Vite serves
// as a non-file URL under the test runner.
const css = readFileSync(join(process.cwd(), 'app/assets/css/main.css'), 'utf-8')
  .replace(/\/\*[\s\S]*?\*\//g, '') // strip comments so commented-out rules don't hide real ones

// Extract (min-width, max-width) pairs from the `@utility container` block.
// Capture each media block's full body and find `max-width` anywhere inside it,
// so it stays matched regardless of declaration order.
function containerBreakpoints(): Array<{ minWidth: number, maxWidth: number }> {
  const block = css.match(/@utility container\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const mediaBlocks = block.matchAll(/min-width:\s*(\d+)px\s*\)\s*\{([^{}]*)\}/g)
  return [...mediaBlocks].flatMap(([, min, body]) => {
    const max = (body ?? '').match(/max-width:\s*(\d+)px/)?.[1]
    return max ? [{ minWidth: Number(min), maxWidth: Number(max) }] : []
  })
}

describe('container utility — side gutters (max-width < breakpoint)', () => {
  // Guard against a broken parse silently passing with zero assertions.
  it('defines max-width for each responsive breakpoint', () => {
    expect(containerBreakpoints().length).toBeGreaterThan(0)
  })

  // Core invariant: narrower than the viewport leaves room for a gutter.
  it.each(containerBreakpoints())(
    'max-width $maxWidth is less than the $minWidth breakpoint (leaves a gutter)',
    ({ minWidth, maxWidth }) => {
      expect(maxWidth).toBeGreaterThan(0)
      expect(maxWidth).toBeLessThan(minWidth)
    },
  )
})
