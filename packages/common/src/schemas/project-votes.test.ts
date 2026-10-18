import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  castVoteSchema,
  insertProjectVoteSchema,
  projectVoteSchema,
} from "./project-votes.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Project Votes Schema", () => {
  it("validates castVoteSchema", () => {
    const valid = {
      projectId: VALID_UUID,
      voteType: "upvote" as const,
    };
    const parsed = castVoteSchema.parse(valid);
    assert.equal(parsed.voteType, "upvote");

    assert.throws(() =>
      castVoteSchema.parse({
        projectId: VALID_UUID,
        voteType: "sidevote",
      }),
    );
  });

  it("validates projectVoteSchema and insertProjectVoteSchema", () => {
    const fullVote = projectVoteSchema.parse({
      id: VALID_UUID,
      userId: VALID_UUID,
      projectId: VALID_UUID,
      voteType: "downvote",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    assert.equal(fullVote.voteType, "downvote");

    const insertPayload = insertProjectVoteSchema.parse({
      projectId: VALID_UUID,
      userId: VALID_UUID,
      voteType: "upvote",
    });
    assert.equal(insertPayload.voteType, "upvote");
  });
});
