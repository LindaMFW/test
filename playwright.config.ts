import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 */

export default defineConfig({
  //testMatch:["/e2e/mockApi.test.ts"],
  /* Maximum time one test can run for. */

  //outputDir: "__results",
  timeout: 600 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //reporter: process.env.CI ? 'dot' : 'html',

  reporter: [
    ["html", { outputFolder: "__reports/" }],
    [
      "junit",
      {
        outputFile: "__reports/test-report.xml",
        embedAnnotationsAsProperties: true,
      },
    ],
    [
      "allure-playwright",
      {
        outputFolder: "__reports_allure/",
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          E2E_NODE_VERSION: process.version,
          E2E_OS: process.platform,
        },
      },
    ],
    [
      "./libs/customReporter.ts",
      { outputFile: `__reports/test-report-for-slack.json` },
    ],
  ],

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    headless: process.env.CI ? true : true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? "on" : "on",
    // baseURL: 'https://example.com',
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "api",
      testDir: "./testcases",
    },
    {
      name: "chrome",
      testDir: "./testcases/fe",
      use: {
        channel: "chrome",
        storageState: "localStorage/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "chromnium",
      testDir: "./testcases/fe",

      use: {
        ...devices["Desktop Chrome"],
        storageState: "localStorage/.auth/user.json",
        actionTimeout: 8000,
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      dependencies: ["setup"],
      testDir: "./testcases/fe",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "localStorage/.auth/user.json",
        actionTimeout: 8000,
      },
    },
    {
      name: "safari",
      testDir: "./testcases/fe",
      use: {
        ...devices["Desktop Safari"],
        storageState: "localStorage/.auth/user.json",
        actionTimeout: 8000,
      },
      dependencies: ["setup"],
    },

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
    //   name: 'Microsoft Edge',cs
    //   use: { channel: 'msedge' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
