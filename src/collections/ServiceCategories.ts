// REVIEWED - 02

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
      type: "tabs",
      tabs: [
        {
          label: "Category Information",
          description: "Core category details and identification",
          fields: [
            {
              admin: {
                description:
                  "A clear, descriptive name that identifies this service category and helps clients understand what types of services it includes.",
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
                        "A URL-friendly, unique identifier automatically generated from the category name.",
                      sourcePath: "name",
                      slugPath: "slug",
                      label: "Category Slug",
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
                description:
                  "A comprehensive description that explains what types of services belong to this category and helps clients understand its scope.",
              },
              label: "Category Description",
              name: "description",
              type: "textarea",
              maxLength: 500,
              required: false,
            },
          ],
        },
        {
          label: "Visual Design",
          description: "Category appearance and visual identity",
          fields: [
            {
              admin: {
                description:
                  "Choose a color theme for this category that will be used in the user interface to help visually distinguish different service types.",
              },
              label: "Category Color Theme",
              name: "color",
              type: "select",
              options: [
                { label: "Red - Bold and attention-grabbing", value: "red" },
                { label: "Orange - Energetic and creative", value: "orange" },
                { label: "Amber - Warm and professional", value: "amber" },
                { label: "Yellow - Bright and optimistic", value: "yellow" },
                { label: "Green - Growth and success", value: "green" },
                { label: "Teal - Modern and trustworthy", value: "teal" },
                { label: "Blue - Professional and reliable", value: "blue" },
                { label: "Indigo - Deep and sophisticated", value: "indigo" },
                { label: "Purple - Creative and innovative", value: "purple" },
                { label: "Pink - Friendly and approachable", value: "pink" },
              ],
              defaultValue: "teal",
              required: true,
            },
          ],
        },
        {
          label: "Category Settings",
          description: "Status, permissions, and display preferences",
          fields: [
            {
              admin: {
                description:
                  "Whether this category is currently active and visible to clients browsing services.",
              },
              label: "Category Status",
              name: "status",
              type: "select",
              options: [
                {
                  label: "Active - Visible to clients",
                  value: "active",
                },
                {
                  label: "Not Active - Hidden from clients",
                  value: "inactive",
                },
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
                description:
                  "Whether this is a system category that cannot be deleted (typically created by administrators).",
              },
              label: "System Category",
              name: "system",
              type: "checkbox",
              defaultValue: false,
            },
            {
              admin: {
                description:
                  "Display order for this category in the services list (lower numbers appear first).",
              },
              label: "Display Priority",
              name: "order",
              type: "number",
              defaultValue: 0,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
