import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  insertProjectMemberSchema,
  projectMemberSchema,
  updateProjectMemberSchema,
} from "./project-members.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Project Members Schema", () => {
  it("validates projectMemberSchema and updateProjectMemberSchema", () => {
    const valid = {
      id: VALID_UUID,
      projectId: VALID_UUID,
      userId: VALID_UUID,
      role: "volunteer" as const,
      status: "accepted" as const,
      joinedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const parsed = projectMemberSchema.parse(valid);
    assert.equal(parsed.status, "accepted");

    const updated = updateProjectMemberSchema.parse({
      role: "maintainer",
    });
    assert.equal(updated.role, "maintainer");

    const insertPayload = insertProjectMemberSchema.parse({
      projectId: VALID_UUID,
      userId: VALID_UUID,
    });
    assert.equal(insertPayload.role, "volunteer");
    assert.equal(insertPayload.status, "pending");
  });
});
