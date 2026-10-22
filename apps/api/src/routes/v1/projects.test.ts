import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import { db } from "@repo/db";
import { buildApp } from "../../app";

process.env.NODE_ENV = "test";

const FAKE_PROJECT = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Project Camp Platform",
  slug: "project-camp-platform",
  description:
    "An open source platform connecting volunteer developers with projects.",
  status: "draft" as const,
  repositoryUrl: "https://github.com/freeCodeCamp/project-camp",
  ownerId: "123e4567-e89b-12d3-a456-426614174001",
  upvotesCount: 42,
  downvotesCount: 2,
  createdAt: new Date("2026-10-18T12:00:00Z"),
  updatedAt: new Date("2026-10-18T12:00:00Z"),
};

describe("v1ProjectRoutes", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it("GET /api/v1/projects returns an array of projects matching projectSchema", async () => {
    mock.method(db.query.projects, "findMany", async () => [FAKE_PROJECT]);

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/projects",
    });

    assert.equal(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body));
    assert.equal(body.length, 1);
    assert.equal(body[0].id, FAKE_PROJECT.id);
    assert.equal(body[0].title, FAKE_PROJECT.title);
    assert.equal(body[0].slug, FAKE_PROJECT.slug);
    assert.equal(body[0].status, FAKE_PROJECT.status);
    assert.equal(body[0].upvotesCount, FAKE_PROJECT.upvotesCount);
  });

  it("GET /api/v1/projects supports page and limit query parameters", async () => {
    let capturedOptions: unknown = null;
    mock.method(db.query.projects, "findMany", async (options?: unknown) => {
      capturedOptions = options;
      return [FAKE_PROJECT];
    });

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/projects?page=2&limit=5",
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(capturedOptions, { limit: 5, offset: 5 });
  });

  it("GET /api/v1/projects/:id returns a single project when found", async () => {
    mock.method(db.query.projects, "findFirst", async () => FAKE_PROJECT);

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/projects/${FAKE_PROJECT.id}`,
    });

    assert.equal(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.equal(body.id, FAKE_PROJECT.id);
    assert.equal(body.title, FAKE_PROJECT.title);
  });

  it("GET /api/v1/projects/:id returns 404 when project does not exist", async () => {
    mock.method(db.query.projects, "findFirst", async () => null);

    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/projects/00000000-0000-0000-0000-000000000000",
    });

    assert.equal(response.statusCode, 404);
    const body = JSON.parse(response.payload);
    assert.equal(body.statusCode, 404);
    assert.equal(body.message, "Project not found");
  });

  it("GET /api/v1/projects/:id returns 400 for invalid UUID format", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/projects/not-a-uuid",
    });

    assert.equal(response.statusCode, 400);
  });
});
