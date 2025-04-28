// REVIEWED

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
  admin: { useAsTitle: "title" },
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
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      admin: { position: "sidebar" },
      name: "isDownloadable",
      label: "Is Downloadable",
      type: "checkbox",
      defaultValue: false,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.isDownloadable,
        position: "sidebar",
      },
      labels: { singular: "File", plural: "Files" },
      name: "filesDownloadable",
      label: "Downloadable Files",
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
  ],
};
