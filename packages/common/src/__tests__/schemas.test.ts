import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  paginationQuerySchema,
  testTableSchema,
  insertTestTableSchema,
} from "../schemas/index.js";

describe("Schemas", () => {
  it("validates pagination query schema with coercion and defaults", () => {
    const parsed = paginationQuerySchema.parse({
      page: "2",
      limit: "50",
    });
    assert.equal(parsed.page, 2);
    assert.equal(parsed.limit, 50);

    const defaults = paginationQuerySchema.parse({});
    assert.equal(defaults.page, 1);
    assert.equal(defaults.limit, 20);
  });

  it("validates testTableSchema matching db schema", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John",
      lastName: "Doe",
      createdAt: new Date().toISOString(),
    };
    const parsed = testTableSchema.parse(valid);
    assert.equal(parsed.name, "John");
    assert.equal(parsed.lastName, "Doe");
    assert.ok(parsed.createdAt instanceof Date);

    assert.throws(() =>
      testTableSchema.parse({
        id: "invalid-id",
        name: "",
        lastName: "Doe",
        createdAt: new Date(),
      }),
    );
  });

  it("validates insertTestTableSchema", () => {
    const valid = {
      name: "Jane",
      lastName: "Smith",
    };
    const parsed = insertTestTableSchema.parse(valid);
    assert.equal(parsed.name, "Jane");
    assert.equal(parsed.lastName, "Smith");

    assert.throws(() =>
      insertTestTableSchema.parse({
        name: "",
        lastName: "Smith",
      }),
    );
  });
});
