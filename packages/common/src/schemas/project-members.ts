import { z } from "zod";
import {
  projectMemberRoleSchema,
  projectMemberStatusSchema,
} from "../enums/index.js";

/**
 * Zod validation schema representing a team member or volunteer associated with a project.
 */
export const projectMemberSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  role: projectMemberRoleSchema.default("volunteer"),
  status: projectMemberStatusSchema.default("pending"),
  joinedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Project member model representing a contributor, volunteer, or maintainer on a project.
 */
export type ProjectMember = z.infer<typeof projectMemberSchema>;

/**
 * Zod validation schema for adding a member or applying to join a project.
 */
export const insertProjectMemberSchema = projectMemberSchema.omit({
  id: true,
  joinedAt: true,
  updatedAt: true,
});

/**
 * Payload required to insert a project member application or assignment.
 */
export type InsertProjectMember = z.infer<typeof insertProjectMemberSchema>;

/**
 * Zod validation schema for updating a project member's status or role.
 */
export const updateProjectMemberSchema = z.object({
  role: projectMemberRoleSchema.optional(),
  status: projectMemberStatusSchema.optional(),
});

/**
 * Payload required to update a project member's role or status.
 */
export type UpdateProjectMember = z.infer<typeof updateProjectMemberSchema>;
