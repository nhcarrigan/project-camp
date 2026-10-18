import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createMilestoneSchema,
  projectMilestoneSchema,
  updateMilestoneSchema,
} from "./project-milestones.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Project Milestones Schema", () => {
  it("validates projectMilestoneSchema and createMilestoneSchema", () => {
    const validCreate = {
      projectId: VALID_UUID,
      title: "Sprint 1: Architecture & Data Modeling",
      description: "Initial data schemas and authentication setup",
      status: "in_progress" as const,
      order: 1,
    };
    const created = createMilestoneSchema.parse(validCreate);
    assert.equal(created.order, 1);
    assert.equal(created.status, "in_progress");

    const full = projectMilestoneSchema.parse({
      id: VALID_UUID,
      ...validCreate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    assert.equal(full.id, VALID_UUID);
    assert.ok(full.createdAt instanceof Date);
  });

  it("validates updateMilestoneSchema", () => {
    const updated = updateMilestoneSchema.parse({
      status: "completed",
    });
    assert.equal(updated.status, "completed");
  });
});
