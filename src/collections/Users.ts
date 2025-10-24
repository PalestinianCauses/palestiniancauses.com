// REVIEWED - 15
import type { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasRoleFieldAccess,
  isSelf,
} from "@/access/global";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: hasPermissionAccess({ resource: "users", action: "create" }),
    read:
      hasPermissionAccess({ resource: "users", action: "read" }) ||
      isSelf("id"),
    update:
      hasPermissionAccess({ resource: "users", action: "update" }) ||
      isSelf("id"),
    delete:
      hasPermissionAccess({ resource: "users", action: "delete" }) ||
      isSelf("id"),
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
        read: hasRoleFieldAccess("admin-user"),
        update: hasRoleFieldAccess("admin-user"),
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
