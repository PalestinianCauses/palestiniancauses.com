// REVIEWED - 03

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
      }) || isSelf("roomOwner")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-rooms", action: "update" })({
        req,
      }) || isSelf("roomOwner")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "blogs-rooms", action: "delete" })({
        req,
      }) || isSelf("roomOwner")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs-rooms",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: ["id", "roomOwner", "name", "slug", "createdAt"],
    useAsTitle: "name",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL!, doc.slug].join("/blogs/");
      return null;
    },
  },
  fields: [
    {
      admin: {
        hidden: true,
        description: "The user account that owns and manages this blog room.",
      },
      label: "System Owner",
      name: "roomOwner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      admin: {
        description:
          "A unique, memorable name for this blog room. This will be displayed prominently and used in the URL.",
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
          "A brief description of this blog room, its purpose, and what content it contains.",
      },
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
      maxLength: 500,
    },
    {
      admin: {
        position: "sidebar",
        description: "The primary language used in this blog room.",
      },
      label: "Language",
      name: "language",
      type: "select",
      options: [
        { label: "Arabic", value: "arabic" },
        { label: "English", value: "english" },
      ],
      defaultValue: "english",
      hasMany: false,
      required: true,
    },
    {
      admin: {
        description:
          "The color theme for this blog room's visual presentation.",
        position: "sidebar",
      },
      label: "Color",
      name: "color",
      type: "select",
      options: [
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
        { label: "Green", value: "green" },
        { label: "Teal", value: "teal" },
        { label: "Blue", value: "blue" },
      ],
      defaultValue: "blue",
      hasMany: false,
      required: true,
    },
    {
      admin: {
        description:
          "Users who are authorized to create and manage content in this blog room.",
      },
      label: "Authors",
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, req, data }) => {
        if (operation === "create")
          if (!data.roomOwner)
            if (req.user)
              // eslint-disable-next-line no-param-reassign
              data.roomOwner = req.user.id;

        return data;
      },
    ],
  },
};
