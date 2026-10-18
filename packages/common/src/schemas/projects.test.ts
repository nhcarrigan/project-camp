import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createProjectSchema,
  projectFilterQuerySchema,
  updateProjectSchema,
} from "./projects.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Projects Schema", () => {
  it("validates createProjectSchema", () => {
    const valid = {
      title: "Project Camp Platform",
      description: "Open source community contribution platform",
      difficulty: "intermediate" as const,
      repositoryUrl: "https://github.com/freeCodeCamp/project-camp",
      skillIds: [VALID_UUID],
    };
    const parsed = createProjectSchema.parse(valid);
    assert.equal(parsed.title, "Project Camp Platform");
    assert.equal(parsed.skillIds.length, 1);

    assert.throws(() =>
      createProjectSchema.parse({
        ...valid,
        skillIds: [],
      }),
    );
  });

  it("validates projectFilterQuerySchema with pagination coercion", () => {
    const parsed = projectFilterQuerySchema.parse({
      page: "3",
      limit: "15",
      status: "voting",
      difficulty: "beginner",
      search: "nextjs",
    });
    assert.equal(parsed.page, 3);
    assert.equal(parsed.limit, 15);
    assert.equal(parsed.status, "voting");
    assert.equal(parsed.difficulty, "beginner");
    assert.equal(parsed.search, "nextjs");
  });

  it("validates updateProjectSchema", () => {
    const parsed = updateProjectSchema.parse({
      status: "in_development",
    });
    assert.equal(parsed.status, "in_development");
  });
});
