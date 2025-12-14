// REVIEWED - 01

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const BlogsRooms: CollectionConfig = {
  slug: "blogs-rooms",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, { resource: "blogs-rooms", action: "manage" }),
    create: hasPermissionAccess({
      resource: "blogs-rooms",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-rooms", action: "read" })({
        req,
      }) || isSelf("systemOwner")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-rooms", action: "update" })({
        req,
      }) || isSelf("systemOwner")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-rooms", action: "delete" })({
        req,
      }) || isSelf("systemOwner")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs-rooms",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: ["id", "systemOwner", "name", "slug", "createdAt"],
    useAsTitle: "name",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL! + doc.slug].join("/blogs/");
      return null;
    },
  },
  fields: [
    {
      admin: {
        description: "The user account that owns and manages this blog system.",
      },
      label: "System Owner",
      name: "systemOwner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      admin: {
        description:
          "A unique, memorable name for this blog system. This will be displayed prominently and used in the URL.",
      },
      label: "Name",
      name: "name",
      type: "text",
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
          "A brief description of this blog system, its purpose, and what content it contains.",
      },
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
      maxLength: 500,
    },
    {
      admin: {
        description:
          "Users who are authorized to create and manage content in this blog system.",
      },
      label: "Authors",
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
    },
  ],
};
