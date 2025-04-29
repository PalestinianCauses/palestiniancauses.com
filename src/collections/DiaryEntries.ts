// REVIEWED - 07

import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload";

import { isAdminOrSystemUserOrSelf } from "@/access/diary-entry";
import { isAdmin, isAdminOrSystemUserField } from "@/access/global";
import { messages } from "@/lib/errors";

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  access: {
    create: isAdmin,
    read: isAdminOrSystemUserOrSelf,
    update: isAdminOrSystemUserOrSelf,
    delete: isAdminOrSystemUserOrSelf,
  },
  admin: { useAsTitle: "title" },
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
      label: "Date",
      name: "date",
      type: "date",
      required: true,
      validate: (value) => {
        if (!value) return messages.forms.required("diary date");

        const date = new Date(value);
        date.setUTCHours(0, 0, 0, 0);

        if (!(date instanceof Date) || Number.isNaN(date.getTime()))
          return messages.forms.valid("diary date");

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getDate() - 1);

        const october7th2023 = new Date(2023, 9, 7);
        october7th2023.setUTCHours(0, 0, 0, 0);

        if (
          date.getTime() > yesterday.getTime() ||
          date.getTime() <= october7th2023.getTime()
        )
          return messages.forms.diaryEntry.date("Oct 7th. 2023", "yesterday");

        return true;
      },
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      minLength: 2500,
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
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        const document = data;
        if (
          req.user &&
          (req.user.role === "admin" || req.user.role === "system-user")
        )
          document.status = "approved";

        return document;
      },
    ],
    afterChange: [
      async () => {
        revalidatePath("/humans-but-from-gaza");
        console.log("Route Revalidated.");
      },
    ],
  },
};
