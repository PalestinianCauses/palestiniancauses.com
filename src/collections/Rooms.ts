// REVIEWED - 22

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

import { AboutField } from "./rooms/fields/about";
import { EducationField } from "./rooms/fields/education";
import { ExperienceField } from "./rooms/fields/experience";
import { InformationField } from "./rooms/fields/information";

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
    // read: isAdminOrSelf,
    // update: isAdminOrSelf,
    // delete: isAdminOrSelf,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "name", "slug", "createdAt"],
    useAsTitle: "name",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL! + doc.slug].join("/rooms/");
      return null;
    },
  },
  fields: [
    {
      admin: { hidden: true },
      label: "User",
      name: "user",
      type: "relationship",
      relationTo: "users",
      unique: true,
      required: true,
    },
    {
      admin: {
        description: "A unique name for this Room, chosen by the user.",
      },
      label: "Room Name",
      name: "name",
      type: "text",
      maxLength: 16,
      unique: true,
      required: true,
    },
    {
      admin: {
        readOnly: true,
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              description: "A URL-friendly, unique identifier for this Room.",
              sourcePath: "name",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
              disabled: true,
            },
          },
        },
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
          "The publication status of the Room, controlling its visibility to users.",
      },
      label: "Room Publication Status",
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
    InformationField,
    AboutField,
    EducationField,
    ExperienceField,
    {
      admin: {
        description:
          "Catalog of professional qualifications, courses, and certifications.",
      },
      label: "Professional Qualifications",
      name: "qualification",
      type: "array",
      fields: [
        {
          admin: {
            description:
              "Full official title of the course, certification, or qualification.",
          },
          label: "Qualification Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Name of the issuing organization or platform.",
          },
          label: "Issuing Organization",
          name: "issuer",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Month and year the qualification program commenced.",
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
            description:
              "Month and year the qualification was completed or awarded.",
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
              "Optional: Official URL to the organization, course, or certification page.",
          },
          label: "Reference Link",
          name: "link",
          type: "text",
          required: false,
        },
        {
          admin: {
            description:
              "Indicate whether a certificate was awarded for this qualification.",
          },
          label: "Certificate Awarded",
          name: "hasCertificate",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.hasCertificate === true,
            description: "Upload the official certificate document or image.",
          },
          label: "Certificate Document",
          name: "certificate",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
        },
        {
          admin: {
            description:
              "Detailed summary of knowledge, skills, and competencies acquired.",
          },
          label: "Qualification Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "Comprehensive list of skills and corresponding proficiency levels.",
      },
      label: "Skills and Competencies",
      name: "skills",
      type: "array",
      fields: [
        {
          admin: {
            description: "Categorize related skills under a formal group.",
          },
          label: "Skill Category",
          name: "category",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Enumerate individual skills within this category.",
          },
          label: "Skills in Category",
          name: "skillsCategorized",
          type: "array",
          required: true,
          fields: [
            {
              admin: {
                description: "Official name of the skill.",
              },
              label: "Skill Name",
              name: "name",
              type: "text",
              required: true,
            },
            {
              admin: {
                description:
                  "Select the proficiency level that best represents your expertise in this skill.",
              },
              label: "Proficiency Level",
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
      ({ operation, req, data }) => {
        if (!req.user) return data;

        // eslint-disable-next-line no-param-reassign
        if (operation === "create") data.user = req.user.id;

        return data;
      },
    ],
  },
};
