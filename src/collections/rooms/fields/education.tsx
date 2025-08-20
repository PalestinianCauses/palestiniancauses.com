// REVIEWED

import { Field } from "payload";

import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

export const EducationHeadline =
  'Based on a formal education and fueled by a passion for "non-stop" growth.';
export const EducationField: Field = {
  admin: {
    description:
      "Academic history, including institutions attended and degrees or certifications obtained.",
  },
  label: "Educational Background",
  name: "education",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "Summarize your entire educational background section with a concise, impactful headline.",
      },
      label: "Headline",
      name: "headline",
      type: "text",
      defaultValue: EducationHeadline,
      maxLength: 80,
      required: true,
    },
    {
      label: "Education List",
      name: "list",
      type: "array",
      fields: [
        {
          admin: {
            description: "Official name of the educational institution.",
          },
          label: "Institution Name",
          name: "institution",
          type: "text",
          maxLength: 48,
          required: true,
        },
        {
          admin: {
            description:
              "Physical location of the educational institution (e.g., city, state, or country).",
          },
          label: "Institution Location",
          name: "location",
          type: "text",
          maxLength: 48,
          required: true,
        },
        {
          admin: { description: "Degree or qualification conferred." },
          label: "Degree or Qualification",
          name: "degree",
          type: "text",
          maxLength: 56,
          required: true,
        },
        {
          admin: {
            description: "Current completion status of the program.",
          },
          label: "Program Status",
          name: "status",
          type: "select",
          options: [
            { label: "In Progress", value: "in-progress" },
            { label: "Graduated", value: "graduated" },
            { label: "Dropped Out", value: "dropped-out" },
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
              "Detailed description of academic focus, course work, and notable achievements.",
          },
          label: "Program Description",
          name: "description",
          type: "textarea",
          minLength: 350,
          maxLength: 500,
          required: true,
        },
      ],
    },
  ],
};
