// REVIEWED

import { payload } from "@/lib/payload";

export const doCleaningPreviousRoles =
  async function doCleaningPreviousRoles() {
    try {
      console.log("🧹 Starting cleaning up of previous roles field...");

      const users = await payload.find({
        collection: "users",
        where: { roles: { exists: true } },
        limit: 1000,
      });

      console.log(`📊 Found ${users.docs.length} users with roles assigned.`);

      const usersWithoutRoles = await payload.find({
        collection: "users",
        where: { roles: { exists: false } },
        limit: 1000,
      });

      if (usersWithoutRoles.docs.length > 0) {
        console.log(
          `⚠️  Found ${usersWithoutRoles.docs.length} users without roles:`,
        );

        usersWithoutRoles.docs.forEach((user) => {
          console.log(` - ${user.email} (ID: ${user.id})`);
        });

        console.log(
          "❌ Can not proceed with cleaning up. Please assign roles to these users first.",
        );

        return;
      }

      console.log(
        "✅ Every user has roles assigned. Safe to remove previous roles field.",
      );

      console.log("\n📝 Manual steps required:");

      console.log(
        "1. Remove 'previousRole' field from `Users` collection in your schema",
      );

      console.log("2. Run 'pnpm run payload:types' to update TypeScript types");

      console.log("3. Remove this cleaning up script after completion");

      console.log("\n🎉 Cleaning up verification completed successfully!");
    } catch (error) {
      console.error("❌ Cleaning up verification failed:", error);
      throw error;
    }
  };

if (require.main === module) {
  doCleaningPreviousRoles()
    .then(() => {
      console.log("Cleaning up verification completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Cleaning up verification failed:", error);
      process.exit(1);
    });
}
