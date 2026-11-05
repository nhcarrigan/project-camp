import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/**
 * Skills taxonomy used for tagging projects and developer proficiencies.
 */
export const skills = pgTable(
  "skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    category: varchar("category", { length: 50 }).notNull(),
    description: varchar("description", { length: 300 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("skills_category_idx").on(table.category)],
);
