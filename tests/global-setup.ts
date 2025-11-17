// REVIEWED

import { FullConfig } from "@playwright/test";

const setupGlobal = async function setupGlobal(config: FullConfig) {
  console.log("Running global setup...");
};

export default setupGlobal;
