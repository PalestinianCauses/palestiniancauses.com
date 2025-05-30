// REVIEWED - 07

import { CollectionConfig } from "payload";

import { isAdmin } from "@/access/global";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "title", "price", "type", "createdAt"],
    useAsTitle: "title",
  },
  labels: { singular: "Product", plural: "Products" },
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
