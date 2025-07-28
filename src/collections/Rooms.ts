// REVIEWED - 13

import { CollectionConfig } from "payload";

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
    // read: isAdminOrSelf,
    // update: isAdminOrSelf,
    // delete: isAdminOrSelf,
    read: isAdminOrSelf,
    update: () => false,
    delete: () => false,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "name", "slug", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description: "A unique, system-generated identifier for this Room.",
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
        description: "A URL-friendly, unique identifier for this Room.",
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              sourcePath: "information.name",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
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
          "Formal personal and professional details displayed at the top of the Room profile.",
      },
      label: "Personal and Professional Information",
      name: "information",
      type: "group",
      fields: [
        {
          admin: {
            description:
              "Full legal name as it should appear in professional contexts.",
          },
          label: "Professional Name",
          name: "name",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Current professional designation or job title.",
          },
          label: "Professional Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "A concise summary of professional background, expertise, and experience.",
          },
          label: "Professional Summary",
          name: "summary",
          type: "textarea",
          required: true,
        },
        {
          admin: {
            description:
              "A formal professional head-shot or profile photograph (optional).",
          },
          label: "Professional Photograph",
          name: "photograph",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
        },
      ],
    },
    {
      admin: {
        description:
          "Academic history, including institutions attended and degrees or certifications obtained.",
      },
      label: "Educational Background",
      name: "education",
      type: "array",
      fields: [
        {
          admin: {
            description: "Official name of the educational institution.",
          },
          label: "Institution Name",
          name: "institution",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Degree or qualification conferred." },
          label: "Degree or Qualification",
          name: "degree",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Current completion status of the program." },
          label: "Program Status",
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
            description: "Month and year the educational program commenced.",
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
            description:
              "Month and year the educational program was completed or ended.",
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
              "Detailed description of academic focus, coursework, and notable achievements.",
          },
          label: "Program Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "Comprehensive record of professional experience and relevant activities.",
      },
      label: "Professional Experience",
      name: "experience",
      type: "array",
      fields: [
        {
          admin: {
            description: "Specify the type of professional experience.",
          },
          label: "Experience Type",
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
            description: "Official name of the employing company.",
          },
          label: "Company Name",
          name: "company",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description: "Official name of the organization involved.",
          },
          label: "Organization Name",
          name: "organization",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description:
              "Formal title of the activity, project, or initiative.",
          },
          label: "Activity or Project Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Position or role held during this experience.",
          },
          label: "Position Title",
          name: "position",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Indicate whether this position was remote.",
          },
          label: "Remote Position",
          name: "isRemote",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isRemote === false,
            description: "Physical location of the workplace.",
          },
          label: "Workplace Location",
          name: "location",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Month and year the position commenced.",
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
            description: "Indicate if this is the current or ongoing position.",
          },
          label: "Current Position",
          name: "isCurrent",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isCurrent === false,
            description: "Month and year the position ended.",
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
              "Official URL to the company, organization, or project (e.g., website, social media, or press release).",
          },
          label: "Reference Link",
          name: "link",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "Comprehensive description of responsibilities, achievements, and contributions.",
          },
          label: "Experience Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
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
};
