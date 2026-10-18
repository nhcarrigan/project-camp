import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { projectDifficultyEnum, projectStatusEnum } from "../constants/enums";
import { users } from "./users";

/**
 * Projects table representing proposed, ongoing, or completed projects.
 */
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description").notNull(),
    status: projectStatusEnum("status").notNull().default("draft"),
    difficulty: projectDifficultyEnum("difficulty")
      .notNull()
      .default("intermediate"),
    repositoryUrl: text("repository_url"),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    upvotesCount: integer("upvotes_count").notNull().default(0),
    downvotesCount: integer("downvotes_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("projects_owner_id_idx").on(table.ownerId),
    index("projects_status_idx").on(table.status),
    index("projects_difficulty_idx").on(table.difficulty),
  ],
);
