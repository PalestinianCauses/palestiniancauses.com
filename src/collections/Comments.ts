// REVIEWED - 04

import { CollectionConfig } from "payload";

import { isAdminOrSelf, isAuthenticated } from "@/access/global";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
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
      label: "Commented On",
      name: "on",
      type: "relationship",
      relationTo: ["diary-entries", "blogs"],
      hasMany: false,
      required: true,
    },
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
      minLength: 12,
      maxLength: 1200,
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
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        const dataUpdated = data;
        if (req.user && !data.user) dataUpdated.user = req.user.id;
        return dataUpdated;
      },
    ],
  },
};
