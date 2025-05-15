// REVIEWED - 03

import { CollectionConfig } from "payload";
import slugify from "slugify";

import { isAdminOrSelf, isAdminOrSystemUser } from "@/access/global";
import { messages } from "@/lib/errors";
import { validateDateInRange } from "@/lib/utils";

export const Rooms: CollectionConfig = {
  slug: "rooms",
  access: {
    read: isAdminOrSelf,
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
          admin: {
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.status !== "in-progress",
            date: { pickerAppearance: "monthOnly" },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
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
      label: "Experience",
      name: "experience",
      type: "array",
      required: true,
      fields: [
        {
          label: "Type",
          name: "type",
          type: "select",
          options: [
            { label: "Employment", value: "employment" },
            { label: "External Activities", value: "activity" },
          ],
          defaultValue: "employment",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "employment",
          },
          label: "Company",
          name: "company",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
          },
          label: "Organization",
          name: "organization",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
          },
          label: "Activity Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          label: "Position (e.g. Full-Stack Developer)",
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
          admin: {
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
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
            date: { pickerAppearance: "monthOnly" },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
          },
        },
        {
          label: "Link (e.g. Websites, Social Media Posts, etc.)",
          name: "link",
          type: "text",
          required: true,
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
      label: "Qualifications (e.g. Courses and Certifications)",
      name: "qualification",
      type: "array",
      required: true,
      fields: [
        {
          label: "Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          label: "Issuer (e.g. Udemy, Coursera, etc.)",
          name: "issuer",
          type: "text",
          required: true,
        },
        {
          admin: {
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
          required: true,
        },
        {
          admin: {
            date: {
              pickerAppearance: "monthOnly",
            },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
          },
        },
        {
          label: "Link (e.g. Course Website)",
          name: "link",
          type: "text",
          required: false,
        },
        {
          label: "Has Certificate",
          name: "hasCertificate",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.hasCertificate === true,
          },
          label: "Certificate",
          name: "certificate",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
        },
        {
          label: "Description",
          name: "description",
          type: "textarea",
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
