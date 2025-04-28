// REVIEWED - 02
import type { CollectionConfig } from "payload";

import { isAdmin, isAdminOrSystemUser } from "@/access/global";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: isAdminOrSystemUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: { staticDir: "./media" },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
};
