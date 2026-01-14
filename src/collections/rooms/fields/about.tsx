// REVIEWED - 04

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
      "Personal introduction and professional narrative that tells your story, showcases your values, and establishes your professional identity.",
  },
  label: "Personal Introduction",
  name: "about",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "A compelling headline that captures your personal story, professional philosophy, or unique value proposition in a single impactful statement.",
      },
      label: "Introduction Headline",
      name: "headline",
      type: "text",
      maxLength: 68,
      required: true,
    },
    {
      admin: {
        description:
          "A descriptive sub-headline that provides additional context about your professional journey or personal approach.",
      },
      label: "Introduction Sub-Headline",
      name: "headline-sub",
      type: "text",
      defaultValue: AboutHeadlineSub,
      maxLength: 32,
      required: true,
    },
    {
      admin: {
        description:
          "A high-quality personal photograph that visually represents your professional image and personality (optional but recommended).",
        position: "sidebar",
      },
      label: "Personal Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media-public",
      hasMany: false,
      required: false,
    },
    {
      admin: {
        description:
          "A comprehensive personal narrative composed of well-crafted paragraphs that authentically represent your professional journey, values, and expertise. Each paragraph should be 350-500 characters for optimal readability.",
        position: "sidebar",
      },
      label: "Personal Narrative",
      name: "paragraphs",
      type: "array",
      minRows: 3,
      required: true,
      fields: [
        {
          admin: {
            description:
              "A single paragraph (350-500 characters) that contributes to your overall personal and professional narrative.",
            position: "sidebar",
          },
          label: "Narrative Paragraph",
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
          "Quantifiable professional achievements and key metrics that demonstrate your expertise, experience, and impact in your field.",
        position: "sidebar",
      },
      label: "Professional Statistics",
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
