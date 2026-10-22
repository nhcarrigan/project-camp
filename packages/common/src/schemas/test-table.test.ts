import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { insertTestTableSchema, testTableSchema } from "./test-table";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Legacy Test Table Schema", () => {
  it("validates testTableSchema matching db schema", () => {
    const valid = {
      id: VALID_UUID,
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
