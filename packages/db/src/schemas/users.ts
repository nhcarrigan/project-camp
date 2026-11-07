import { integer, pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { userRoleEnum } from "../constants/enums";

/**
 * Users table storing user accounts and profile details.
 */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: userRoleEnum("role").notNull().default("member"),
  bio: text("bio"),
  githubUsername: text("github_username"),
  website: text("website"),
  reputationScore: integer("reputation_score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
