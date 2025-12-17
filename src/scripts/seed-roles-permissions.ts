// REVIEWED - 16

import { payload } from "@/lib/payload";
import { Permission, Role } from "@/payload-types";

const permissions: Omit<Permission, "id" | "createdAt" | "updatedAt">[] = [
  // Achievements notifications management permissions
  {
    name: "achievement-notifications.manage",
    resource: "achievement-notifications",
    action: "manage",
    description: "Manage achievement notifications in admin dashboard",
  },
  {
    name: "achievement-notifications.create",
    resource: "achievement-notifications",
    action: "create",
    description: "Create achievement notifications",
  },
  {
    name: "achievement-notifications.read",
    resource: "achievement-notifications",
    action: "read",
    description: "View achievement notifications",
  },
  {
    name: "achievement-notifications.update",
    resource: "achievement-notifications",
    action: "update",
    description: "Update achievement notifications",
  },
  {
    name: "achievement-notifications.delete",
    resource: "achievement-notifications",
    action: "delete",
    description: "Delete achievement notifications",
  },

  // Blogs Rooms management permissions
  {
    name: "blogs-rooms.manage",
    resource: "blogs-rooms",
    action: "manage",
    description: "Manage blogs rooms in admin dashboard",
  },
  {
    name: "blogs-rooms.create",
    resource: "blogs-rooms",
    action: "create",
    description: "Create blogs rooms",
  },
  {
    name: "blogs-rooms.read",
    resource: "blogs-rooms",
    action: "read",
    description: "View blogs rooms",
  },
  {
    name: "blogs-rooms.update",
    resource: "blogs-rooms",
    action: "update",
    description: "Update blogs rooms",
  },
  {
    name: "blogs-rooms.delete",
    resource: "blogs-rooms",
    action: "delete",
    description: "Delete blogs rooms",
  },

  // Blogs Categories management permissions
  {
    name: "blogs-categories.manage",
    resource: "blogs-categories",
    action: "manage",
    description: "Manage blogs categories in admin dashboard",
  },
  {
    name: "blogs-categories.create",
    resource: "blogs-categories",
    action: "create",
    description: "Create blogs categories",
  },
  {
    name: "blogs-categories.read",
    resource: "blogs-categories",
    action: "read",
    description: "View blogs categories",
  },
  {
    name: "blogs-categories.update",
    resource: "blogs-categories",
    action: "update",
    description: "Update blogs categories",
  },
  {
    name: "blogs-categories.delete",
    resource: "blogs-categories",
    action: "delete",
    description: "Delete blogs categories",
  },

  // Blogs Posts management permissions
  {
    name: "blogs-posts.manage",
    resource: "blogs-posts",
    action: "manage",
    description: "Manage blogs posts in admin dashboard",
  },
  {
    name: "blogs-posts.create",
    resource: "blogs-posts",
    action: "create",
    description: "Create blogs posts",
  },
  {
    name: "blogs-posts.read",
    resource: "blogs-posts",
    action: "read",
    description: "View blogs posts",
  },
  {
    name: "blogs-posts.update",
    resource: "blogs-posts",
    action: "update",
    description: "Update blogs posts",
  },
  {
    name: "blogs-posts.delete",
    resource: "blogs-posts",
    action: "delete",
    description: "Delete blogs posts",
  },
  {
    name: "blogs-posts.publish",
    resource: "blogs-posts",
    action: "publish",
    description: "Publish blogs posts",
  },

  // Blogs Posts field-level permissions
  {
    name: "blogs-posts.authors.create",
    resource: "blogs-posts.authors",
    action: "create",
    description: "Create blogs posts authors",
  },
  {
    name: "blogs-posts.authors.update",
    resource: "blogs-posts.authors",
    action: "update",
    description: "Update blogs posts authors",
  },
  {
    name: "blogs-posts.status.create",
    resource: "blogs-posts.status",
    action: "create",
    description: "Create blogs posts status",
  },
  {
    name: "blogs-posts.status.update",
    resource: "blogs-posts.status",
    action: "update",
    description: "Update blogs posts status",
  },

  // Comments management permissions
  {
    name: "comments.manage",
    resource: "comments",
    action: "manage",
    description: "Manage comments in admin dashboard",
  },
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
    name: "comments.status.create",
    resource: "comments.status",
    action: "create",
    description: "Create comment status",
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
    name: "comments.user.create",
    resource: "comments.user",
    action: "create",
    description: "Create comment user",
  },
  {
    name: "comments.user.update",
    resource: "comments.user",
    action: "update",
    description: "Update comment user",
  },

  // Diary entries management permissions
  {
    name: "diary-entries.manage",
    resource: "diary-entries",
    action: "manage",
    description: "Manage diary entries in admin dashboard",
  },
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
  {
    name: "diary-entries.publish",
    resource: "diary-entries",
    action: "publish",
    description: "Publish diary entries",
  },

  // Diary entries field-level permissions
  {
    name: "diary-entries.author.create",
    resource: "diary-entries.author",
    action: "create",
    description: "Create diary entry author",
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
    name: "diary-entries.status.create",
    resource: "diary-entries.status",
    action: "create",
    description: "Create diary entry status",
  },
  {
    name: "diary-entries.status.update",
    resource: "diary-entries.status",
    action: "update",
    description: "Update diary entry status",
  },

  // Media management permissions
  {
    name: "media.manage",
    resource: "media",
    action: "manage",
    description: "Manage media in admin dashboard",
  },
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

  // Notifications management permissions
  {
    name: "notifications.manage",
    resource: "notifications",
    action: "manage",
    description: "Manage notifications in admin dashboard",
  },
  {
    name: "notifications.create",
    resource: "notifications",
    action: "create",
    description: "Create notifications",
  },
  {
    name: "notifications.read",
    resource: "notifications",
    action: "read",
    description: "View notifications",
  },
  {
    name: "notifications.update",
    resource: "notifications",
    action: "update",
    description: "Update notifications",
  },
  {
    name: "notifications.delete",
    resource: "notifications",
    action: "delete",
    description: "Delete notifications",
  },

  // Notification subscriptions management permissions
  {
    name: "notification-subscriptions.manage",
    resource: "notification-subscriptions",
    action: "manage",
    description: "Manage notification subscriptions in admin dashboard",
  },
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
    name: "orders.manage",
    resource: "orders",
    action: "manage",
    description: "Manage orders in admin dashboard",
  },
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
    name: "permissions.manage",
    resource: "permissions",
    action: "manage",
    description: "Manage permissions in admin dashboard",
  },
  {
    name: "permissions.create",
    resource: "permissions",
    action: "create",
    description: "Create permissions",
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
    name: "products.manage",
    resource: "products",
    action: "manage",
    description: "Manage products in admin dashboard",
  },
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
    name: "roles.manage",
    resource: "roles",
    action: "manage",
    description: "Manage roles in admin dashboard",
  },
  {
    name: "roles.create",
    resource: "roles",
    action: "create",
    description: "Create roles",
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
    name: "rooms.manage",
    resource: "rooms",
    action: "manage",
    description: "Manage rooms in admin dashboard",
  },
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
    name: "room-contact.manage",
    resource: "room-contact",
    action: "manage",
    description: "Manage room contact in admin dashboard",
  },
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
    name: "room-packages.manage",
    resource: "room-packages",
    action: "manage",
    description: "Manage room packages in admin dashboard",
  },
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
    name: "room-services.manage",
    resource: "room-services",
    action: "manage",
    description: "Manage room services in admin dashboard",
  },
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
    name: "service-categories.manage",
    resource: "service-categories",
    action: "manage",
    description: "Manage service categories in admin dashboard",
  },
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

  // Service categories field-level permissions
  {
    name: "service-categories.system.create",
    resource: "service-categories.system",
    action: "create",
    description: "Create service categories system",
  },
  {
    name: "service-categories.system.read",
    resource: "service-categories.system",
    action: "read",
    description: "View service categories system",
  },
  {
    name: "service-categories.system.update",
    resource: "service-categories.system",
    action: "update",
    description: "Update service categories system",
  },
  {
    name: "service-categories.priority.create",
    resource: "service-categories.priority",
    action: "create",
    description: "Create service categories priority",
  },
  {
    name: "service-categories.priority.read",
    resource: "service-categories.priority",
    action: "read",
    description: "View service categories priority",
  },
  {
    name: "service-categories.priority.update",
    resource: "service-categories.priority",
    action: "update",
    description: "Update service categories priority",
  },

  // Users management permissions
  {
    name: "users.manage",
    resource: "users",
    action: "manage",
    description: "Manage users in admin dashboard",
  },
  {
    name: "users.create",
    resource: "users",
    action: "create",
    description: "Create users",
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

  // Verification tokens email management permissions
  {
    name: "verification-tokens-email.manage",
    resource: "verification-tokens-email",
    action: "manage",
    description: "Manage verification tokens email in admin dashboard",
  },
  {
    name: "verification-tokens-email.create",
    resource: "verification-tokens-email",
    action: "create",
    description: "Create verification tokens email",
  },
  {
    name: "verification-tokens-email.read",
    resource: "verification-tokens-email",
    action: "read",
    description: "View verification tokens email",
  },
  {
    name: "verification-tokens-email.update",
    resource: "verification-tokens-email",
    action: "update",
    description: "Update verification tokens email",
  },
  {
    name: "verification-tokens-email.delete",
    resource: "verification-tokens-email",
    action: "delete",
    description: "Delete verification tokens email",
  },
];

