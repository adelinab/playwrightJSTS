import { defineConfig, devices } from '@playwright/test';



/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
 
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   
    browserName: 'chromium',
    trace: 'on-first-retry',
    headless: false
  },

});

module.exports = config