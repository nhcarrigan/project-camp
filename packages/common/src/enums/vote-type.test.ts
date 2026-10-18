import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { voteTypeSchema } from "./vote-type.js";

describe("VoteType Enum", () => {
  it("validates upvote and downvote", () => {
    assert.equal(voteTypeSchema.parse("upvote"), "upvote");
    assert.equal(voteTypeSchema.parse("downvote"), "downvote");
  });

  it("rejects invalid vote types", () => {
    assert.throws(() => voteTypeSchema.parse("neutral"));
    assert.throws(() => voteTypeSchema.parse("like"));
  });
});
