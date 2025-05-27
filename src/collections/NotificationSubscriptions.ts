// REVIEWED - 01

import { CollectionConfig } from "payload";

import { isAdmin } from "@/access/global";

export const NotificationSubscriptions: CollectionConfig = {
  slug: "notification-subscriptions",
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "userAgent", "createdAt"],
    useAsTitle: "id",
  },
  fields: [
    {
      label: "Endpoint",
      name: "endpoint",
      type: "text",
      required: true,
      unique: true,
    },
    {
      label: "Keys",
      name: "keys",
      type: "group",
      fields: [
        {
          label: "P256DH Key",
          name: "p256dh",
          type: "text",
          required: true,
        },
        {
          label: "Auth Key",
          name: "auth",
          type: "text",
          required: true,
        },
      ],
    },
    {
      admin: { readOnly: true },
      label: "User Agent",
      name: "userAgent",
      type: "text",
      required: true,
    },
  ],
};
