// REVIEWED
import type { CollectionAfterChangeHook } from "payload";

export const syncUserWithFrappe: CollectionAfterChangeHook =
  async function syncUserWithFrappe({ doc, operation }) {
    if (operation === "create" && !doc.isSyncedWithFrappe) {
      // Syncing with Frappe here
    }
  };
