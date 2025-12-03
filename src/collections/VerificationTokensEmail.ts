// REVIEWED - 02

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const VerificationTokensEmail: CollectionConfig = {
  slug: "verification-tokens-email",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, {
        resource: "verification-tokens-email",
        action: "manage",
      }),
    create: hasPermissionAccess({
      resource: "verification-tokens-email",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({
        resource: "verification-tokens-email",
        action: "read",
      })({ req }) || isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({
        resource: "verification-tokens-email",
        action: "update",
      })({ req }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({
        resource: "verification-tokens-email",
        action: "delete",
      })({ req }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "verification-tokens-email",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "user", "used", "expiresAt", "createdAt"],
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
      name: "token",
      label: "Token",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "newEmail",
      label: "New Email (for email change)",
      type: "email",
      required: false,
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
