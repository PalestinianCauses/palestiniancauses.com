// REVIEWED - 16
import type { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { messages } from "@/lib/messages";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Media: CollectionConfig = {
  slug: "media-private",
  access: {
    create: hasPermissionAccess({
      resource: "media-private",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "media-private", action: "read" })({
        req,
      }) || {
        or: [
          { owner: { equals: req.user?.id } },
          { users: { equals: req.user?.id } },
        ],
      },
    update: ({ req }) =>
      hasPermissionAccess({ resource: "media-private", action: "update" })({
        req,
      }) || isSelf("owner")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "media-private", action: "delete" })({
        req,
      }) || isSelf("owner")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "media-private",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "alt", "createdAt"],
    useAsTitle: "id",
  },
  upload: {
    staticDir: "./media-private",
  },
  fields: [
    {
      admin: { hidden: true },
      name: "owner",
      label: "Owner",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      name: "users",
      label: "Users with Access",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
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
          if (!data.owner)
            if (req.user)
              // eslint-disable-next-line no-param-reassign
              data.owner = req.user.id;

        return data;
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const products = await req.payload.find({
          collection: "products",
          where: { "type": { equals: "file" }, "files.file": { equals: id } },
          limit: 1,
        });

        if (products.docs.length !== 0) {
          throw new Error(messages.actions.media.canNotDeleteReferenced);
        }
      },
    ],
  },
};
