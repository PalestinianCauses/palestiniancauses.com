// REVIEWED - 05

import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const NotificationSubscriptions: CollectionConfig = {
  slug: "notification-subscriptions",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, {
        resource: "notification-subscriptions",
        action: "manage",
      }),
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
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "notification-subscriptions",
        action: "manage",
      }),
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
