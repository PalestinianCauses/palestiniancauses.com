// REVIEWED - 17

import { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  access: {
    create: hasPermissionAccess({
      resource: "diary-entries",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "diary-entries", action: "read" })({
        req,
      }) || isSelf("author")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "diary-entries", action: "update" })({
        req,
      }) || isSelf("author")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "diary-entries", action: "delete" })({
        req,
      }) || isSelf("author")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "diary-entries.admin",
        action: "read",
      }),
    group: "Content",
    defaultColumns: ["id", "title", "date", "status", "author", "createdAt"],
    useAsTitle: "title",
  },
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
          maxDate: new Date(new Date().setUTCHours(23, 59, 59, 999)),
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
      access: {
        create: hasPermissionFieldAccess("diary-entries.status", "create"),
        update: hasPermissionFieldAccess("diary-entries.status", "update"),
      },
      admin: { position: "sidebar" },
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
        create: hasPermissionFieldAccess("diary-entries.author", "create"),
        update: hasPermissionFieldAccess("diary-entries.author", "update"),
      },
      admin: { position: "sidebar" },
      label: "Author",
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      access: {
        update: hasPermissionFieldAccess("diary-entries.isAuthentic", "update"),
      },
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
        if (!data.author)
          if (req.user)
            // eslint-disable-next-line no-param-reassign
            data.author = req.user.id;

        if (
          hasPermission(req.user, {
            resource: "diary-entries",
            action: "publish",
          })
        )
          // eslint-disable-next-line no-param-reassign
          data.status = "approved";

        return data;
      },
    ],
  },
};
