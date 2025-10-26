// REVIEWED - 03

import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";

export const NotificationSubscriptions: CollectionConfig = {
  slug: "notification-subscriptions",
  access: {
    create: hasPermissionAccess({
      resource: "notification-subscriptions",
      action: "create",
    }),
    read: hasPermissionAccess({
      resource: "notification-subscriptions",
      action: "read",
    }),
    update: hasPermissionAccess({
      resource: "notification-subscriptions",
      action: "update",
    }),
    delete: hasPermissionAccess({
      resource: "notification-subscriptions",
      action: "delete",
    }),
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
