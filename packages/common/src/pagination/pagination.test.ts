import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculatePagination,
  createPaginatedResult,
  getPaginationOffset,
} from "./pagination";

describe("Pagination Logic", () => {
  it("calculates pagination metadata correctly", () => {
    const meta = calculatePagination({ totalItems: 95, page: 1, pageSize: 20 });
    assert.deepEqual(meta, {
      page: 1,
      pageSize: 20,
      total: 95,
      totalPages: 5,
      hasNextPage: true,
      hasPrevPage: false,
    });

    const lastPage = calculatePagination({
      totalItems: 95,
      page: 5,
      pageSize: 20,
    });
    assert.equal(lastPage.hasNextPage, false);
    assert.equal(lastPage.hasPrevPage, true);

    const empty = calculatePagination({ totalItems: 0, page: 1, pageSize: 20 });
    assert.equal(empty.totalPages, 0);
    assert.equal(empty.hasNextPage, false);
    assert.equal(empty.hasPrevPage, false);
  });

  it("calculates correct offset", () => {
    assert.equal(getPaginationOffset(1, 20), 0);
    assert.equal(getPaginationOffset(2, 20), 20);
    assert.equal(getPaginationOffset(3, 10), 20);
  });

  it("assembles paginated result with items", () => {
    const items = [{ id: "1" }, { id: "2" }];
    const result = createPaginatedResult(items, 10, 1, 2);
    assert.equal(result.items.length, 2);
    assert.equal(result.total, 10);
    assert.equal(result.totalPages, 5);
    assert.equal(result.hasNextPage, true);
  });
});
