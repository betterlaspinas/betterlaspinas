import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    exclude: ['legacy_backup/**', 'node_modules/**', '.nuxt/**', '.output/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      exclude: [
        'node_modules/',
        '.nuxt/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'app/components/ui/shadcn/**', // Exclude shadcn components if they are auto-generated/copied
      ],
    },
  },
  poolOptions: {
    threads: {
      singleThread: true,
    },
  },
})
