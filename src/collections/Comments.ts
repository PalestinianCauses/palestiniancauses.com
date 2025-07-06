// REVIEWED - 07

import { CollectionConfig } from "payload";

import { isAdminOrSelf, isAuthenticated } from "@/access/global";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const populateVotesScore = (data: any) => {
  const dataUpdated = data;

  dataUpdated.votesScore = data.votes.reduce(
    (accumulator: number, voteElement: { vote: "up" | "down" }) => {
      if (voteElement.vote === "up") return accumulator + 1;
      return accumulator - 1;
    },
    0,
  );

  return dataUpdated;
};

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    useAsTitle: "id",
    defaultColumns: [
      "id",
      "user",
      "content",
      "status",
      "votesScore",
      "createdAt",
    ],
    enableRichTextRelationship: false,
  },
  fields: [
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "Commented On",
      name: "on",
      type: "relationship",
      relationTo: ["diary-entries", "blogs"],
      hasMany: false,
      required: true,
      index: true,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "In Reply To",
      name: "parent",
      type: "relationship",
      relationTo: "comments",
      hasMany: false,
      required: false,
      index: true,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "Replies Count",
      name: "repliesCount",
      type: "number",
      defaultValue: 0,
      min: 0,
      index: true,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      label: "User",
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      index: true,
    },
    {
      admin: { readOnly: true },
      label: "Content",
      name: "content",
      type: "textarea",
      minLength: 12,
      maxLength: 1200,
      required: true,
    },
    {
      admin: { position: "sidebar" },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "approved",
      required: true,
      index: true,
    },
    {
      label: "Votes",
      name: "votes",
      type: "array",
      fields: [
        {
          label: "User",
          name: "user",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
          required: true,
        },
        {
          label: "Vote",
          name: "vote",
          type: "select",
          options: [
            { label: "Up", value: "up" },
            { label: "Down", value: "down" },
          ],
          required: true,
        },
      ],
    },
    {
      admin: { readOnly: true },
      label: "Votes Score",
      name: "votesScore",
      type: "number",
      defaultValue: 0,
      index: true,
    },
  ],
  hooks: {
    beforeChange: [async ({ data }) => populateVotesScore(data)],
    beforeRead: [
      ({ doc }) => populateVotesScore(doc),
      async ({ req: { payload }, doc }) => {
        const docUpdated = doc;
        const repliesCountResponse = await payload.count({
          collection: "comments",
          where: { parent: { equals: doc.id } },
        });

        docUpdated.repliesCount = repliesCountResponse.totalDocs;

        return docUpdated;
      },
    ],
  },
};
