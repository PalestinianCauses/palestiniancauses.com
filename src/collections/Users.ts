// REVIEWED - 25
import type { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { messages } from "@/lib/messages";
import { hasPermission } from "@/lib/permissions";
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

        const resetPassURL = `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/reset-password/${token}`;
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
      relationTo: "media",
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
        {
          label: "Room",
          name: "room",
          type: "relationship",
          relationTo: "rooms",
          hasMany: false,
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
};
