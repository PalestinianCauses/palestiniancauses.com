// REVIEWED - 16
import type { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: hasPermissionAccess({ resource: "users", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "read" })({ req }) ||
      isSelf("id")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "update" })({ req }) ||
      isSelf("id")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "delete" })({ req }) ||
      isSelf("id")({ req }),
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "roles", "createdAt"],
    useAsTitle: "email",
  },
  labels: { singular: "User", plural: "Users" },
  auth: {
    tokenExpiration: 24 * 60 * 60,
  },
  fields: [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      defaultValue: "",
    },
    {
      access: {
        create: hasPermissionFieldAccess("users.previousRole", "create"),
        read: hasPermissionFieldAccess("users.previousRole", "read"),
        update: hasPermissionFieldAccess("users.previousRole", "update"),
      },
      admin: { position: "sidebar" },
      label: "Previous Role",
      name: "previousRole",
      type: "select",
      options: ["admin", "system-user", "website-user"],
      defaultValue: "website-user",
      required: true,
    },
    {
      access: {
        create: hasPermissionFieldAccess("users.roles", "create"),
        update: hasPermissionFieldAccess("users.roles", "update"),
      },
      admin: { position: "sidebar" },
      label: "Roles",
      name: "roles",
      type: "relationship",
      relationTo: "roles",
      hasMany: true,
      required: true,
    },
  ],
};
