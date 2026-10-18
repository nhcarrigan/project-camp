import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  milestoneStatusSchema,
  projectDifficultySchema,
  projectMemberRoleSchema,
  projectMemberStatusSchema,
  projectStatusSchema,
  skillCategorySchema,
  userRoleSchema,
  voteTypeSchema,
} from "./index.js";

describe("Enums", () => {
  it("validates valid enum values", () => {
    assert.equal(userRoleSchema.parse("admin"), "admin");
    assert.equal(projectStatusSchema.parse("proposal"), "proposal");
    assert.equal(projectDifficultySchema.parse("intermediate"), "intermediate");
    assert.equal(voteTypeSchema.parse("upvote"), "upvote");
    assert.equal(skillCategorySchema.parse("frontend"), "frontend");
    assert.equal(projectMemberRoleSchema.parse("volunteer"), "volunteer");
    assert.equal(projectMemberStatusSchema.parse("pending"), "pending");
    assert.equal(milestoneStatusSchema.parse("in_progress"), "in_progress");
  });

  it("rejects invalid enum values", () => {
    assert.throws(() => userRoleSchema.parse("superadmin"));
    assert.throws(() => projectStatusSchema.parse("unknown"));
    assert.throws(() => projectDifficultySchema.parse("expert"));
    assert.throws(() => voteTypeSchema.parse("abstain"));
    assert.throws(() => skillCategorySchema.parse("hardware"));
  });
});
