import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "comments" ADD COLUMN "votes_score" numeric DEFAULT 0;
      CREATE INDEX IF NOT EXISTS "comments_status_idx" ON "comments" USING btree ("status");
      CREATE INDEX IF NOT EXISTS "comments_votes_score_idx" ON "comments" USING btree ("votes_score");
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      DROP INDEX IF EXISTS "comments_status_idx";
      DROP INDEX IF EXISTS "comments_votes_score_idx";
      ALTER TABLE "comments" DROP COLUMN IF EXISTS "votes_score";
    `,
  );
};
