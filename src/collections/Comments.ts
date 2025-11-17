// REVIEWED - 14

import { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { Comment, User } from "@/payload-types";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, { resource: "comments", action: "manage" }),
    create: hasPermissionAccess({ resource: "comments", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "comments", action: "read" })({ req }) ||
      isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "comments", action: "update" })({
        req,
      }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "comments", action: "delete" })({
        req,
      }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "comments",
        action: "manage",
      }),
    group: "Content",
    useAsTitle: "id",
    defaultColumns: ["id", "user", "content"],
    enableRichTextRelationship: false,
  },
  fields: [
    {
      access: { update: hasPermissionFieldAccess("comments.on", "update") },
      admin: { position: "sidebar" },
      label: "Commented On",
      name: "on",
      type: "relationship",
      relationTo: ["diary-entries", "blogs"],
      hasMany: false,
      required: true,
      index: true,
    },
    {
      access: { update: hasPermissionFieldAccess("comments.parent", "update") },
      admin: {
        condition: (_, siblingData) => Boolean((siblingData as Comment).on),
        position: "sidebar",
      },
      label: "In Reply To",
      name: "parent",
      type: "relationship",
      relationTo: "comments",
      hasMany: false,
      required: false,
      index: true,
      filterOptions: ({ siblingData }) => ({
        on: { equals: (siblingData as Comment).on },
      }),
    },
    {
      access: {
        create: hasPermissionFieldAccess("comments.user", "create"),
        update: hasPermissionFieldAccess("comments.user", "update"),
      },
      admin: { position: "sidebar" },
      label: "User",
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      index: true,
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      minLength: 12,
      maxLength: 1200,
      required: true,
    },
    {
      access: {
        create: hasPermissionFieldAccess("comments.status", "create"),
        read: hasPermissionFieldAccess("comments.status", "read"),
        update: hasPermissionFieldAccess("comments.status", "update"),
      },
      admin: { position: "sidebar" },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "approved",
      required: true,
      index: true,
    },
    {
      admin: { hidden: true },
      label: "Votes",
      name: "votes",
      type: "array",
      fields: [
        {
          label: "User",
          name: "user",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
          required: true,
        },
        {
          label: "Vote",
          name: "vote",
          type: "select",
          options: [
            { label: "Up", value: "up" },
            { label: "Down", value: "down" },
          ],
          required: true,
        },
      ],
    },
    {
      admin: { hidden: true },
      label: "Votes Score",
      name: "votesScore",
      type: "number",
      defaultValue: 0,
      index: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (!data.user)
          if (req.user)
            // eslint-disable-next-line no-param-reassign
            data.user = req.user.id;

        return data;
      },
    ],
  },
};
