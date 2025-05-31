// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      CREATE TABLE IF NOT EXISTS "notification_subscriptions" (
        "id" serial PRIMARY KEY NOT NULL,
        "endpoint" varchar NOT NULL,
        "keys_p256dh" varchar NOT NULL,
        "keys_auth" varchar NOT NULL,
        "user_agent" varchar NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      ALTER TABLE "orders" ALTER COLUMN "ordered_at" SET DEFAULT '5/8/2025, 8:37:59 PM';
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "notification_subscriptions_id" integer;
      
      CREATE UNIQUE INDEX IF NOT EXISTS "notification_subscriptions_endpoint_idx" ON "notification_subscriptions" USING btree ("endpoint");
      CREATE INDEX IF NOT EXISTS "notification_subscriptions_updated_at_idx" ON "notification_subscriptions" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "notification_subscriptions_created_at_idx" ON "notification_subscriptions" USING btree ("created_at");
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notification_subscriptions_fk" FOREIGN KEY ("notification_subscriptions_id") REFERENCES "public"."notification_subscriptions"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_notification_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("notification_subscriptions_id");
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "notification_subscriptions" DISABLE ROW LEVEL SECURITY;
      DROP TABLE "notification_subscriptions" CASCADE;
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_notification_subscriptions_fk";
      DROP INDEX IF EXISTS "payload_locked_documents_rels_notification_subscriptions_id_idx";
      ALTER TABLE "orders" ALTER COLUMN "ordered_at" SET DEFAULT '4/29/2025, 2:34:47 PM';
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "notification_subscriptions_id";
    `,
  );
};
