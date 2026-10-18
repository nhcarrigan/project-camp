import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { userRoleSchema } from "./user-role.js";

describe("UserRole Enum", () => {
  it("validates allowed user roles", () => {
    assert.equal(userRoleSchema.parse("admin"), "admin");
    assert.equal(userRoleSchema.parse("member"), "member");
    assert.equal(userRoleSchema.parse("volunteer"), "volunteer");
    assert.equal(userRoleSchema.parse("contributor"), "contributor");
    assert.equal(userRoleSchema.parse("maintainer"), "maintainer");
  });

  it("rejects invalid user roles", () => {
    assert.throws(() => userRoleSchema.parse("superadmin"));
    assert.throws(() => userRoleSchema.parse("guest"));
  });
});
