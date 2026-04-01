/// <reference types="node" />
import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests from the "tests/e2e" directory, relative to this configuration file. */
  testDir: './tests/e2e',

  /* Setting up timeout for each test steps */
  timeout: 30_000, // 30 seconds
  /* Setting up global timeout for each test steps */
  globalTimeout: 90_000, // 90 seconds

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['list']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://betterlaspinas.org/',
    testIdAttribute: 'data-test',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    /* Timeout for each action like click(), fill() etc. */
    actionTimeout: 0,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup.ts/, // only runs setup files
    },
    {
      name: 'chromium',
      /* ensures setup project runs before this one, allowing us to set up the environment (e.g., log in) before running tests that require it. */
      dependencies: ['setup'],

      /* grants clipboard read permission to the tests running in this project, allowing them to access the clipboard content during test execution. */
      use: { ...devices['Desktop Chrome'], permissions: ['clipboard-read'] },
    },

    // {
    //   name: 'firefox',
    //   /* ensures setup project runs before this one, allowing us to set up the environment (e.g., log in) before running tests that require it. */
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Firefox'], permissions: ['clipboard-read'] },
    // },

    // {
    //   name: 'webkit',
    //   /* ensures setup project runs before this one, allowing us to set up the environment (e.g., log in) before running tests that require it. */
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Safari'], permissions: ['clipboard-read'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
