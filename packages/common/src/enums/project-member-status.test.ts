import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projectMemberStatusSchema } from "./project-member-status.js";

describe("ProjectMemberStatus Enum", () => {
  it("validates allowed project member statuses", () => {
    assert.equal(projectMemberStatusSchema.parse("pending"), "pending");
    assert.equal(projectMemberStatusSchema.parse("accepted"), "accepted");
    assert.equal(projectMemberStatusSchema.parse("rejected"), "rejected");
    assert.equal(projectMemberStatusSchema.parse("left"), "left");
  });

  it("rejects invalid member statuses", () => {
    assert.throws(() => projectMemberStatusSchema.parse("invited"));
    assert.throws(() => projectMemberStatusSchema.parse("active"));
  });
});
