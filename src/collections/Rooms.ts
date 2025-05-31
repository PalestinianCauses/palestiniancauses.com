// REVIEWED - 08

import { CollectionConfig } from "payload";
import slugify from "slugify";

import { isAdminOrSelf } from "@/access/global";
import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

export const Rooms: CollectionConfig = {
  slug: "rooms",
  access: {
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
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "name", "slug", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        readOnly: true,
        description: "The unique identifier for this room",
      },
      label: "Room Name",
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      admin: {
        readOnly: true,
        description: "URL-friendly version of the room name",
      },
      label: "Room Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      admin: {
        description:
          "Personal and professional information displayed at the top of the room",
      },
      label: "Hero Section",
      name: "hero",
      type: "group",
      fields: [
        {
          admin: {
            description:
              "Your full name as you want it to appear professionally",
          },
          label: "Name",
          name: "nameProfessional",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Your current professional role or title" },
          label: "Professional Title",
          name: "titleProfessional",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "A brief overview of your professional background and expertise",
          },
          label: "Professional Description",
          name: "descriptionProfessional",
          type: "textarea",
          required: true,
        },
        {
          admin: {
            description: "Optional professional head-shot or profile picture",
          },
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
      admin: {
        description: "Your academic background and educational achievements",
      },
      label: "Education",
      name: "education",
      type: "array",
      required: true,
      fields: [
        {
          admin: { description: "Name of the educational institution" },
          label: "Institution",
          name: "institution",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Degree or qualification earned" },
          label: "Degree",
          name: "degree",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Current status of your education" },
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
            description: "When you started this educational program",
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
            description: "When you completed or ended this educational program",
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
          admin: { description: "Details about your studies and achievements" },
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: { description: "Your work history and professional activities" },
      label: "Experience",
      name: "experience",
      type: "array",
      required: true,
      fields: [
        {
          admin: { description: "Type of experience you want to add" },
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
            description: "Name of the company you worked for",
          },
          label: "Company",
          name: "company",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description: "Name of the organization you were involved with",
          },
          label: "Organization",
          name: "organization",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description:
              "Name of the activity or project you were involved with",
          },
          label: "Activity Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Your position or role in this experience" },
          label: "Position",
          name: "position",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Indicate if this was a remote position" },
          label: "Is Remote",
          name: "isRemote",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isRemote === false,
            description: "Physical location of the work-place",
          },
          label: "Location",
          name: "location",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "When you started this position",
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
          admin: { description: "Indicate if this is your current position" },
          label: "Is Current/On Going",
          name: "isCurrent",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isCurrent === false,
            description: "When you ended this position",
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
          admin: {
            description:
              "Add a URL to the company's website, social media profile, or official announcement",
          },
          label: "Link",
          name: "link",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "Provide a detailed description of your work, achievements, and responsibilities",
          },
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "List your professional qualifications' courses and certifications",
      },
      label: "Qualifications",
      name: "qualification",
      type: "array",
      required: true,
      fields: [
        {
          admin: {
            description: "Enter the full title of your course or certification",
          },
          label: "Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "Name of the organization or platform that issued the qualification",
          },
          label: "Issuer",
          name: "issuer",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "When you started this qualification",
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
            description: "When you completed or received this qualification",
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
          admin: {
            description: "Optional URL to the organization or course page",
          },
          label: "Link",
          name: "link",
          type: "text",
          required: false,
        },
        {
          admin: {
            description:
              "Indicate if you received a certificate for this qualification",
          },
          label: "Has Certificate",
          name: "hasCertificate",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.hasCertificate === true,
            description: "Upload your certificate document or image",
          },
          label: "Certificate",
          name: "certificate",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
        },
        {
          admin: {
            description:
              "Describe what you learned and achieved through this qualification",
          },
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: { description: "List your skills and expertise levels" },
      label: "Skills",
      name: "skills",
      type: "array",
      required: true,
      fields: [
        {
          admin: { description: "Group your skills into categories" },
          label: "Category",
          name: "category",
          type: "text",
          required: true,
        },
        {
          admin: { description: "List individual skills within this category" },
          label: "Category Skills",
          name: "skillsCategorized",
          type: "array",
          required: true,
          fields: [
            {
              admin: { description: "Enter the name of your skill" },
              label: "Name",
              name: "name",
              type: "text",
              required: true,
            },
            {
              admin: {
                description: "Select your proficiency level for this skill",
              },
              label: "Level",
              name: "level",
              type: "select",
              options: [
                { label: "Beginner", value: "beginner" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Advanced", value: "advanced" },
                { label: "Expert", value: "expert" },
              ],
              defaultValue: "expert",
              required: true,
            },
          ],
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
