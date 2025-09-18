// REVIEWED - 01

import { Field } from "payload";

export const AboutHeadlineSub = "Meet the person behind this room";

export const AboutHeadingsPlusParagraphs = {
  experience: {
    heading: "Years of dedication",
    description: "Always learning, growing, and making an impact each year",
  },
  happyClients: {
    heading: "Delighted clients",
    description:
      "Delivering results that delight clients, every single project",
  },
  milestonesAchieved: {
    heading: "Ideas turned reality",
    description: "Overcoming challenges to deliver successful projects",
  },
};

export const AboutField: Field = {
  admin: {
    description:
      "Personal introduction section, providing a detailed narrative about yourself, your values, and your journey.",
  },
  label: "About",
  name: "about",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "A compelling headline that encapsulates your personal story or philosophy.",
      },
      label: "Headline",
      name: "headline",
      type: "text",
      maxLength: 68,
      required: true,
    },
    {
      admin: {
        description:
          "A sub-headline that provides additional context or information about the headline.",
      },
      label: "Sub-Headline",
      name: "headline-sub",
      type: "text",
      defaultValue: AboutHeadlineSub,
      maxLength: 32,
      required: true,
    },
    {
      admin: {
        description:
          "A personal photograph to visually introduce yourself (optional).",
      },
      label: "Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
    {
      admin: {
        description:
          "A series of well-crafted paragraphs that together provide a comprehensive and authentic overview of who you are. Each paragraph should be between 350 and 500 characters. Please provide at least 3 paragraphs.",
      },
      label: "Paragraphs",
      name: "paragraphs",
      type: "array",
      minRows: 3,
      required: true,
      fields: [
        {
          admin: {
            description:
              "A single paragraph (350-500 characters) that forms part of your personal narrative.",
          },
          label: "Paragraph",
          name: "paragraph",
          type: "textarea",
          minLength: 350,
          maxLength: 500,
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "Key statistics that highlight your professional journey and achievements.",
      },
      label: "Stats",
      name: "stats",
      type: "group",
      fields: [
        {
          label: "Years of Experience",
          name: "experience",
          type: "group",
          fields: [
            {
              admin: {
                description:
                  "Total number of years of professional experience.",
              },
              label: "Years",
              name: "years",
              type: "number",
              min: 1,
              required: true,
            },
            {
              admin: {
                description:
                  "A short heading for this statistic (e.g., 'Years of dedication').",
              },
              label: "Heading",
              name: "heading",
              type: "text",
              defaultValue: AboutHeadingsPlusParagraphs.experience.heading,
              maxLength: 20,
              required: true,
            },
            {
              admin: {
                description:
                  "A brief description to provide context for this statistic.",
              },
              label: "Description",
              name: "description",
              type: "textarea",
              defaultValue: AboutHeadingsPlusParagraphs.experience.description,
              maxLength: 68,
              required: true,
            },
          ],
        },
        {
          label: "Happy Clients",
          name: "happyClients",
          type: "group",
          fields: [
            {
              admin: {
                description: "Number of happy clients you have worked with.",
              },
              label: "Clients",
              name: "clients",
              type: "number",
              min: 1,
              required: true,
            },
            {
              admin: {
                description:
                  "A short heading for this statistic (e.g., 'Delighted clients').",
              },
              label: "Heading",
              name: "heading",
              type: "text",
              defaultValue: AboutHeadingsPlusParagraphs.happyClients.heading,
              maxLength: 20,
              required: true,
            },
            {
              admin: {
                description:
                  "A brief description to provide context for this statistic.",
              },
              label: "Description",
              name: "description",
              type: "textarea",
              defaultValue:
                AboutHeadingsPlusParagraphs.happyClients.description,
              maxLength: 68,
              required: true,
            },
          ],
        },
        {
          label: "Milestones Achieved",
          name: "milestonesAchieved",
          type: "group",
          fields: [
            {
              admin: {
                description:
                  "Number of significant milestones, projects, or achievements you have completed.",
              },
              label: "Milestones",
              name: "milestones",
              type: "number",
              min: 1,
              required: true,
            },
            {
              admin: {
                description:
                  "A short heading for this statistic (e.g., 'Ideas turned reality').",
              },
              label: "Heading",
              name: "heading",
              type: "text",
              defaultValue:
                AboutHeadingsPlusParagraphs.milestonesAchieved.heading,
              maxLength: 20,
              required: true,
            },
            {
              admin: {
                description:
                  "A brief description to provide context for this statistic.",
              },
              label: "Description",
              name: "description",
              type: "textarea",
              defaultValue:
                AboutHeadingsPlusParagraphs.milestonesAchieved.description,
              maxLength: 68,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
