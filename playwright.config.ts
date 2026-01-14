// REVIEWED - 06

import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  timeout: 2 * 60 * 1000,
  expect: { timeout: 2 * 60 * 1000 },
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: { baseURL: process.env.NEXT_PUBLIC_URL, trace: "on-first-retry" },
  globalSetup: "./tests/global-setup.ts",
  globalTeardown: "./tests/global-teardown.ts",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes timeout for server to start
    stdout: "pipe",
    stderr: "pipe",
  },
});
