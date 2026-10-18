import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { insertSkillSchema, skillSchema } from "./skills.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Skills Schema", () => {
  it("validates skillSchema and insertSkillSchema", () => {
    const valid = {
      name: "TypeScript",
      slug: "typescript",
      category: "frontend" as const,
      description: "Typed JavaScript",
    };
    const parsed = insertSkillSchema.parse(valid);
    assert.equal(parsed.slug, "typescript");

    const fullSkill = skillSchema.parse({
      id: VALID_UUID,
      ...valid,
      createdAt: new Date().toISOString(),
    });
    assert.equal(fullSkill.id, VALID_UUID);
    assert.ok(fullSkill.createdAt instanceof Date);
  });
});
