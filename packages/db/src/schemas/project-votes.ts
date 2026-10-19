import { index, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { voteTypeEnum } from "../constants/enums";
import { projects } from "./projects";
import { users } from "./users";

/**
 * Project Votes: Community upvotes/downvotes cast on projects.
 */
export const projectVotes = pgTable(
  "project_votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    voteType: voteTypeEnum("vote_type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("project_votes_project_user_uq").on(table.projectId, table.userId),
    index("project_votes_project_id_idx").on(table.projectId),
    index("project_votes_user_id_idx").on(table.userId),
  ],
);
