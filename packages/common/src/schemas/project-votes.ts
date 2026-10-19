import { z } from "zod";
import { voteTypeSchema } from "../enums/index";

/**
 * Zod validation schema representing a community vote cast on a project.
 */
export const projectVoteSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: voteTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Project vote model representing a community member's vote on a project proposal.
 */
export type ProjectVote = z.infer<typeof projectVoteSchema>;

/**
 * Zod validation schema for inserting a vote record.
 */
export const insertProjectVoteSchema = projectVoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Payload required to insert a vote record.
 */
export type InsertProjectVote = z.infer<typeof insertProjectVoteSchema>;

/**
 * Zod validation schema for a user casting a vote from the frontend or API.
 */
export const castVoteSchema = z.object({
  projectId: z.string().uuid(),
  voteType: voteTypeSchema,
});

/**
 * Payload required to cast or toggle a project vote.
 */
export type CastVote = z.infer<typeof castVoteSchema>;
