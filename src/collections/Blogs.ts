// REVIEWED

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf, isSelfs } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { isNumber, isObject } from "@/lib/types/guards";
import { BlogSystem, User } from "@/payload-types";

const getOwnerId = (owner: BlogSystem["owner"]): number | null => {
  if (isNumber(owner)) return owner;
  if (isObject(owner) && "id" in owner) return owner.id;
  return null;
};

export const Blogs: CollectionConfig = {
  slug: "blog-systems",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, { resource: "blog-systems", action: "manage" }),
    create: hasPermissionAccess({ resource: "blog-systems", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "blog-systems", action: "read" })({
        req,
      }) ||
      isSelf("owner")({ req }) ||
      isSelfs("authors")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "blog-systems", action: "update" })({
        req,
      }) || isSelf("owner")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "blog-systems", action: "delete" })({
        req,
      }) || isSelf("owner")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blog-systems",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: ["id", "name", "slug", "status", "createdAt"],
    useAsTitle: "name",
    preview: (document) => {
      if (document.slug)
        return `${process.env.NEXT_PUBLIC_URL}/blogs/${document.slug}`;
      return null;
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basic Information",
          description: "Essential blog configuration and identification",
          fields: [
            {
              admin: {
                hidden: true,
                position: "sidebar",
                description:
                  "The owner of this blog system. Only the owner can manage authors.",
              },
              label: "Blog Owner",
              name: "owner",
              type: "relationship",
              relationTo: "users",
              required: true,
            },
            {
              admin: {
                position: "sidebar",
                description:
                  "A unique, memorable name for this blog. This will be displayed prominently and used in the URL.",
              },
              label: "Blog Name",
              name: "name",
              type: "text",
              maxLength: 56,
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
                      description:
                        "A URL-friendly, unique identifier automatically generated from the blog name.",
                      sourcePath: "name",
                      slugPath: "slug",
                      label: "URL Slug",
                      readOnly: true,
                      disabled: true,
                    },
                  },
                },
                position: "sidebar",
              },
              label: "URL Slug",
              name: "slug",
              type: "text",
              unique: true,
              required: true,
              index: true,
            },
            {
              admin: {
                position: "sidebar",
                description:
                  "Controls the visibility and accessibility of this blog to public visitors.",
              },
              label: "Publication Status",
              name: "status",
              type: "select",
              options: [
                { label: "Draft - Not visible to public", value: "draft" },
                { label: "Published - Visible to public", value: "published" },
              ],
              defaultValue: "draft",
              required: true,
            },
            {
              admin: {
                description:
                  "A brief description of this blog's purpose, theme, and content focus.",
              },
              label: "Description",
              name: "description",
              type: "textarea",
              maxLength: 500,
              required: false,
            },
          ],
        },
        {
          label: "Language & Localization",
          description: "Language settings for content direction and fonts",
          fields: [
            {
              admin: {
                description:
                  "Select the primary language for this blog. This affects text direction (RTL for Arabic) and font selection.",
              },
              label: "Language",
              name: "language",
              type: "select",
              options: [
                { label: "Arabic", value: "ar" },
                { label: "English", value: "en" },
                { label: "French", value: "fr" },
                { label: "Spanish", value: "es" },
              ],
              defaultValue: "en",
              required: true,
            },
          ],
        },
        {
          label: "Visual Identity",
          description: "Blog appearance and branding",
          fields: [
            {
              admin: {
                description:
                  "Choose a color theme for this blog that will be used throughout the interface.",
              },
              label: "Blog Color Theme",
              name: "color",
              type: "select",
              options: [
                { label: "Red - Bold and attention-grabbing", value: "red" },
                { label: "Orange - Energetic and creative", value: "orange" },
                { label: "Amber - Warm and professional", value: "amber" },
                { label: "Yellow - Bright and optimistic", value: "yellow" },
                { label: "Green - Growth and success", value: "green" },
                { label: "Teal - Modern and trustworthy", value: "teal" },
                { label: "Blue - Professional and reliable", value: "blue" },
                { label: "Indigo - Deep and sophisticated", value: "indigo" },
                { label: "Purple - Creative and innovative", value: "purple" },
                { label: "Pink - Friendly and approachable", value: "pink" },
              ],
              defaultValue: "blue",
              required: true,
            },
            {
              admin: {
                description:
                  "Featured image for this blog, displayed on blog listing pages and headers.",
              },
              label: "Featured Image",
              name: "imageFeatured",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
        },
        {
          label: "Team & Authors",
          description: "Manage the team of authors for this blog",
          fields: [
            {
              access: {
                create: async ({ req, data }) => {
                  if (
                    hasPermission(req.user, {
                      resource: "blog-systems",
                      action: "create",
                    })
                  )
                    return true;

                  if (!req.user?.id || !data?.owner) return false;

                  // Only owner can set authors when creating
                  const owner = getOwnerId(data.owner);
                  return owner === req.user.id;
                },
                read: async ({ req, siblingData }) => {
                  if (
                    hasPermission(req.user, {
                      resource: "blog-systems",
                      action: "read",
                    })
                  )
                    return true;

                  if (!req.user?.id || !siblingData) return false;

                  const blogSystem = siblingData as BlogSystem;

                  // Check if user is owner
                  const owner = getOwnerId(blogSystem.owner);
                  if (owner === req.user.id) return true;

                  // Check if user is in authors team
                  const authors = blogSystem.authors || [];
                  const authorIds = authors
                    .map((a) => {
                      if (isNumber(a)) return a;
                      if (isObject(a) && "id" in a) return a.id;
                      return null;
                    })
                    .filter(
                      (authorId): authorId is number => authorId !== null,
                    );

                  return authorIds.includes(req.user.id);
                },
                update: async ({ req, siblingData }) => {
                  if (
                    hasPermission(req.user, {
                      resource: "blog-systems",
                      action: "update",
                    })
                  )
                    return true;

                  if (!req.user?.id || !siblingData) return false;

                  const blogSystem = siblingData as BlogSystem;

                  // Only owner can update authors field
                  const owner = getOwnerId(blogSystem.owner);
                  return owner === req.user.id;
                },
              },
              admin: {
                description:
                  "Select users who can author posts for this blog. These authors will appear in post attribution. Only the blog owner can manage this list.",
              },
              label: "Author Team",
              name: "authors",
              type: "relationship",
              relationTo: "users",
              hasMany: true,
              required: false,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (!data.owner)
          if (req.user)
            // eslint-disable-next-line no-param-reassign
            data.owner = req.user.id;

        return data;
      },
    ],
  },
};
