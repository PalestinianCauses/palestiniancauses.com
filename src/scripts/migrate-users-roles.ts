// REVIEWED - 04

import { payload } from "@/lib/payload";

const mappingRoles = {
  "admin": "admin-user",
  "system-user": "system-user",
  "website-user": "website-user",
};

const DEFAULT_ROLE = "website-user";

export const doMigratingUsersRoles = async function doMigratingUsersRoles() {
  try {
    // eslint-disable-next-line no-console
    console.log("🚀 Starting users roles migration...");

    const users = await payload.find({
      collection: "users",
      where: { previousRole: { exists: true } },
      limit: 1000,
      sort: "createdAt",
    });

    // eslint-disable-next-line no-console
    console.log(`📊 Found ${users.docs.length} users to migrate.`);

    if (users.docs.length === 0) {
      // eslint-disable-next-line no-console
      console.log("✅ No users to migrate.");
      process.exit(0);
    }

    const roles = await payload.find({
      collection: "roles",
      limit: 1000,
    });

    const map = new Map();
    roles.docs.forEach((role) => {
      map.set(role.name, role.id);
    });

    // eslint-disable-next-line no-console
    console.log("📋 Available roles:", Array.from(map.keys()));

    let migrateCount = 0;
    let errorCount = 0;

    for (let i = 0; i < users.docs.length; i += 1) {
      const user = users.docs[i];

      try {
        const { previousRole } = user;

        let newRoleName: string;

        if (!previousRole) {
          // eslint-disable-next-line no-console
          console.log(
            `⚠️  User ${user.email} has no previous role, assigning default role "${DEFAULT_ROLE}".`,
          );

          newRoleName = DEFAULT_ROLE;
        } else {
          newRoleName = mappingRoles[previousRole];

          if (!newRoleName) {
            // eslint-disable-next-line no-console
            console.log(
              `⚠️  Un-known role "${previousRole}" for user ${user.email}, assigning default role "${DEFAULT_ROLE}".`,
            );

            newRoleName = DEFAULT_ROLE;
          }
        }

        const newRoleId = map.get(newRoleName);

        if (!newRoleId) {
          // eslint-disable-next-line no-console
          console.error(
            `❌ Role "${newRoleName}" not found in database for user ${user.email}, can not assign default role.`,
          );

          errorCount += 1;
          // eslint-disable-next-line no-continue
          continue;
        }

        const existingRoles = user.roles || [];
        const hasExistingRoles = existingRoles.length > 0;

        let rolesToAssign = [newRoleId];

        if (hasExistingRoles) {
          const existingRoleIds = existingRoles.map((role) =>
            typeof role === "object" ? role.id : role,
          );

          rolesToAssign = [...new Set([...existingRoleIds, newRoleId])];

          // eslint-disable-next-line no-console
          console.log(
            `🔄 User ${user.email} already has roles, merging with ${previousRole || "none"} → ${newRoleName}`,
          );
        }

        // Update user with new role relationship
        // eslint-disable-next-line no-await-in-loop
        await payload.update({
          collection: "users",
          id: user.id,
          data: { roles: rolesToAssign },
        });

        // eslint-disable-next-line no-console
        console.log(
          `✅ Migrated user ${user.email}: ${previousRole || "none"} → ${newRoleName}.`,
        );

        migrateCount += 1;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`❌ Error migrating user ${user.email}:`, error);
        errorCount += 1;
      }
    }

    // eslint-disable-next-line no-console
    console.log(`🎉 Migration completed!`);
    // eslint-disable-next-line no-console
    console.log(`✅ Successfully migrated: ${migrateCount} users.`);
    // eslint-disable-next-line no-console
    console.log(`❌ Errors: ${errorCount} users.`);

    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

doMigratingUsersRoles();
