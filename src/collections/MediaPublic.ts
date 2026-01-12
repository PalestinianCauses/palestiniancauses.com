// REVIEWED

import type { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const MediaPublic: CollectionConfig = {
  slug: "media-public",
  access: {
    create: hasPermissionAccess({ resource: "media-public", action: "create" }),
    read: () => true, // Always public
    update: ({ req }) =>
      hasPermissionAccess({ resource: "media-public", action: "update" })({
        req,
      }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "media-public", action: "delete" })({
        req,
      }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "media-public",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "alt", "createdAt"],
    useAsTitle: "id",
  },
  upload: {
    staticDir: "./media-public",
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
        width: 1280,
        height: 1920,
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
      admin: { hidden: true },
      name: "user",
      label: "User",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ operation, req, data }) => {
        if (operation === "create")
          if (!data.user)
            if (req.user)
              // eslint-disable-next-line no-param-reassign
              data.user = req.user.id;

        return data;
      },
    ],
  },
};
