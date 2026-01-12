// REVIEWED - 03

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { hasPermission } from "@/lib/permissions";
import { isNumber } from "@/lib/types/guards";
import { BlogsCategory, User } from "@/payload-types";

export const BlogsCategories: CollectionConfig = {
  slug: "blogs-categories",
  access: {
    create: hasPermissionAccess({
      resource: "blogs-categories",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-categories", action: "read" })({
        req,
      }) || isSelf("roomOwner")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({
        resource: "blogs-categories",
        action: "update",
      })({ req }) || isSelf("roomOwner")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({
        resource: "blogs-categories",
        action: "delete",
      })({ req }) || isSelf("roomOwner")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs-categories",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: ["id", "name", "slug", "room", "roomOwner", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description:
          "The blog room this category belongs to. Categories are scoped to their blog room.",
      },
      label: "Blog Room",
      name: "room",
      type: "relationship",
      relationTo: "blogs-rooms",
      hasMany: false,
      required: true,
      index: true,
    },
    {
      admin: {
        readOnly: true,
        position: "sidebar",
        description:
          "The owner of the blog room this category belongs to. Automatically populated from the blog room.",
      },
      label: "Blog Room Owner",
      name: "roomOwner",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: false,
    },
    {
      admin: {
        description:
          "A unique name for this category. This will be displayed in category lists and filters.",
      },
      label: "Name",
      name: "name",
      type: "text",
      maxLength: 48,
      required: true,
    },
    {
      admin: {
        readOnly: true,
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              description:
                "A URL-friendly, unique identifier automatically generated from the name.",
              sourcePath: "name",
              slugPath: "slug",
              label: "URL Slug",
              readOnly: true,
              disabled: true,
            },
          },
        },
      },
      label: "URL Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      index: true,
    },
    {
      admin: {
        description:
          "A brief description of what this category represents and what types of posts it contains.",
      },
      label: "Description",
      name: "description",
      type: "textarea",
      maxLength: 500,
      required: false,
    },
    {
      admin: {
        description:
          "An optional image or icon to represent this category visually.",
      },
      label: "Image",
      name: "image",
      type: "upload",
      relationTo: "media-public",
      hasMany: false,
      required: false,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "The order in which this category should appear in category lists. Lower numbers appear first.",
      },
      label: "Order",
      name: "order",
      type: "number",
      min: 0,
      defaultValue: 0,
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, req, data }) => {
        const category = data as BlogsCategory;
        // Automatically populate roomOwner from blog room on create
        if (operation === "create") {
          const roomId = isNumber(category.room)
            ? category.room
            : category.room.id;

          const responseBlogRoom = await actionSafeExecute(
            req.payload.findByID({
              collection: "blogs-rooms",
              id: roomId,
              depth: 0,
            }),
            messages.http.serverError,
          );

          if (responseBlogRoom.data) {
            const roomOwnerId = isNumber(responseBlogRoom.data.roomOwner)
              ? responseBlogRoom.data.roomOwner
              : responseBlogRoom.data.roomOwner.id;

            // eslint-disable-next-line no-param-reassign
            category.roomOwner = roomOwnerId;
          }
        }

        return category;
      },
    ],
  },
};
