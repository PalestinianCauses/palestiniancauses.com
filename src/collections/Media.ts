// REVIEWED - 03
import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/global";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "alt", "createdAt"],
    useAsTitle: "id",
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
