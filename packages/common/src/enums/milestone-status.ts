import { z } from "zod";

/**
 * Zod validation schema representing progress states for time-boxed project milestones.
 */
export const milestoneStatusSchema = z.enum([
  "pending",
  "in_progress",
  "completed",
  "blocked",
]);

/**
 * Project milestone progress state type.
 */
export type MilestoneStatus = z.infer<typeof milestoneStatusSchema>;
