import { index, pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

/**
 * Skills taxonomy used for tagging projects and developer proficiencies.
 */
export const skills = pgTable(
  "skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("skills_category_idx").on(table.category)],
);
