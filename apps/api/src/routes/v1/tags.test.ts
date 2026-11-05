import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import { buildApp } from "../../app";
import { tagRepository } from "./tags";

process.env.NODE_ENV = "test";

const FAKE_TAG = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "TypeScript",
  slug: "typescript",
  category: "language",
  projectCount: 24,
};

describe("v1TagRoutes", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it("GET /api/v1/tags returns tags array with 200 status", async () => {
    mock.method(tagRepository, "findTags", async () => [FAKE_TAG]);

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags",
    });

    assert.equal(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(body.tags);
    assert.ok(Array.isArray(body.tags));
    assert.equal(body.tags.length, 1);
    assert.equal(body.tags[0].id, FAKE_TAG.id);
    assert.equal(body.tags[0].name, FAKE_TAG.name);
    assert.equal(body.tags[0].slug, FAKE_TAG.slug);
    assert.equal(body.tags[0].category, FAKE_TAG.category);
    assert.equal(body.tags[0].projectCount, FAKE_TAG.projectCount);
  });

  it("GET /api/v1/tags applies default limit 50 when omitted", async () => {
    let capturedOptions: unknown = null;
    mock.method(tagRepository, "findTags", async (options: unknown) => {
      capturedOptions = options;
      return [FAKE_TAG];
    });

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags",
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(capturedOptions, {
      category: undefined,
      q: undefined,
      limit: 50,
    });
  });

  it("GET /api/v1/tags normalizes category and passes q and limit query parameters", async () => {
    let capturedOptions: unknown = null;
    mock.method(tagRepository, "findTags", async (options: unknown) => {
      capturedOptions = options;
      return [FAKE_TAG];
    });

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags?category=Language&q=type&limit=25",
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(capturedOptions, {
      category: "language",
      q: "type",
      limit: 25,
    });
  });

  it("GET /api/v1/tags treats empty q string as undefined", async () => {
    let capturedOptions: unknown = null;
    mock.method(tagRepository, "findTags", async (options: unknown) => {
      capturedOptions = options;
      return [FAKE_TAG];
    });

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags?q=",
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(capturedOptions, {
      category: undefined,
      q: undefined,
      limit: 50,
    });
  });

  it("GET /api/v1/tags returns 400 when limit exceeds 100", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags?limit=101",
    });

    assert.equal(response.statusCode, 400);
  });

  it("GET /api/v1/tags returns 400 when limit is 0 or negative", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/tags?limit=0",
    });

    assert.equal(response.statusCode, 400);
  });

  it("escapes LIKE wildcards in prefix search and uses direct column comparison for category", () => {
    const { sql, params } = tagRepository
      .buildFindTagsQuery({
        category: "Language",
        q: "100%_ts",
        limit: 10,
      })
      .toSQL();

    assert.ok(
      sql.includes('"skills"."category" = $1'),
      `Expected direct indexed column comparison, got: ${sql}`,
    );
    assert.ok(!sql.includes("lower("));
    assert.deepEqual(params, ["language", "100\\%\\_ts%", "100\\%\\_ts%", 10]);
  });
});
