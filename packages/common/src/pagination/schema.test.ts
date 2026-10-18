import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { paginationQuerySchema } from "./schema.js";

describe("Pagination Schema", () => {
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

  it("rejects invalid page and limit bounds", () => {
    assert.throws(() => paginationQuerySchema.parse({ page: 0 }));
    assert.throws(() => paginationQuerySchema.parse({ limit: 101 }));
  });
});
