// REVIEWED - 17
import type { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

/*
when managing access collections we care about accessing content when users are browsing /dashboard not our entire website.
*/

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
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "users.admin",
        action: "read",
      }),
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "createdAt"],
    useAsTitle: "email",
  },
  auth: { tokenExpiration: 24 * 60 * 60 },
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
        read: hasPermissionFieldAccess("users.roles", "read"),
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
