// REVIEWED - 01

import type { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { messages } from "@/lib/messages";
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
    beforeDelete: [
      async ({ id, req }) => {
        const responses = await Promise.all([
          req.payload.find({
            collection: "blogs-categories",
            where: { image: { equals: id } },
            limit: 1,
          }),
          req.payload.find({
            collection: "blogs-posts",
            where: { imageFeatured: { equals: id } },
            limit: 1,
          }),
          req.payload.find({
            collection: "rooms",
            where: {
              or: [
                { "information.photograph": { equals: id } },
                { "about.photograph": { equals: id } },
                { "experience.photograph": { equals: id } },
                { "qualification.photograph": { equals: id } },
                { "qualification.certificate": { equals: id } },
              ],
            },
            limit: 1,
          }),
          req.payload.find({
            collection: "rooms-packages",
            where: { image: { equals: id } },
            limit: 1,
          }),
          req.payload.find({
            collection: "users",
            where: { avatar: { equals: id } },
            limit: 1,
          }),
        ]);

        if (responses.some((response) => response.docs.length !== 0)) {
          throw new Error(messages.actions.media.canNotDeleteReferenced);
        }
      },
    ],
  },
};
