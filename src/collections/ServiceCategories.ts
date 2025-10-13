// REVIEWED - 01

import { CollectionConfig } from "payload";

import { isAdminField, isAdminOrSelf } from "@/access/global";
import { hasRole } from "@/lib/permissions";
import { isObject, isString } from "@/lib/types/guards";

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  access: {
    create: async ({ req }) => {
      const { user } = req;
      if (!user) return false;

      if (hasRole(user, "admin-user")) return true;

      if (hasRole(user, "system-user")) {
        const room = await req.payload.find({
          collection: "rooms",
          where: { user: { equals: user.id } },
        });

        if (room.docs.length === 0) return false;

        return true;
      }

      return false;
    },
    read: async ({ req }) => {
      if (
        isObject(req.query.origin) &&
        "equals" in req.query.origin &&
        isString(req.query.origin.equals) &&
        req.query.origin.equals === "website"
      )
        return true;

      return isAdminOrSelf({ req });
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Rooms Content",
    defaultColumns: ["id", "name", "slug", "color", "status", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description: "A clear, descriptive name for this service category.",
      },
      label: "Category Name",
      name: "name",
      type: "text",
      maxLength: 56,
      required: true,
    },
    {
      admin: {
        readOnly: true,
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              description:
                "A URL-friendly, unique identifier for this category.",
              sourcePath: "name",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
              disabled: true,
            },
          },
        },
      },
      label: "Category Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      admin: {
        description: "A brief description of what this category represents.",
      },
      label: "Category Description",
      name: "description",
      type: "textarea",
      maxLength: 500,
      required: false,
    },
    {
      admin: {
        position: "sidebar",
        description: "Whether this category is currently active and visible.",
      },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Not Active", value: "inactive" },
      ],
      defaultValue: "active",
      required: true,
    },
    {
      access: {
        create: isAdminField,
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        position: "sidebar",
        description: "Whether this is a system category (can not be deleted).",
      },
      label: "System Category",
      name: "system",
      type: "checkbox",
      defaultValue: false,
    },
    {
      admin: {
        description: "Choose a color theme for this category (used in UI).",
      },
      label: "Category Color",
      name: "color",
      type: "select",
      options: [
        { label: "Red", value: "red" },
        { label: "Orange", value: "orange" },
        { label: "Amber", value: "amber" },
        { label: "Yellow", value: "yellow" },
        { label: "Green", value: "green" },
        { label: "Teal", value: "teal" },
        { label: "Blue", value: "blue" },
        { label: "Indigo", value: "indigo" },
        { label: "Purple", value: "purple" },
        { label: "Pink", value: "pink" },
      ],
      defaultValue: "teal",
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Display order for this category (lower numbers appear first).",
      },
      label: "Display Order",
      name: "order",
      type: "number",
      defaultValue: 0,
      required: true,
    },
  ],
};
