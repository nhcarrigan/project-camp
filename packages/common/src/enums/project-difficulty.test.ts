import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projectDifficultySchema } from "./project-difficulty";

describe("ProjectDifficulty Enum", () => {
  it("validates allowed project difficulties", () => {
    assert.equal(projectDifficultySchema.parse("beginner"), "beginner");
    assert.equal(projectDifficultySchema.parse("intermediate"), "intermediate");
    assert.equal(projectDifficultySchema.parse("advanced"), "advanced");
  });

  it("rejects invalid difficulties", () => {
    assert.throws(() => projectDifficultySchema.parse("easy"));
    assert.throws(() => projectDifficultySchema.parse("expert"));
  });
});
