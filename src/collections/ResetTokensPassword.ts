// REVIEWED

import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const PasswordResetTokens: CollectionConfig = {
  slug: "reset-tokens-password",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, {
        resource: "reset-tokens-password",
        action: "manage",
      }),
    create: hasPermissionAccess({
      resource: "reset-tokens-password",
      action: "create",
    }),
    read: hasPermissionAccess({
      resource: "reset-tokens-password",
      action: "read",
    }),
    update: hasPermissionAccess({
      resource: "reset-tokens-password",
      action: "update",
    }),
    delete: hasPermissionAccess({
      resource: "reset-tokens-password",
      action: "delete",
    }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "reset-tokens-password",
        action: "manage",
      }),
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
      name: "token",
      label: "Token",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "used",
      label: "Used",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      name: "expiresAt",
      label: "Expires At",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.expiresAt && new Date(data.expiresAt) < new Date())
          return null;

        return data;
      },
    ],
  },
};
