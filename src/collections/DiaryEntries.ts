// REVIEWED - 04

import { CollectionConfig } from "payload";

import { isAdminOrSystemUserOrSelf } from "@/access/diary-entry";
import { isAdmin, isAdminOrSystemUserField } from "@/access/global";

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  access: {
    create: isAdmin,
    read: isAdminOrSystemUserOrSelf,
    update: isAdminOrSystemUserOrSelf,
    delete: isAdminOrSystemUserOrSelf,
  },
  admin: { useAsTitle: "title" },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      maxLength: 100,
      required: true,
      unique: true,
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      maxLength: 2500,
      required: true,
    },
    {
      access: {
        read: isAdminOrSystemUserField,
        update: isAdminOrSystemUserField,
      },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
        { label: "Approved", value: "approved" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      access: {
        read: isAdminOrSystemUserField,
        update: isAdminOrSystemUserField,
      },
      label: "Author",
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      label: "Is Authentic",
      name: "isAuthentic",
      type: "checkbox",
      required: true,
    },
    {
      label: "Is Anonymous",
      name: "isAnonymous",
      type: "checkbox",
      required: true,
    },
  ],
};
