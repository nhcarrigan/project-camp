import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projectStatusSchema } from "./project-status.js";

describe("ProjectStatus Enum", () => {
  it("validates allowed project statuses", () => {
    assert.equal(projectStatusSchema.parse("draft"), "draft");
    assert.equal(projectStatusSchema.parse("proposal"), "proposal");
    assert.equal(projectStatusSchema.parse("voting"), "voting");
    assert.equal(projectStatusSchema.parse("in_development"), "in_development");
    assert.equal(projectStatusSchema.parse("completed"), "completed");
    assert.equal(projectStatusSchema.parse("archived"), "archived");
  });

  it("rejects invalid project statuses", () => {
    assert.throws(() => projectStatusSchema.parse("cancelled"));
    assert.throws(() => projectStatusSchema.parse("in_review"));
  });
});
