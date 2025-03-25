// REVIEWED

import { CollectionConfig } from "payload";

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  admin: { useAsTitle: "title" },
  auth: true,
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
      label: "Status",
      name: "status",
      type: "select",
      options: ["Pending", "Rejected", "Approved", "Published", "Archived"],
      defaultValue: "Pending",
      required: false,
    },
  ],
};
