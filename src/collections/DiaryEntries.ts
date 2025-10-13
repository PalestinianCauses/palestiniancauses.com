// REVIEWED - 13

import { CollectionConfig } from "payload";

import {
  isAdminOrSystemUserOrSelf,
  isAdminOrSystemUserOrSelfOrPublished,
} from "@/access/diary-entry";
import { isAdminOrSystemUserField, isAuthenticated } from "@/access/global";
import { hasAnyRole } from "@/lib/permissions";

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  access: {
    create: isAuthenticated,
    read: isAdminOrSystemUserOrSelfOrPublished,
    update: isAdminOrSystemUserOrSelf,
    delete: isAdminOrSystemUserOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "title", "date", "status", "author", "createdAt"],
    useAsTitle: "title",
  },
  labels: { singular: "Diary Entry", plural: "Diary Entries" },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      minLength: 2,
      maxLength: 100,
      required: true,
      unique: true,
    },
    {
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          minDate: new Date(2023, 9, 7, 0, 0, 0, 0),
          maxDate: new Date(
            new Date(
              new Date().setUTCDate(new Date().getUTCDate() - 1),
            ).setUTCHours(0, 0, 0, 0),
          ),
        },
      },
      label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      minLength: 1500,
      required: true,
    },
    {
      access: { update: isAdminOrSystemUserField },
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
      access: { update: isAdminOrSystemUserField },
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
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        const document = data;
        if (req.user && hasAnyRole(req.user, ["admin-user", "system-user"]))
          document.status = "approved";

        return document;
      },
    ],
  },
};
