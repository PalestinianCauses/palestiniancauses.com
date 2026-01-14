// REVIEWED - 02

import { payload } from "@/lib/payload";

export const doCleaningPreviousRoles =
  async function doCleaningPreviousRoles() {
    try {
      // eslint-disable-next-line no-console
      console.log("🧹 Starting cleaning up of previous roles field...");

      const users = await payload.find({
        collection: "users",
        where: { roles: { exists: true } },
        limit: 1000,
      });

      // eslint-disable-next-line no-console
      console.log(`📊 Found ${users.docs.length} users with roles assigned.`);

      const usersWithoutRoles = await payload.find({
        collection: "users",
        where: { roles: { exists: false } },
        limit: 1000,
      });

      if (usersWithoutRoles.docs.length > 0) {
        // eslint-disable-next-line no-console
        console.log(
          `⚠️  Found ${usersWithoutRoles.docs.length} users without roles:`,
        );

        usersWithoutRoles.docs.forEach((user) => {
          // eslint-disable-next-line no-console
          console.log(` - ${user.email} (ID: ${user.id})`);
        });

        // eslint-disable-next-line no-console
        console.log(
          "❌ Can not proceed with cleaning up. Please assign roles to these users first.",
        );

        process.exit(1);
      }

      // eslint-disable-next-line no-console
      console.log(
        "✅ Every user has roles assigned. Safe to remove previous roles field.",
      );

      // eslint-disable-next-line no-console
      console.log("\n📝 Manual steps required:");

      // eslint-disable-next-line no-console
      console.log(
        "1. Remove 'previousRole' field from `Users` collection in your schema",
      );

      // eslint-disable-next-line no-console
      console.log("2. Run 'pnpm run payload:types' to update TypeScript types");

      // eslint-disable-next-line no-console
      console.log("3. Remove this cleaning up script after completion");

      // eslint-disable-next-line no-console
      console.log("\n🎉 Cleaning up verification completed successfully!");
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("❌ Cleaning up verification failed:", error);
      process.exit(1);
    }
  };

doCleaningPreviousRoles();
