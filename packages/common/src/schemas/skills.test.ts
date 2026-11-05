import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  insertSkillSchema,
  skillSchema,
  tagItemSchema,
  tagsQuerySchema,
  tagsResponseSchema,
} from "./skills";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Skills & Tags Schemas", () => {
  it("validates a complete skill entity", () => {
    const valid = {
      id: VALID_UUID,
      name: "TypeScript",
      slug: "typescript",
      category: "language",
      description: "Typed JavaScript at Any Scale",
      createdAt: new Date().toISOString(),
    };
    const parsed = skillSchema.parse(valid);
    assert.equal(parsed.name, "TypeScript");
    assert.equal(parsed.category, "language");
    assert.ok(parsed.createdAt instanceof Date);
  });

  it("validates insertSkillSchema omitting generated fields", () => {
    const valid = {
      name: "Next.js",
      slug: "nextjs",
      category: "framework",
      description: "The React Framework for the Web",
    };
    const parsed = insertSkillSchema.parse(valid);
    assert.equal(parsed.slug, "nextjs");
  });

  it("validates tagItemSchema with projectCount", () => {
    const valid = {
      id: VALID_UUID,
      name: "PostgreSQL",
      slug: "postgresql",
      category: "database",
      projectCount: 42,
    };
    const parsed = tagItemSchema.parse(valid);
    assert.equal(parsed.projectCount, 42);
    assert.equal(parsed.name, "PostgreSQL");

    assert.throws(() =>
      tagItemSchema.parse({
        ...valid,
        projectCount: -1,
      }),
    );
  });

  it("validates tagsQuerySchema defaults and bounds", () => {
    const emptyQuery = tagsQuerySchema.parse({});
    assert.equal(emptyQuery.limit, 50);
    assert.equal(emptyQuery.category, undefined);
    assert.equal(emptyQuery.q, undefined);

    const fullQuery = tagsQuerySchema.parse({
      category: "tool",
      q: "doc",
      limit: "25",
    });
    assert.equal(fullQuery.category, "tool");
    assert.equal(fullQuery.q, "doc");
    assert.equal(fullQuery.limit, 25);

    // Rejects limit over 100
    assert.throws(() =>
      tagsQuerySchema.parse({
        limit: 101,
      }),
    );

    // Rejects non-positive limit
    assert.throws(() =>
      tagsQuerySchema.parse({
        limit: 0,
      }),
    );

    // Rejects empty search string q
    assert.throws(() =>
      tagsQuerySchema.parse({
        q: "",
      }),
    );
  });

  it("validates tagsResponseSchema", () => {
    const responsePayload = {
      tags: [
        {
          id: VALID_UUID,
          name: "Docker",
          slug: "docker",
          category: "devops",
          projectCount: 10,
        },
      ],
    };
    const parsed = tagsResponseSchema.parse(responsePayload);
    assert.equal(parsed.tags.length, 1);
    assert.equal(parsed.tags[0]?.slug, "docker");
  });
});
