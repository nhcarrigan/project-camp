import { z } from "zod";

/**
 * Zod validation schema representing functional roles assigned to project team members.
 */
export const projectMemberRoleSchema = z.enum([
  "owner",
  "maintainer",
  "contributor",
  "volunteer",
]);

/**
 * Project team member functional role type.
 */
export type ProjectMemberRole = z.infer<typeof projectMemberRoleSchema>;
