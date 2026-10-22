import { z } from "zod";

/**
 * Zod validation schema representing community voting types (upvote or downvote).
 */
export const voteTypeSchema = z.enum(["upvote", "downvote"]);

/**
 * Community voting type.
 */
export type VoteType = z.infer<typeof voteTypeSchema>;
