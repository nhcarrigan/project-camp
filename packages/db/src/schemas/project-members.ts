import { index, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import {
  projectMemberRoleEnum,
  projectMemberStatusEnum,
} from "../constants/enums";
import { projects } from "./projects";
import { users } from "./users";

/**
 * Project Members: Team members, volunteers, and maintainers assigned to a project.
 */
export const projectMembers = pgTable(
  "project_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: projectMemberRoleEnum("role").notNull().default("volunteer"),
    status: projectMemberStatusEnum("status").notNull().default("pending"),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("project_members_project_user_uq").on(table.projectId, table.userId),
    index("project_members_project_id_idx").on(table.projectId),
    index("project_members_user_id_idx").on(table.userId),
  ],
);
