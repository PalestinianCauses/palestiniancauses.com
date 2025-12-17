// REVIEWED - 02

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const AchievementNotifications: CollectionConfig = {
  slug: "achievement-notifications",
  access: {
    create: hasPermissionAccess({
      resource: "achievement-notifications",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({
        resource: "achievement-notifications",
        action: "read",
      })({ req }) || isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({
        resource: "achievement-notifications",
        action: "update",
      })({ req }) || isSelf("user")({ req }),
    delete: hasPermissionAccess({
      resource: "achievement-notifications",
      action: "delete",
    }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "achievement-notifications",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["user", "achievement", "notified", "notifiedAt"],
    useAsTitle: "id",
  },
  fields: [
    {
      name: "user",
      label: "User",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
    },
    {
      name: "achievement",
      label: "Achievement",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "notified",
      label: "Notified",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      admin: { date: { pickerAppearance: "dayAndTime" } },
      name: "notifiedAt",
      label: "Notified At",
      type: "date",
      required: false,
    },
  ],
};
