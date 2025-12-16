// REVIEWED

import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const BlogsCategories: CollectionConfig = {
  slug: "blogs-categories",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, {
        resource: "blogs-categories",
        action: "manage",
      }),
    create: hasPermissionAccess({
      resource: "blogs-categories",
      action: "create",
    }),
    read: hasPermissionAccess({ resource: "blogs-categories", action: "read" }),
    update: hasPermissionAccess({
      resource: "blogs-categories",
      action: "update",
    }),
    delete: hasPermissionAccess({
      resource: "blogs-categories",
      action: "delete",
    }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs-categories",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: ["id", "name", "slug", "room", "createdAt"],
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
      relationTo: "media",
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
};
