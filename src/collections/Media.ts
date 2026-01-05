// REVIEWED - 12
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
        resource: "media",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "alt", "createdAt"],
    useAsTitle: "id",
  },
  upload: {
    staticDir: "./media",
    imageSizes: [
      {
        name: "user-avatar",
        width: 360,
        height: 360,
        position: "center",
        withoutEnlargement: false,
      },
      {
        name: "room-photograph",
        width: 960,
        height: 1280,
        position: "center",
        withoutEnlargement: false,
      },
      {
        name: "blog-post-image",
        width: 1200,
        height: 630,
        position: "center",
        withoutEnlargement: false,
      },
    ],
    resizeOptions: {
      width: 480,
      height: 480,
      fit: "inside",
      position: "center",
      withoutEnlargement: false,
    },
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
