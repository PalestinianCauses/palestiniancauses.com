// REVIEWED

import { CollectionConfig } from "payload";

import { isAdmin } from "@/access/global";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Content",
    useAsTitle: "id",
    defaultColumns: ["id", "user", "content", "status", "createdAt"],
    enableRichTextRelationship: false,
  },
  fields: [
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "In Reply To",
      name: "parent",
      type: "relationship",
      relationTo: "comments",
      hasMany: false,
      required: false,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "User",
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      admin: { readOnly: true },
      label: "Content",
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      admin: { position: "sidebar" },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "approved",
      required: true,
    },
    {
      label: "Votes",
      name: "votes",
      type: "array",
      fields: [
        {
          label: "User",
          name: "user",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
          required: true,
        },
        {
          label: "Vote",
          name: "vote",
          type: "select",
          options: [
            { label: "Up", value: "up" },
            { label: "Down", value: "down" },
          ],
          required: true,
        },
      ],
    },
  ],
};
