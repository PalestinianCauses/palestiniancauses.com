// REVIEWED - 29
import type { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { messages } from "@/lib/messages";
import { hasPermission } from "@/lib/permissions";
import { isNumber } from "@/lib/types/guards";
import { createResetPassEmail } from "@/lib/utils/email-templates-auth";
import { User } from "@/payload-types";

/*
when managing access collections we care about accessing content when users are browsing /dashboard not our entire website.
*/

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: hasPermissionAccess({ resource: "users", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "read" })({ req }) ||
      isSelf("id")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "update" })({ req }) ||
      isSelf("id")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "users", action: "delete" })({ req }) ||
      isSelf("id")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "users",
        action: "manage",
      }),
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "createdAt"],
    useAsTitle: "email",
  },
  auth: {
    tokenExpiration: 24 * 60 * 60,
    forgotPassword: {
      generateEmailSubject: () => "Reset Your Password at PalestinianCauses",
      generateEmailHTML: (args) => {
        const token = args ? args.token : null;

        if (!token)
          throw new Error(messages.actions.auth.forgotPassword.serverError);

        const resetPassURL = `${process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com"}/reset-password/${token}`;
        return createResetPassEmail(resetPassURL);
      },
    },
  },
  fields: [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      admin: { position: "sidebar" },
      label: "Account Verified",
      name: "accountVerified",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      admin: { position: "sidebar" },
      label: "Pending Email",
      name: "pendingEmail",
      type: "email",
      required: false,
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Bio",
      name: "bio",
      type: "textarea",
      required: false,
      maxLength: 500,
    },
    {
      label: "Avatar",
      name: "avatar",
      type: "upload",
      relationTo: "media-public",
      required: false,
    },
    {
      label: "Social Links",
      name: "linksSocial",
      type: "group",
      fields: [
        {
          label: "GitHub",
          name: "github",
          type: "text",
          required: false,
        },
        {
          label: "Instagram",
          name: "instagram",
          type: "text",
          required: false,
        },
        {
          label: "Twitter/X",
          name: "twitter",
          type: "text",
          required: false,
        },
        {
          label: "LinkedIn",
          name: "linkedin",
          type: "text",
          required: false,
        },
        {
          label: "Website",
          name: "website",
          type: "text",
          required: false,
        },
      ],
    },
    {
      label: "Privacy Settings",
      name: "privacySettings",
      type: "group",
      fields: [
        {
          label: "Show Email on Public Profile",
          name: "showEmail",
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
        {
          label: "Show Activity on Public Profile",
          name: "showActivity",
          type: "checkbox",
          defaultValue: true,
          required: true,
        },
        {
          label: "Show Achievements on Public Profile",
          name: "showAchievements",
          type: "checkbox",
          defaultValue: true,
          required: true,
        },
        {
          label: "Show Orders on Public Profile",
          name: "showOrders",
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
      ],
    },
    {
      access: {
        read: hasPermissionFieldAccess("users.previousRole", "read"),
        update: hasPermissionFieldAccess("users.previousRole", "update"),
      },
      admin: { position: "sidebar" },
      label: "Previous Role",
      name: "previousRole",
      type: "select",
      options: ["admin", "system-user", "website-user"],
      defaultValue: "website-user",
      required: false,
    },
    {
      access: {
        read: hasPermissionFieldAccess("users.roles", "read"),
        update: hasPermissionFieldAccess("users.roles", "update"),
      },
      admin: { position: "sidebar" },
      label: "Roles",
      name: "roles",
      type: "relationship",
      relationTo: "roles",
      hasMany: true,
      required: true,
    },
  ],
  hooks: {
    afterChange: [],
    beforeDelete: [
      async ({ id, req }) => {
        try {
          const [
            blogRoomWithUser,
            blogPostWithUser,
            mediaPrivateWithUserAccess,
            productWithUser,
          ] = await Promise.all([
            req.payload.find({
              collection: "blogs-rooms",
              where: {
                and: [
                  { roomOwner: { not_equals: id } },
                  { authors: { equals: id } },
                ],
              },
              limit: 0,
            }),
            req.payload.find({
              collection: "blogs-posts",
              where: {
                "blogRoom.roomOwner": { not_equals: id },
                "or": [
                  { authors: { equals: id } },
                  { translators: { equals: id } },
                ],
              },
              limit: 0,
            }),
            req.payload.find({
              collection: "media-private",
              where: {
                owner: { not_equals: id },
                users: { equals: id },
              },
              limit: 0,
            }),
            req.payload.find({
              collection: "products",
              where: { authors: { equals: id } },
              limit: 0,
            }),
          ]);

          if (blogRoomWithUser.docs.length !== 0) {
            await Promise.all(
              blogRoomWithUser.docs.map(async (blogRoom) => {
                let authorsId: number[] = [];

                if (blogRoom.authors && blogRoom.authors.length !== 0) {
                  authorsId = blogRoom.authors
                    .map((author) => (isNumber(author) ? author : author.id))
                    .filter((authorId) => authorId !== id);
                }

                return req.payload.update({
                  collection: "blogs-rooms",
                  id: blogRoom.id,
                  data: {
                    authors: authorsId,
                  },
                });
              }),
            );
          }

          if (blogPostWithUser.docs.length !== 0) {
            await Promise.all(
              blogPostWithUser.docs.map(async (blogPost) => {
                let authorsId: number[] = [];
                let translatorsId: number[] = [];

                if (blogPost.authors && blogPost.authors.length !== 0) {
                  authorsId = blogPost.authors
                    .map((author) => (isNumber(author) ? author : author.id))
                    .filter((authorId) => authorId !== id);
                }

                if (blogPost.translators && blogPost.translators.length !== 0) {
                  translatorsId = blogPost.translators
                    .map((translator) =>
                      isNumber(translator) ? translator : translator.id,
                    )
                    .filter((translatorId) => translatorId !== id);
                }

                if (authorsId.length === 0)
                  return req.payload.delete({
                    collection: "blogs-posts",
                    id: blogPost.id,
                  });

                return req.payload.update({
                  collection: "blogs-posts",
                  id: blogPost.id,
                  data: {
                    authors: authorsId,
                    translators: translatorsId,
                  },
                });
              }),
            );
          }

          if (mediaPrivateWithUserAccess.docs.length !== 0) {
            await Promise.all(
              mediaPrivateWithUserAccess.docs.map(async (media) => {
                let usersId: number[] = [];

                if (media.users && media.users.length !== 0) {
                  usersId = media.users
                    .map((user) => (isNumber(user) ? user : user.id))
                    .filter((userId) => userId !== id);
                }

                return req.payload.update({
                  collection: "media-private",
                  id: media.id,
                  data: {
                    users: usersId,
                  },
                });
              }),
            );
          }

          if (productWithUser.docs.length !== 0) {
            await Promise.all(
              productWithUser.docs.map(async (product) => {
                let authorsId: number[] = [];

                if (product.authors && product.authors.length !== 0) {
                  authorsId = product.authors
                    .map((author) => (isNumber(author) ? author : author.id))
                    .filter((authorId) => authorId !== id);
                }

                return req.payload.update({
                  collection: "products",
                  id: product.id,
                  data: {
                    authors: authorsId,
                  },
                });
              }),
            );
          }

          await Promise.all([
            req.payload.delete({
              collection: "achievement-notifications",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "blogs-rooms",
              where: { roomOwner: { equals: id } },
            }),

            req.payload.delete({
              collection: "comments",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "diary-entries",
              where: { author: { equals: id } },
            }),

            req.payload.delete({
              collection: "media-private",
              where: { owner: { equals: id } },
            }),

            req.payload.delete({
              collection: "media-public",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "notifications",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "orders",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "rooms",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "rooms-contact",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "rooms-packages",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "rooms-services",
              where: { user: { equals: id } },
            }),

            req.payload.delete({
              collection: "verification-tokens-email",
              where: { user: { equals: id } },
            }),
          ]);
        } catch (error) {
          console.error("Error deleting user's dependent collections:", error);
        }
      },
    ],
  },
};
