// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      DROP INDEX IF EXISTS "users_frappe_user_id_idx";
      ALTER TABLE "users" DROP COLUMN IF EXISTS "frappe_user_id";
      ALTER TABLE "users" DROP COLUMN IF EXISTS "frappe_user_role";
      ALTER TABLE "users" DROP COLUMN IF EXISTS "is_synced_with_frappe";
      ALTER TABLE "public"."diary_entries" ALTER COLUMN "status" DROP DEFAULT;
      ALTER TABLE "public"."diary_entries" ALTER COLUMN "status" SET DATA TYPE text;
      DROP TYPE IF EXISTS "public"."enum_diary_entries_status";
      CREATE TYPE "public"."enum_diary_entries_status" AS ENUM('pending', 'rejected', 'approved', 'archived');
      ALTER TABLE "public"."diary_entries" ALTER COLUMN "status" SET DATA TYPE "public"."enum_diary_entries_status" USING "status"::"public"."enum_diary_entries_status";
      ALTER TABLE "public"."diary_entries" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."enum_diary_entries_status";
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TYPE "public"."enum_diary_entries_status" ADD VALUE 'published' BEFORE 'archived';
      ALTER TABLE "users" ADD COLUMN "frappe_user_id" varchar NOT NULL;
      ALTER TABLE "users" ADD COLUMN "frappe_user_role" varchar NOT NULL;
      ALTER TABLE "users" ADD COLUMN "is_synced_with_frappe" boolean DEFAULT false;
      CREATE UNIQUE INDEX IF NOT EXISTS "users_frappe_user_id_idx" ON "users" USING btree ("frappe_user_id");
    `,
  );
};
