// REVIEWED - 04

import { payload } from "@/lib/payload";
import { Permission, Role } from "@/payload-types";

const permissions: Omit<Permission, "id" | "createdAt" | "updatedAt">[] = [
  // Blogs management permissions
  {
    name: "blogs.create",
    resource: "blogs",
    action: "create",
    description: "Create blog posts",
  },
  {
    name: "blogs.read",
    resource: "blogs",
    action: "read",
    description: "View blog posts",
  },
  {
    name: "blogs.update",
    resource: "blogs",
    action: "update",
    description: "Update blog posts",
  },
  {
    name: "blogs.delete",
    resource: "blogs",
    action: "delete",
    description: "Delete blog posts",
  },
  {
    name: "blogs.publish",
    resource: "blogs",
    action: "publish",
    description: "Publish blog posts",
  },

  // Comments management permissions
  {
    name: "comments.create",
    resource: "comments",
    action: "create",
    description: "Create comments",
  },
  {
    name: "comments.read",
    resource: "comments",
    action: "read",
    description: "View comments",
  },
  {
    name: "comments.update",
    resource: "comments",
    action: "update",
    description: "Update comments",
  },
  {
    name: "comments.delete",
    resource: "comments",
    action: "delete",
    description: "Delete comments",
  },

  // Comments field-level permissions
  {
    name: "comments.on.read",
    resource: "comments.on",
    action: "read",
    description: "View comment on",
  },
  {
    name: "comments.on.update",
    resource: "comments.on",
    action: "update",
    description: "Update comment on",
  },
  {
    name: "comments.parent.read",
    resource: "comments.parent",
    action: "read",
    description: "View comment parent",
  },
  {
    name: "comments.parent.update",
    resource: "comments.parent",
    action: "update",
    description: "Update comment parent",
  },
  {
    name: "comments.status.read",
    resource: "comments.status",
    action: "read",
    description: "View comment status",
  },
  {
    name: "comments.status.update",
    resource: "comments.status",
    action: "update",
    description: "Update comment status",
  },
  {
    name: "comments.user.read",
    resource: "comments.user",
    action: "read",
    description: "View comment author",
  },
  {
    name: "comments.user.update",
    resource: "comments.user",
    action: "update",
    description: "Update comment author",
  },

  // Diary entries management permissions
  {
    name: "diary-entries.create",
    resource: "diary-entries",
    action: "create",
    description: "Create diary entries",
  },
  {
    name: "diary-entries.read",
    resource: "diary-entries",
    action: "read",
    description: "View diary entries",
  },
  {
    name: "diary-entries.update",
    resource: "diary-entries",
    action: "update",
    description: "Update diary entries",
  },
  {
    name: "diary-entries.delete",
    resource: "diary-entries",
    action: "delete",
    description: "Delete diary entries",
  },

  // Diary entries field-level permissions
  {
    name: "diary-entries.author.read",
    resource: "diary-entries.author",
    action: "read",
    description: "View diary entry author",
  },
  {
    name: "diary-entries.author.update",
    resource: "diary-entries.author",
    action: "update",
    description: "Update diary entry author",
  },
  {
    name: "diary-entries.isAuthentic.read",
    resource: "diary-entries.isAuthentic",
    action: "read",
    description: "View diary entry authenticity",
  },
  {
    name: "diary-entries.isAuthentic.update",
    resource: "diary-entries.isAuthentic",
    action: "update",
    description: "Update diary entry authenticity",
  },
  {
    name: "diary-entries.status.read",
    resource: "diary-entries.status",
    action: "read",
    description: "View diary entry status",
  },
  {
    name: "diary-entries.status.update",
    resource: "diary-entries.status",
    action: "update",
    description: "Update diary entry status",
  },
  {
    name: "diary-entries.publish",
    resource: "diary-entries",
    action: "publish",
    description: "Publish diary entries",
  },

  // Media management permissions
  {
    name: "media.create",
    resource: "media",
    action: "create",
    description: "Upload media files",
  },
  {
    name: "media.read",
    resource: "media",
    action: "read",
    description: "View media files",
  },
  {
    name: "media.update",
    resource: "media",
    action: "update",
    description: "Update media files",
  },
  {
    name: "media.delete",
    resource: "media",
    action: "delete",
    description: "Delete media files",
  },

  // Notification subscriptions management permissions
  {
    name: "notification-subscriptions.create",
    resource: "notification-subscriptions",
    action: "create",
    description: "Create notification subscriptions",
  },
  {
    name: "notification-subscriptions.read",
    resource: "notification-subscriptions",
    action: "read",
    description: "View notification subscriptions",
  },
  {
    name: "notification-subscriptions.update",
    resource: "notification-subscriptions",
    action: "update",
    description: "Update notification subscriptions",
  },
  {
    name: "notification-subscriptions.delete",
    resource: "notification-subscriptions",
    action: "delete",
    description: "Delete notification subscriptions",
  },

  // Orders management permissions
  {
    name: "orders.create",
    resource: "orders",
    action: "create",
    description: "Create orders",
  },
  {
    name: "orders.read",
    resource: "orders",
    action: "read",
    description: "View orders",
  },
  {
    name: "orders.update",
    resource: "orders",
    action: "update",
    description: "Update orders",
  },
  {
    name: "orders.delete",
    resource: "orders",
    action: "delete",
    description: "Delete orders",
  },

  // Permissions management permissions
  {
    name: "permissions.create",
    resource: "permissions",
    action: "create",
    description: "Create new permissions",
  },
  {
    name: "permissions.read",
    resource: "permissions",
    action: "read",
    description: "View permissions",
  },
  {
    name: "permissions.update",
    resource: "permissions",
    action: "update",
    description: "Update permissions",
  },
  {
    name: "permissions.delete",
    resource: "permissions",
    action: "delete",
    description: "Delete permissions",
  },

  // Products management permissions
  {
    name: "products.create",
    resource: "products",
    action: "create",
    description: "Create products",
  },
  {
    name: "products.read",
    resource: "products",
    action: "read",
    description: "View products",
  },
  {
    name: "products.update",
    resource: "products",
    action: "update",
    description: "Update products",
  },
  {
    name: "products.delete",
    resource: "products",
    action: "delete",
    description: "Delete products",
  },

  // Roles management permissions
  {
    name: "roles.create",
    resource: "roles",
    action: "create",
    description: "Create new roles",
  },
  {
    name: "roles.read",
    resource: "roles",
    action: "read",
    description: "View roles",
  },
  {
    name: "roles.update",
    resource: "roles",
    action: "update",
    description: "Update roles",
  },
  {
    name: "roles.delete",
    resource: "roles",
    action: "delete",
    description: "Delete roles",
  },

  // Rooms management permissions
  {
    name: "rooms.create",
    resource: "rooms",
    action: "create",
    description: "Create rooms",
  },
  {
    name: "rooms.read",
    resource: "rooms",
    action: "read",
    description: "View rooms",
  },
  {
    name: "rooms.update",
    resource: "rooms",
    action: "update",
    description: "Update rooms",
  },
  {
    name: "rooms.delete",
    resource: "rooms",
    action: "delete",
    description: "Delete rooms",
  },

  // Room contact management permissions
  {
    name: "room-contact.create",
    resource: "room-contact",
    action: "create",
    description: "Create room contact",
  },
  {
    name: "room-contact.read",
    resource: "room-contact",
    action: "read",
    description: "View room contact",
  },
  {
    name: "room-contact.update",
    resource: "room-contact",
    action: "update",
    description: "Update room contact",
  },
  {
    name: "room-contact.delete",
    resource: "room-contact",
    action: "delete",
    description: "Delete room contact",
  },

  // Room packages management permissions
  {
    name: "room-packages.create",
    resource: "room-packages",
    action: "create",
    description: "Create room packages",
  },
  {
    name: "room-packages.read",
    resource: "room-packages",
    action: "read",
    description: "View room packages",
  },
  {
    name: "room-packages.update",
    resource: "room-packages",
    action: "update",
    description: "Update room packages",
  },
  {
    name: "room-packages.delete",
    resource: "room-packages",
    action: "delete",
    description: "Delete room packages",
  },

  // Room services management permissions
  {
    name: "room-services.create",
    resource: "room-services",
    action: "create",
    description: "Create room services",
  },
  {
    name: "room-services.read",
    resource: "room-services",
    action: "read",
    description: "View room services",
  },
  {
    name: "room-services.update",
    resource: "room-services",
    action: "update",
    description: "Update room services",
  },
  {
    name: "room-services.delete",
    resource: "room-services",
    action: "delete",
    description: "Delete room services",
  },

  // Service categories management permissions
  {
    name: "service-categories.create",
    resource: "service-categories",
    action: "create",
    description: "Create service categories",
  },
  {
    name: "service-categories.read",
    resource: "service-categories",
    action: "read",
    description: "View service categories",
  },
  {
    name: "service-categories.update",
    resource: "service-categories",
    action: "update",
    description: "Update service categories",
  },
  {
    name: "service-categories.delete",
    resource: "service-categories",
    action: "delete",
    description: "Delete service categories",
  },

  // Users management permissions
  {
    name: "users.create",
    resource: "users",
    action: "create",
    description: "Create new users",
  },
  {
    name: "users.read",
    resource: "users",
    action: "read",
    description: "View users",
  },
  {
    name: "users.update",
    resource: "users",
    action: "update",
    description: "Update users",
  },
  {
    name: "users.delete",
    resource: "users",
    action: "delete",
    description: "Delete users",
  },

  // Users field-level permissions
  {
    name: "users.email.read",
    resource: "users.email",
    action: "read",
    description: "View user email addresses",
  },
  {
    name: "users.email.update",
    resource: "users.email",
    action: "update",
    description: "Update user email addresses",
  },
  {
    name: "users.previousRole.read",
    resource: "users.previousRole",
    action: "read",
    description: "View user previous role",
  },
  {
    name: "users.previousRole.update",
    resource: "users.previousRole",
    action: "update",
    description: "Update user previous role",
  },
  {
    name: "users.roles.read",
    resource: "users.roles",
    action: "read",
    description: "View user roles",
  },
  {
    name: "users.roles.update",
    resource: "users.roles",
    action: "update",
    description: "Update user roles",
  },
];

