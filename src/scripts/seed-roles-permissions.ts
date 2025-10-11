// REVIEWED

import { payload } from "@/lib/payload";
import { Permission, Role } from "@/payload-types";

const permissions: Omit<Permission, "id" | "createdAt" | "updatedAt">[] = [
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
];

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

// more row row seedRolesAndPermissions
export const doSeedingPermissionsPlusRoles =
  async function doSeedingPermissionsPlusRoles() {
    try {
      console.log("🚀 Starting seeding permissions and roles...");

      const existingPermissions = await payload.find({
        collection: "permissions",
        limit: 1,
      });

      if (existingPermissions.docs.length > 0) {
        console.log("❌ Permissions exist, skipping seeding.");
        return;
      }

      const permissionsPromises = permissions.map((permission) =>
        payload.create({
          collection: "permissions",
          data: permission,
        }),
      );

      await Promise.all(permissionsPromises);
      console.log("🎉 Permissions created successfully");

      const existingRoles = await payload.find({
        collection: "roles",
        limit: 1,
      });

      if (existingRoles.docs.length > 0) {
        console.log("❌ Roles exist, skipping seeding.");
        return;
      }

      const rolesPromises = roles.map((role) =>
        payload.create({
          collection: "roles",
          data: role,
        }),
      );

      await Promise.all(rolesPromises);
      console.log("🎉 Roles created successfully");
      console.log("🎉 Permissions and roles seeded successfully!");

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding permissions and roles:", error);
      console.error(
        error && typeof error === "object" && "data" in error && error?.data,
      );

      process.exit(1);
    }
  };

doSeedingPermissionsPlusRoles();
