// REVIEWED - 08

import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload";

import { isAdminOrSystemUserOrSelf } from "@/access/diary-entry";
import { isAdmin, isAdminOrSystemUserField } from "@/access/global";
import { messages } from "@/lib/errors";
import { validateDateInRange } from "@/lib/utils";

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
        const start = new Date(2023, 9, 7);
        const end = new Date();
        end.setUTCDate(end.getUTCDate() - 1);

        return validateDateInRange(
          value,
          start,
          end,
          messages.forms.required("diary date"),
          messages.forms.valid("diary date"),
          messages.forms.date(start.toLocaleDateString(), "yesterday"),
        );
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
