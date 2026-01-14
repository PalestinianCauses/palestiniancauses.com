// REVIEWED

import { Field } from "payload";

export const HeadlineSkill =
  "My Professional Toolkit: A Showcase of Core Competencies";

export const HeadlineSubSkill = "Areas of Expertise";

export const Skill: Field = {
  admin: {
    description:
      "A comprehensive overview of your skills, organized by proficiency level to highlight your professional strengths.",
  },
  label: "Skills and Competencies",
  name: "skills",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "Craft a compelling headline that introduces and encapsulates your skills and competencies section, setting the tone for your professional profile.",
      },
      label: "Headline",
      name: "headline",
      type: "text",
      defaultValue: HeadlineSkill,
      maxLength: 68,
      required: true,
    },
    {
      admin: {
        description:
          "Provide a distinguished sub-headline that further defines the scope and focus of your skills and competencies, engaging the reader with clarity and professionalism.",
      },
      label: "Sub-Headline",
      name: "headline-sub",
      type: "text",
      defaultValue: HeadlineSubSkill,
      maxLength: 32,
      required: true,
    },
    {
      admin: {
        description:
          "Curate a detailed and organized list of your skills and competencies, grouped by category to present a structured and authoritative summary of your expertise.",
      },
      label: "Skills List",
      name: "list",
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
              maxLength: 48,
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
