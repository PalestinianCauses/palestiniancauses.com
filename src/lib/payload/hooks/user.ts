// REVIEWED - 01
import type { CollectionAfterChangeHook } from "payload";

import { User } from "@/payload-types";

export const syncUserWithFrappe: CollectionAfterChangeHook<User> =
  async function syncUserWithFrappe({ doc, operation }) {
    if (operation === "create" && !doc.isSyncedWithFrappe) {
      // Syncing with Frappe here
    }
  };
