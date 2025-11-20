// REVIEWED - 01

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, {
        resource: "notifications",
        action: "manage",
      }),
    create: hasPermissionAccess({
      resource: "notifications",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({
        resource: "notifications",
        action: "read",
      })({ req }) || isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({
        resource: "notifications",
        action: "update",
      })({ req }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({
        resource: "notifications",
        action: "delete",
      })({ req }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "notifications",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["user", "type", "title", "read", "createdAt"],
    useAsTitle: "title",
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
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "Blog", value: "blog" },
        { label: "Comment", value: "comment" },
        { label: "Diary Entry", value: "diary-entry" },
        { label: "Order", value: "order" },
        { label: "System", value: "system" },
      ],
      required: true,
      index: true,
    },
    {
      name: "resource",
      label: "Resource",
      type: "relationship",
      relationTo: ["blogs", "comments", "diary-entries", "orders"],
      required: false,
    },
    {
      name: "resourceType",
      label: "Resource Type",
      type: "select",
      options: [
        { label: "Blog", value: "blogs" },
        { label: "Comment", value: "comments" },
        { label: "Diary Entry", value: "diary-entries" },
        { label: "Order", value: "orders" },
      ],
      required: false,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
    },
    {
      name: "read",
      label: "Read",
      type: "checkbox",
      defaultValue: false,
      required: true,
      index: true,
    },
  ],
};
