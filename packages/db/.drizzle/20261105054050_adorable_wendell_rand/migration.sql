ALTER TABLE "skills" ALTER COLUMN "category" SET DATA TYPE text USING "category"::text;--> statement-breakpoint
CREATE INDEX "skills_category_idx" ON "skills" ("category");