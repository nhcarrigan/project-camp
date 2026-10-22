import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculatePagination,
  createPaginatedResult,
  getPaginationOffset,
} from "./pagination";

describe("Pagination Logic", () => {
  describe("calculatePagination", () => {
    it("calculates pagination metadata correctly for first, middle, and last pages", () => {
      // First page
      const firstPage = calculatePagination({
        totalItems: 95,
        page: 1,
        pageSize: 20,
      });
      assert.deepEqual(firstPage, {
        page: 1,
        pageSize: 20,
        total: 95,
        totalPages: 5,
        hasNextPage: true,
        hasPrevPage: false,
      });

      // Middle page
      const middlePage = calculatePagination({
        totalItems: 95,
        page: 3,
        pageSize: 20,
      });
      assert.deepEqual(middlePage, {
        page: 3,
        pageSize: 20,
        total: 95,
        totalPages: 5,
        hasNextPage: true,
        hasPrevPage: true,
      });

      // Last page
      const lastPage = calculatePagination({
        totalItems: 95,
        page: 5,
        pageSize: 20,
      });
      assert.deepEqual(lastPage, {
        page: 5,
        pageSize: 20,
        total: 95,
        totalPages: 5,
        hasNextPage: false,
        hasPrevPage: true,
      });
    });

    it("handles exact and inexact totalPages divisions", () => {
      // Exact division (60 / 20 = 3)
      const exact = calculatePagination({
        totalItems: 60,
        page: 1,
        pageSize: 20,
      });
      assert.equal(exact.totalPages, 3);
      assert.equal(exact.hasNextPage, true);

      // Inexact division ceiling (61 / 20 = 4)
      const inexact = calculatePagination({
        totalItems: 61,
        page: 1,
        pageSize: 20,
      });
      assert.equal(inexact.totalPages, 4);
    });

    it("handles single page results and single item datasets", () => {
      // Multiple items on a single page
      const singlePage = calculatePagination({
        totalItems: 7,
        page: 1,
        pageSize: 10,
      });
      assert.deepEqual(singlePage, {
        page: 1,
        pageSize: 10,
        total: 7,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });

      // Exactly 1 item
      const singleItem = calculatePagination({
        totalItems: 1,
        page: 1,
        pageSize: 1,
      });
      assert.deepEqual(singleItem, {
        page: 1,
        pageSize: 1,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });
    });

    it("handles zero total items gracefully", () => {
      const empty = calculatePagination({
        totalItems: 0,
        page: 1,
        pageSize: 20,
      });
      assert.deepEqual(empty, {
        page: 1,
        pageSize: 20,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    });

    it("defensively clamps negative total items to zero", () => {
      const negativeTotal = calculatePagination({
        totalItems: -15,
        page: 1,
        pageSize: 20,
      });
      assert.equal(negativeTotal.total, 0);
      assert.equal(negativeTotal.totalPages, 0);
      assert.equal(negativeTotal.hasNextPage, false);
      assert.equal(negativeTotal.hasPrevPage, false);
    });

    it("defensively clamps zero and negative pageSize to 1", () => {
      const zeroPageSize = calculatePagination({
        totalItems: 10,
        page: 1,
        pageSize: 0,
      });
      assert.equal(zeroPageSize.pageSize, 1);
      assert.equal(zeroPageSize.totalPages, 10);

      const negativePageSize = calculatePagination({
        totalItems: 10,
        page: 1,
        pageSize: -5,
      });
      assert.equal(negativePageSize.pageSize, 1);
      assert.equal(negativePageSize.totalPages, 10);
    });

    it("defensively clamps zero and negative page numbers to 1", () => {
      const zeroPage = calculatePagination({
        totalItems: 50,
        page: 0,
        pageSize: 10,
      });
      assert.equal(zeroPage.page, 1);
      assert.equal(zeroPage.hasPrevPage, false);

      const negativePage = calculatePagination({
        totalItems: 50,
        page: -4,
        pageSize: 10,
      });
      assert.equal(negativePage.page, 1);
      assert.equal(negativePage.hasPrevPage, false);
    });

    it("handles requested page exceeding totalPages", () => {
      const outOfBounds = calculatePagination({
        totalItems: 20,
        page: 10,
        pageSize: 10,
      });
      assert.equal(outOfBounds.page, 10);
      assert.equal(outOfBounds.totalPages, 2);
      assert.equal(outOfBounds.hasNextPage, false);
      assert.equal(outOfBounds.hasPrevPage, true);

      // Page > 1 when totalPages = 0 (no pages at all)
      const outOfBoundsEmpty = calculatePagination({
        totalItems: 0,
        page: 5,
        pageSize: 10,
      });
      assert.equal(outOfBoundsEmpty.page, 5);
      assert.equal(outOfBoundsEmpty.totalPages, 0);
      assert.equal(outOfBoundsEmpty.hasNextPage, false);
      assert.equal(outOfBoundsEmpty.hasPrevPage, false);
    });
  });

  describe("getPaginationOffset", () => {
    it("calculates correct offset for standard page numbers", () => {
      assert.equal(getPaginationOffset(1, 20), 0);
      assert.equal(getPaginationOffset(2, 20), 20);
      assert.equal(getPaginationOffset(3, 10), 20);
      assert.equal(getPaginationOffset(5, 25), 100);
    });

    it("defensively clamps page <= 0 to page 1", () => {
      assert.equal(getPaginationOffset(0, 20), 0);
      assert.equal(getPaginationOffset(-1, 20), 0);
      assert.equal(getPaginationOffset(-99, 15), 0);
    });

    it("defensively clamps pageSize <= 0 to 1", () => {
      assert.equal(getPaginationOffset(1, 0), 0);
      assert.equal(getPaginationOffset(3, 0), 2);
      assert.equal(getPaginationOffset(4, -10), 3);
    });
  });

  describe("createPaginatedResult", () => {
    it("assembles paginated result combining items and calculated metadata", () => {
      const items = [{ id: "1" }, { id: "2" }];
      const result = createPaginatedResult(items, 10, 1, 2);

      assert.deepEqual(result, {
        items,
        page: 1,
        pageSize: 2,
        total: 10,
        totalPages: 5,
        hasNextPage: true,
        hasPrevPage: false,
      });
    });

    it("preserves empty items arrays and handles zero totals", () => {
      const result = createPaginatedResult([], 0, 1, 10);

      assert.deepEqual(result.items, []);
      assert.equal(result.total, 0);
      assert.equal(result.totalPages, 0);
      assert.equal(result.hasNextPage, false);
      assert.equal(result.hasPrevPage, false);
    });

    it("handles partial last page results", () => {
      const items = ["item-21", "item-22"];
      const result = createPaginatedResult(items, 22, 3, 10);

      assert.equal(result.items.length, 2);
      assert.equal(result.total, 22);
      assert.equal(result.page, 3);
      assert.equal(result.pageSize, 10);
      assert.equal(result.totalPages, 3);
      assert.equal(result.hasNextPage, false);
      assert.equal(result.hasPrevPage, true);
    });
  });
});
