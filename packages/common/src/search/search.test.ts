import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createSearchQueryParamSchema,
  escapeLikePattern,
  searchQueryParamSchema,
  toContainsPattern,
  toPrefixPattern,
} from "./search";

describe("Search Utilities & Schemas", () => {
  describe("escapeLikePattern", () => {
    it("leaves plain alphanumeric strings unchanged", () => {
      assert.equal(escapeLikePattern("typescript"), "typescript");
    });

    it("escapes SQL LIKE wildcard characters (%, _, \\)", () => {
      assert.equal(escapeLikePattern("c_#%\\test"), "c\\_#\\%\\\\test");
    });
  });

  describe("toPrefixPattern & toContainsPattern", () => {
    it("formats escaped prefix pattern with trailing %", () => {
      assert.equal(toPrefixPattern("100%_ts"), "100\\%\\_ts%");
    });

    it("formats escaped contains pattern with leading and trailing %", () => {
      assert.equal(toContainsPattern("react_native"), "%react\\_native%");
    });
  });

  describe("searchQueryParamSchema", () => {
    it("trims non-empty search terms", () => {
      assert.equal(searchQueryParamSchema.parse("  docker  "), "docker");
    });

    it("normalizes empty or whitespace-only strings to undefined", () => {
      assert.equal(searchQueryParamSchema.parse(""), undefined);
      assert.equal(searchQueryParamSchema.parse("   "), undefined);
      assert.equal(searchQueryParamSchema.parse(undefined), undefined);
    });

    it("enforces custom and default max length bounds", () => {
      const shortSchema = createSearchQueryParamSchema(5);
      assert.equal(shortSchema.parse("12345"), "12345");
      assert.throws(() => shortSchema.parse("123456"));
    });
  });
});
