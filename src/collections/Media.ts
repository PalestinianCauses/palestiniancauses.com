// REVIEWED - 07
import type { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: hasPermissionAccess({ resource: "media", action: "read" }),
    create: hasPermissionAccess({ resource: "media", action: "create" }),
    update: hasPermissionAccess({ resource: "media", action: "update" }),
    delete: hasPermissionAccess({ resource: "media", action: "delete" }),
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
