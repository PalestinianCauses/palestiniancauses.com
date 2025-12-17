// REVIEWED - 11

import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: hasPermissionAccess({ resource: "products", action: "read" }),
    create: hasPermissionAccess({ resource: "products", action: "create" }),
    update: hasPermissionAccess({ resource: "products", action: "update" }),
    delete: hasPermissionAccess({ resource: "products", action: "delete" }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "products",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "title", "price", "type", "createdAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "slug",
      label: "Slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      admin: { position: "sidebar" },
      name: "price",
      label: "Price",
      type: "number",
      min: 0,
      defaultValue: 0,
      required: true,
    },
    {
      admin: { position: "sidebar" },
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "File", value: "file" },
        { label: "External Resource", value: "external" },
      ],
      required: true,
    },
    {
      admin: { condition: (_, dataSibling) => dataSibling.type === "file" },
      labels: { singular: "File", plural: "Files" },
      name: "files",
      label: "Files",
      type: "array",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "file",
          label: "File",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      admin: { condition: (_, dataSibling) => dataSibling.type === "external" },
      name: "links",
      type: "array",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "isFile",
          label: "Is File",
          type: "checkbox",
          defaultValue: true,
        },
        {
          admin: { condition: (_, dataSibling) => dataSibling.isFile },
          name: "fileSize",
          label: "File Size (MB)",
          type: "number",
          min: 0,
          defaultValue: 0,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "authors",
      label: "Authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    },
  ],
};