const permissionsRoles: Record<string, string[]> = {
  "admin-user": [
    "blogs.create",
    "blogs.read",
    "blogs.update",
    "blogs.delete",
    "blogs.publish",
    "comments.create",
    "comments.read",
    "comments.update",
    "comments.delete",
    "comments.on.read",
    "comments.on.update",
    "comments.parent.read",
    "comments.parent.update",
    "comments.status.read",
    "comments.status.update",
    "comments.user.read",
    "comments.user.update",
    "diary-entries.create",
    "diary-entries.read",
    "diary-entries.update",
    "diary-entries.delete",
    "diary-entries.publish",
    "diary-entries.author.read",
    "diary-entries.author.update",
    "diary-entries.isAuthentic.read",
    "diary-entries.isAuthentic.update",
    "diary-entries.status.read",
    "diary-entries.status.update",
    "media.create",
    "media.read",
    "media.update",
    "media.delete",
    "notification-subscriptions.create",
    "notification-subscriptions.read",
    "notification-subscriptions.update",
    "notification-subscriptions.delete",
    "orders.create",
    "orders.read",
    "orders.update",
    "orders.delete",
    "permissions.create",
    "permissions.read",
    "permissions.update",
    "permissions.delete",
    "products.create",
    "products.read",
    "products.update",
    "products.delete",
    "roles.create",
    "roles.read",
    "roles.update",
    "roles.delete",
    "rooms.create",
    "rooms.read",
    "rooms.update",
    "rooms.delete",
    "room-contact.create",
    "room-contact.read",
    "room-contact.update",
    "room-contact.delete",
    "room-packages.create",
    "room-packages.read",
    "room-packages.update",
    "room-packages.delete",
    "room-services.create",
    "room-services.read",
    "room-services.update",
    "room-services.delete",
    "service-categories.create",
    "service-categories.read",
    "service-categories.update",
    "service-categories.delete",
    "users.create",
    "users.read",
    "users.update",
    "users.delete",
    "users.email.read",
    "users.email.update",
    "users.previousRole.read",
    "users.previousRole.update",
    "users.roles.read",
    "users.roles.update",
  ],
  "system-user": [
    "blogs.create",
    "blogs.read",
    "blogs.update",
    "blogs.delete",
    "blogs.publish",
    "comments.create",
    "diary-entries.create",
    "diary-entries.read",
    "diary-entries.update",
    "diary-entries.delete",
    "diary-entries.publish",
    "rooms.create",
    "room-contact.create",
    "room-packages.create",
    "room-services.create",
    "service-categories.create",
  ],
  "author-user": [
    "blogs.create",
    "blogs.publish",
    "comments.create",
    "diary-entries.create",
    "diary-entries.publish",
  ],
  "website-user": ["comments.create", "diary-entries.create"],
};

