// REVIEWED - 03

import { Access, CollectionConfig, FieldAccess } from "payload";

export const isAdmin: FieldAccess = function isAdmin({ req: { user } }) {
  if (!user) return false;

  return user.role === "admin";
};

const isAuthenticated: Access = function isAuthenticated({ req: { user } }) {
  if (!user) return false;

  return true;
};

const isAuthorized: Access = function isAuthorized({ req: { user } }) {
  if (!user) return false;

  if (user.role === "admin" || user.role === "system-user") return true;

  return {
    author: {
      equals: user.id,
    },
  };
};

export const DiaryEntries: CollectionConfig = {
  slug: "diary-entries",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthorized,
    delete: isAuthorized,
  },
  admin: { hidden: true, useAsTitle: "title" },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      maxLength: 100,
      required: true,
      unique: true,
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      maxLength: 2500,
      required: true,
    },
    {
      access: { update: isAdmin },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
        { label: "Approved", value: "approved" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      access: { update: isAdmin },
      label: "Author",
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      label: "Is Authentic",
      name: "isAuthentic",
      type: "checkbox",
      required: true,
    },
    {
      label: "Is Anonymous",
      name: "isAnonymous",
      type: "checkbox",
      required: true,
    },
  ],
};
