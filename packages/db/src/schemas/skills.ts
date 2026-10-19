import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { skillCategoryEnum } from "../constants/enums";

/**
 * Skills taxonomy used for tagging projects and developer proficiencies.
 */
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  category: skillCategoryEnum("category").notNull(),
  description: varchar("description", { length: 300 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