const roles: Omit<Role, "id" | "updatedAt" | "createdAt">[] = [
  {
    name: "admin-user",
    description: "Full system administrator with all permissions",
    permissions: [],
    isDefault: false,
    priority: 100,
  },
  {
    name: "system-user",
    description:
      "Limited system administrator with limited management permissions",
    permissions: [],
    isDefault: false,
    priority: 50,
  },
  {
    name: "author-user",
    description: "Content author with limited content management permissions",
    permissions: [],
    isDefault: false,
    priority: 25,
  },
  {
    name: "website-user",
    description: "Regular website user with basic permissions",
    permissions: [],
    isDefault: true,
    priority: 10,
  },
];

const doSeedingPermissionsPlusRoles =
  async function doSeedingPermissionsPlusRoles() {
    try {
      console.log("🚀 Starting seeding permissions and roles...");

      // Handle permissions - update if they exist
      const existingPermissions = await payload.find({
        collection: "permissions",
        limit: 1000,
      });

      if (existingPermissions.docs.length !== 0) {
        console.log(
          `📋 Found ${existingPermissions.docs.length} existing permissions, updating...`,
        );

        // Update existing permissions
        const permissionUpdates = await Promise.all(
          permissions.map(async (permissionData) => {
            const existing = existingPermissions.docs.find(
              (p) => p.name === permissionData.name,
            );

            if (existing) {
              return payload.update({
                collection: "permissions",
                id: existing.id,
                data: permissionData,
              });
            }

            return payload.create({
              collection: "permissions",
              data: permissionData,
            });
          }),
        );

        console.log(
          `✅ Updated ${permissionUpdates.length} permissions successfully`,
        );
      } else {
        // Create new permissions
        console.log(`📋 Creating ${permissions.length} permissions...`);

        const permissionsCreated = await Promise.all(
          permissions.map((permission) =>
            payload.create({
              collection: "permissions",
              data: permission,
            }),
          ),
        );

        console.log(
          `✅ Created ${permissionsCreated.length} permissions successfully`,
        );
      }

      // Handle roles - update if they exist
      const existingRoles = await payload.find({
        collection: "roles",
        limit: 100,
      });

      if (existingRoles.docs.length !== 0) {
        console.log(
          `📋 Found ${existingRoles.docs.length} existing roles, updating...`,
        );
      } else {
        console.log(`📋 Creating ${roles.length} roles...`);
      }

      // Fetch all permissions to create permission map
      const permissionsResponse = await payload.find({
        collection: "permissions",
        limit: 1000,
      });

      if (!permissionsResponse.docs.length) {
        console.log("❌ No permissions found. Please seed permissions first.");
        process.exit(1);
      }

      // Create permission name to ID map
      const permissionMap = new Map();
      permissionsResponse.docs.forEach((permission) => {
        permissionMap.set(permission.name, permission.id);
      });

      console.log(
        `📊 Found ${permissionMap.size} permissions for role assignment`,
      );

      // Handle roles - create or update
      const rolesProcessed = await Promise.all(
        roles.map(async (roleSeedingData) => {
          // Get role permissions based on role name
          const rolePermissionNames =
            permissionsRoles[roleSeedingData.name] || [];

          // Get role permission IDs
          const rolePermissionIds = rolePermissionNames
            .map((name) => permissionMap.get(name))
            .filter(Boolean);

          console.log(
            `📋 ${roleSeedingData.name}: Assigning ${rolePermissionIds.length} permissions`,
          );

          // Check if role exists
          const existingRole = existingRoles.docs.find(
            (r) => r.name === roleSeedingData.name,
          );

          if (existingRole) {
            // Update existing role
            return payload.update({
              collection: "roles",
              id: existingRole.id,
              data: {
                ...roleSeedingData,
                permissions: rolePermissionIds,
              },
            });
          }
          // Create new role
          return payload.create({
            collection: "roles",
            data: {
              ...roleSeedingData,
              permissions: rolePermissionIds,
            },
          });
        }),
      );

      console.log(`✅ Processed ${rolesProcessed.length} roles successfully`);

      // Display role summary
      rolesProcessed.forEach((role) => {
        const rolePermissionNames = permissionsRoles[role.name] || [];
        console.log(
          `📋 ${role.name}: ${rolePermissionNames.length} permissions assigned`,
        );
      });

      console.log("🎉 Permissions and roles seeded successfully!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding permissions and roles:", error);

      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error?.data
      ) {
        console.error("Error details:", error.data);
      }

      process.exit(1);
    }
  };

doSeedingPermissionsPlusRoles();
