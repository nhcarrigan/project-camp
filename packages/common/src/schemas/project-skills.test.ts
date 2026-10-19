import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { insertProjectSkillSchema, projectSkillSchema } from "./project-skills";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Project Skills Schema", () => {
  it("validates projectSkillSchema and insertProjectSkillSchema", () => {
    const valid = {
      projectId: VALID_UUID,
      skillId: VALID_UUID,
      createdAt: new Date().toISOString(),
    };
    const parsed = projectSkillSchema.parse(valid);
    assert.equal(parsed.projectId, VALID_UUID);
    assert.ok(parsed.createdAt instanceof Date);

    const insertPayload = insertProjectSkillSchema.parse({
      projectId: VALID_UUID,
      skillId: VALID_UUID,
    });
    assert.equal(insertPayload.projectId, VALID_UUID);
  });
});
