// REVIEWED - 05
import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/global";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "alt", "createdAt"],
    useAsTitle: "id",
  },
  upload: {
    staticDir: "./media",
    imageSizes: [
      {
        name: "room-photograph",
        width: 360,
        height: 360,
        position: "center",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
};
