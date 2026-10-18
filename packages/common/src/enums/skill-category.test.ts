import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skillCategorySchema } from "./skill-category.js";

describe("SkillCategory Enum", () => {
  it("validates allowed skill categories", () => {
    assert.equal(skillCategorySchema.parse("frontend"), "frontend");
    assert.equal(skillCategorySchema.parse("backend"), "backend");
    assert.equal(skillCategorySchema.parse("devops"), "devops");
    assert.equal(skillCategorySchema.parse("database"), "database");
    assert.equal(skillCategorySchema.parse("mobile"), "mobile");
    assert.equal(skillCategorySchema.parse("ai_ml"), "ai_ml");
    assert.equal(skillCategorySchema.parse("design"), "design");
    assert.equal(skillCategorySchema.parse("other"), "other");
  });

  it("rejects invalid categories", () => {
    assert.throws(() => skillCategorySchema.parse("blockchain"));
    assert.throws(() => skillCategorySchema.parse("sysadmin"));
  });
});
