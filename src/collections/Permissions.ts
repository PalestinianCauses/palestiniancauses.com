// REVIEWED

import type { CollectionConfig } from "payload";

// eslint-disable-next-line import/no-cycle
import { isAdmin } from "@/access/global";

import config from "../payload.config";

export const Permissions: CollectionConfig = {
  slug: "permissions",
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Authorization",
    defaultColumns: ["name", "resource", "action", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description:
          "Unique name for the permission (e.g., 'users.create', 'posts.read')",
      },
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      admin: {
        description: "Description of what this permission allows",
      },
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      admin: {
        description: "The resource this permission applies to",
      },
      label: "Resource",
      name: "resource",
      type: "select",
      options: (await config).collections.map((collection) => ({
        label: collection.slug,
        value: collection.slug,
      })),
      required: true,
    },
    {
      admin: {
        description: "The action this permission allows",
      },
      label: "Action",
      name: "action",
      type: "select",
      options: [
        { label: "Create", value: "create" },
        { label: "Read", value: "read" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
        { label: "Manage", value: "manage" },
        { label: "Publish", value: "publish" },
        { label: "Un-Publish", value: "unpublish" },
      ],
      required: true,
    },
    {
      admin: {
        description:
          "JSON object defining additional conditions for this permission (optional)",
      },
      label: "Conditions",
      name: "conditions",
      type: "json",
      required: false,
    },
  ],
};
