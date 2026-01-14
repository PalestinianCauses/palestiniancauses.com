// REVIEWED

import { FullConfig } from "@playwright/test";

const teardownGlobal = async function teardownGlobal(config: FullConfig) {
  console.log("Running global teardown...");
};

export default teardownGlobal;
