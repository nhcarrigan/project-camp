import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { milestoneStatusSchema } from "./milestone-status";

describe("MilestoneStatus Enum", () => {
  it("validates allowed milestone statuses", () => {
    assert.equal(milestoneStatusSchema.parse("pending"), "pending");
    assert.equal(milestoneStatusSchema.parse("in_progress"), "in_progress");
    assert.equal(milestoneStatusSchema.parse("completed"), "completed");
    assert.equal(milestoneStatusSchema.parse("blocked"), "blocked");
  });

  it("rejects invalid milestone statuses", () => {
    assert.throws(() => milestoneStatusSchema.parse("started"));
    assert.throws(() => milestoneStatusSchema.parse("done"));
  });
});
