// REVIEWED - 05

import type { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const collectionsPermissionsOptions = [
  { label: "Blog", value: "blogs" },
  { label: "Blog Admin", value: "blogs.admin" },
  { label: "Blog Author", value: "blogs.author" },
  { label: "Blog Status", value: "blogs.status" },
  { label: "Comments", value: "comments" },
  { label: "Comments Admin", value: "comments.admin" },
  { label: "Comments On", value: "comments.on" },
  { label: "Comments Parent", value: "comments.parent" },
  { label: "Comments Status", value: "comments.status" },
  { label: "Comments User", value: "comments.user" },
  { label: "Diary Entries", value: "diary-entries" },
  { label: "Diary Entries Admin", value: "diary-entries.admin" },
  { label: "Diary Entries Author", value: "diary-entries.author" },
  { label: "Diary Entries Is Authentic", value: "diary-entries.isAuthentic" },
  { label: "Diary Entries Status", value: "diary-entries.status" },
  { label: "Media", value: "media" },
  { label: "Media Admin", value: "media.admin" },
  {
    label: "Notification Subscriptions",
    value: "notification-subscriptions",
  },
  {
    label: "Notification Subscriptions Admin",
    value: "notification-subscriptions.admin",
  },
  { label: "Orders", value: "orders" },
  { label: "Orders Admin", value: "orders.admin" },
  { label: "Permissions", value: "permissions" },
  { label: "Permissions Admin", value: "permissions.admin" },
  { label: "Products", value: "products" },
  { label: "Products Admin", value: "products.admin" },
  { label: "Roles", value: "roles" },
  { label: "Roles Admin", value: "roles.admin" },
  { label: "Rooms", value: "rooms" },
  { label: "Rooms Admin", value: "rooms.admin" },
  { label: "Room Contact", value: "room-contact" },
  { label: "Room Contact Admin", value: "room-contact.admin" },
  { label: "Room Packages", value: "room-packages" },
  { label: "Room Packages Admin", value: "room-packages.admin" },
  { label: "Room Services", value: "room-services" },
  { label: "Room Services Admin", value: "room-services.admin" },
  { label: "Service Categories", value: "service-categories" },
  { label: "Service Categories Admin", value: "service-categories.admin" },
  { label: "Categories System", value: "service-categories.system" },
  { label: "Categories Priority", value: "service-categories.priority" },
  { label: "Users", value: "users" },
  { label: "Users Admin", value: "users.admin" },
  { label: "Users Email", value: "users.email" },
  { label: "Users Previous Role", value: "users.previousRole" },
  { label: "Users Roles", value: "users.roles" },
];

export const Permissions: CollectionConfig = {
  slug: "permissions",
  access: {
    create: hasPermissionAccess({ resource: "permissions", action: "create" }),
    read: hasPermissionAccess({ resource: "permissions", action: "read" }),
    update: hasPermissionAccess({ resource: "permissions", action: "update" }),
    delete: hasPermissionAccess({ resource: "permissions", action: "delete" }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "permissions.admin",
        action: "read",
      }),
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
      options: collectionsPermissionsOptions,
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
