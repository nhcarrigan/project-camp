import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Legacy test table preserved for backward compatibility.
 * @deprecated
 */
export const testTable = pgTable("test_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
