// REVIEWED - 08
import type { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: hasPermissionAccess({ resource: "media", action: "create" }),
    read: hasPermissionAccess({ resource: "media", action: "read" }),
    update: hasPermissionAccess({ resource: "media", action: "update" }),
    delete: hasPermissionAccess({ resource: "media", action: "delete" }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "media.admin",
        action: "read",
      }),
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
