import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projectMemberRoleSchema } from "./project-member-role.js";

describe("ProjectMemberRole Enum", () => {
  it("validates allowed project member roles", () => {
    assert.equal(projectMemberRoleSchema.parse("owner"), "owner");
    assert.equal(projectMemberRoleSchema.parse("maintainer"), "maintainer");
    assert.equal(projectMemberRoleSchema.parse("contributor"), "contributor");
    assert.equal(projectMemberRoleSchema.parse("volunteer"), "volunteer");
  });

  it("rejects invalid member roles", () => {
    assert.throws(() => projectMemberRoleSchema.parse("viewer"));
    assert.throws(() => projectMemberRoleSchema.parse("lead"));
  });
});