const permissionsRoles: Record<string, string[]> = {
  "admin-user": [
    "achievement-notifications.manage",
    "achievement-notifications.create",
    "achievement-notifications.read",
    "achievement-notifications.update",
    "achievement-notifications.delete",
    "blogs-categories.manage",
    "blogs-categories.create",
    "blogs-categories.read",
    "blogs-categories.update",
    "blogs-categories.delete",
    "blogs-posts.manage",
    "blogs-posts.create",
    "blogs-posts.read",
    "blogs-posts.update",
    "blogs-posts.delete",
    "blogs-posts.publish",
    "blogs-posts.authors.create",
    "blogs-posts.authors.update",
    "blogs-posts.status.create",
    "blogs-posts.status.update",
    "blogs-rooms.manage",
    "blogs-rooms.create",
    "blogs-rooms.read",
    "blogs-rooms.update",
    "blogs-rooms.delete",
    "comments.manage",
    "comments.create",
    "comments.read",
    "comments.update",
    "comments.delete",
    "comments.on.read",
    "comments.on.update",
    "comments.parent.read",
    "comments.parent.update",
    "comments.status.create",
    "comments.status.read",
    "comments.status.update",
    "comments.user.create",
    "comments.user.update",
    "diary-entries.manage",
    "diary-entries.create",
    "diary-entries.read",
    "diary-entries.update",
    "diary-entries.delete",
    "diary-entries.publish",
    "diary-entries.author.create",
    "diary-entries.author.update",
    "diary-entries.isAuthentic.read",
    "diary-entries.isAuthentic.update",
    "diary-entries.status.create",
    "diary-entries.status.update",
    "media.manage",
    "media.create",
    "media.read",
    "media.update",
    "media.delete",
    "notifications.manage",
    "notifications.create",
    "notifications.read",
    "notifications.update",
    "notifications.delete",
    "notification-subscriptions.manage",
    "notification-subscriptions.create",
    "notification-subscriptions.read",
    "notification-subscriptions.update",
    "notification-subscriptions.delete",
    "orders.manage",
    "orders.create",
    "orders.read",
    "orders.update",
    "orders.delete",
    "permissions.manage",
    "permissions.create",
    "permissions.read",
    "permissions.update",
    "permissions.delete",
    "products.manage",
    "products.create",
    "products.read",
    "products.update",
    "products.delete",
    "roles.manage",
    "roles.create",
    "roles.read",
    "roles.update",
    "roles.delete",
    "rooms.manage",
    "rooms.create",
    "rooms.read",
    "rooms.update",
    "rooms.delete",
    "room-contact.manage",
    "room-contact.create",
    "room-contact.read",
    "room-contact.update",
    "room-contact.delete",
    "room-packages.manage",
    "room-packages.create",
    "room-packages.read",
    "room-packages.update",
    "room-packages.delete",
    "room-services.manage",
    "room-services.create",
    "room-services.read",
    "room-services.update",
    "room-services.delete",
    "service-categories.manage",
    "service-categories.create",
    "service-categories.read",
    "service-categories.update",
    "service-categories.delete",
    "service-categories.system.create",
    "service-categories.system.read",
    "service-categories.system.update",
    "service-categories.priority.create",
    "service-categories.priority.read",
    "service-categories.priority.update",
    "users.manage",
    "users.create",
    "users.read",
    "users.update",
    "users.delete",
    "users.previousRole.read",
    "users.previousRole.update",
    "users.roles.read",
    "users.roles.update",
    "verification-tokens-email.manage",
    "verification-tokens-email.create",
    "verification-tokens-email.read",
    "verification-tokens-email.update",
    "verification-tokens-email.delete",
  ],
  "system-user": [
    "achievement-notifications.create",
    "blogs-categories.manage",
    "blogs-categories.create",
    "blogs-posts.manage",
    "blogs-posts.publish",
    "blogs-posts.authors.create",
    "blogs-posts.authors.update",
    "blogs-posts.status.create",
    "blogs-posts.status.update",
    "blogs-rooms.manage",
    "blogs-rooms.create",
    "comments.manage",
    "comments.create",
    "comments.read",
    "comments.update",
    "comments.delete",
    "diary-entries.manage",
    "diary-entries.create",
    "diary-entries.read",
    "diary-entries.update",
    "diary-entries.delete",
    "diary-entries.publish",
    "diary-entries.author.create",
    "diary-entries.isAuthentic.read",
    "diary-entries.isAuthentic.update",
    "diary-entries.status.create",
    "diary-entries.status.update",
    "media.create",
    "notifications.create",
    "orders.create",
    "permissions.read",
    "products.read",
    "roles.read",
    "rooms.manage",
    "rooms.create",
    "room-contact.manage",
    "room-contact.create",
    "room-packages.manage",
    "room-packages.create",
    "room-services.manage",
    "room-services.create",
    "service-categories.manage",
    "service-categories.create",
    "users.roles.read",
    "verification-tokens-email.create",
  ],
  "author-user": [
    "achievement-notifications.create",
    "blogs-posts.manage",
    "blogs-posts.publish",
    "comments.create",
    "diary-entries.manage",
    "diary-entries.create",
    "diary-entries.publish",
    "media.create",
    "notifications.create",
    "orders.create",
    "permissions.read",
    "products.read",
    "roles.read",
    "users.roles.read",
    "verification-tokens-email.create",
  ],
  "website-user": [
    "achievement-notifications.create",
    "comments.create",
    "diary-entries.create",
    "media.create",
    "notifications.create",
    "orders.create",
    "permissions.read",
    "products.read",
    "roles.read",
    "users.roles.read",
    "verification-tokens-email.create",
  ],
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
