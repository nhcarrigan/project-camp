import { z } from "zod";

/**
 * Zod validation schema representing membership and application status for a project member.
 */
export const projectMemberStatusSchema = z.enum([
  "pending",
  "accepted",
  "rejected",
  "left",
]);

/**
 * Project membership status type.
 */
export type ProjectMemberStatus = z.infer<typeof projectMemberStatusSchema>;
