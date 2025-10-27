// REVIEWED - 05

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const RoomsServices: CollectionConfig = {
  slug: "rooms-services",
  access: {
    create: hasPermissionAccess({
      resource: "room-services",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "room-services", action: "read" })({
        req,
      }) || isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "room-services", action: "update" })({
        req,
      }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "room-services", action: "delete" })({
        req,
      }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "room-services.admin",
        action: "read",
      }),
    group: "Rooms Content",
    defaultColumns: ["id", "name", "status", "category", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Service Information",
          description: "Core service details and description",
          fields: [
            {
              admin: {
                hidden: true,
                position: "sidebar",
                description:
                  "The individual or entity responsible for and associated with this service.",
              },
              label: "Service Owner",
              name: "user",
              type: "relationship",
              relationTo: "users",
              required: true,
            },
            {
              admin: {
                description:
                  "A compelling, descriptive name that clearly identifies this professional service offering.",
              },
              label: "Service Title",
              name: "name",
              type: "text",
              maxLength: 68,
              required: true,
            },
            {
              admin: {
                description:
                  "A comprehensive description that explains what this service includes, its benefits, and what clients can expect.",
              },
              label: "Service Description",
              name: "description",
              type: "textarea",
              maxLength: 500,
              required: true,
            },
            {
              admin: {
                description:
                  "Categorize this service to help clients find it more easily and organize your offerings.",
              },
              label: "Service Category",
              name: "category",
              type: "relationship",
              relationTo: "service-categories",
              required: true,
            },
          ],
        },
        {
          label: "Service Details",
          description: "Technical specifications and requirements",
          fields: [
            {
              admin: {
                description:
                  "Key skills, technologies, tools, or methodologies involved in delivering this service.",
              },
              label: "Required Skills & Technologies",
              name: "skills",
              type: "array",
              fields: [
                {
                  admin: {
                    description:
                      "A specific skill, technology, or tool required for this service.",
                  },
                  label: "Skill or Technology",
                  name: "name",
                  type: "text",
                  maxLength: 48,
                  required: true,
                },
              ],
            },
            {
              admin: {
                description:
                  "Estimated timeframe for service delivery (e.g., '2-4 weeks', '1 day', 'On Going').",
              },
              label: "Service Duration",
              name: "duration",
              type: "text",
              maxLength: 56,
              required: false,
            },
          ],
        },
        {
          label: "Availability & Display",
          description: "Service status and presentation settings",
          fields: [
            {
              admin: {
                description:
                  "Current availability status of this service for client inquiries.",
              },
              label: "Service Status",
              name: "status",
              type: "select",
              options: [
                { label: "Available for New Clients", value: "available" },
                { label: "Currently Not Available", value: "unavailable" },
                {
                  label: "Coming Soon - Not Yet Available",
                  value: "coming-soon",
                },
              ],
              defaultValue: "available",
              required: true,
            },
            {
              admin: {
                position: "sidebar",
                description:
                  "Display order for this service in your services list (lower numbers appear first).",
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
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === "create")
          if (!data.user)
            if (req.user)
              // eslint-disable-next-line no-param-reassign
              data.user = req.user.id;

        return data;
      },
    ],
  },
};
