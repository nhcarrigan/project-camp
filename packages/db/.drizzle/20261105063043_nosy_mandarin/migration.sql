ALTER TABLE "skills" ALTER COLUMN "category" SET DATA TYPE varchar(50) USING "category"::varchar(50);--> statement-breakpoint
CREATE INDEX "skills_category_idx" ON "skills" ("category");--> statement-breakpoint
DROP TYPE "skill_category";