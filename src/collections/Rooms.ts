// REVIEWED

import { CollectionConfig } from "payload";
import slugify from "slugify";

import { isAdminOrSystemUser } from "@/access/global";
import { messages } from "@/lib/errors";

export const Rooms: CollectionConfig = {
  slug: "rooms",
  access: {
    read: () => true,
    create: async ({ req }) => {
      const { user } = req;
      if (!user) return false;

      if (user.role === "admin") return true;

      if (user.role === "system-user") {
        const room = await req.payload.find({
          collection: "rooms",
          where: { user: { equals: user.id } },
        });

        if (room.docs.length === 0) return true;

        return false;
      }

      return false;
    },
    update: isAdminOrSystemUser,
    delete: isAdminOrSystemUser,
  },
  admin: {
    group: "Website Content",
    useAsTitle: "name",
  },
  fields: [
    {
      admin: { readOnly: true },
      label: "Room Name",
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      admin: { readOnly: true },
      label: "Room Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      label: "Hero Section",
      name: "hero",
      type: "group",
      fields: [
        {
          label: "Name (e.g. Shawqi H.)",
          name: "nameProfessional",
          type: "text",
          required: true,
        },
        {
          label: "Professional Title (e.g. Full-Stack Developer)",
          name: "titleProfessional",
          type: "text",
          required: true,
        },
        {
          label: "Professional Description",
          name: "descriptionProfessional",
          type: "textarea",
          required: true,
        },
        {
          label: "Professional Image",
          name: "imageProfessional",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
        },
      ],
    },
    {
      label: "Education",
      name: "education",
      type: "array",
      required: true,
      fields: [
        {
          label: "Institution",
          name: "institution",
          type: "text",
          required: true,
        },
        {
          label: "Degree",
          name: "degree",
          type: "text",
          required: true,
        },
        {
          label: "Status",
          name: "status",
          type: "select",
          options: [
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
          required: true,
        },
        {
          label: "Start Year",
          name: "yearStart",
          type: "number",
          min: 2010,
          max: new Date().getFullYear(),
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.status !== "in-progress",
          },
          label: "End Year",
          name: "yearEnd",
          type: "number",
          hasMany: false,
          min: 2011,
          max: new Date().getFullYear() + 10,
          required: true,
          validate: (value, { siblingData }) => {
            if (!value) return messages.forms.required("graduation year");

            if (typeof value !== "number")
              return messages.forms.valid("graduation year");

            if (!("yearStart" in siblingData))
              return messages.forms.required("start year");

            if (typeof siblingData.yearStart !== "number")
              return messages.forms.valid("start year");

            if (value <= siblingData.yearStart)
              return messages.forms.rooms.education.yearEnd(
                siblingData.yearStart,
              );

            return true;
          },
        },
        {
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      label: "Employments",
      name: "employments",
      type: "array",
      required: true,
      fields: [
        {
          label: "Company",
          name: "company",
          type: "text",
          required: true,
        },
        {
          label: "Position",
          name: "position",
          type: "text",
          required: true,
        },
        {
          label: "Is Remote",
          name: "isRemote",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isRemote === false,
          },
          label: "Location",
          name: "location",
          type: "text",
          required: true,
        },
        {
          label: "Start Date",
          name: "dateStart",
          type: "number",
          min: 2010,
          max: new Date().getFullYear() + 10,
          required: true,
        },
        {
          label: "Is Current/On Going",
          name: "isCurrent",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isCurrent === false,
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, req, data }) => {
        const { user } = req;

        if (!user) return data;

        if (operation === "create") {
          const dataModified = data;

          if (user.firstName) {
            dataModified.name = `${user.firstName} Room`;
            dataModified.slug = slugify(user.firstName, { lower: true });
          }

          return dataModified;
        }

        return data;
      },
    ],
  },
};
