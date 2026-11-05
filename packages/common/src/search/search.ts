import { z } from "zod";

/**
 * Default maximum character length for URL search and autocomplete query strings.
 */
export const DEFAULT_SEARCH_MAX_LENGTH = 100;

/**
 * Escapes SQL `LIKE`/`ILIKE` wildcard characters (`\`, `%`, `_`) in user-supplied search input
 * so they are matched as literal characters rather than SQL pattern wildcards.
 */
export const escapeLikePattern = (input: string): string =>
  input.replace(/[\\%_]/g, "\\$&");

/**
 * Converts user-supplied search input into a safe SQL `LIKE`/`ILIKE` prefix pattern (`<escaped>%`)
 * for autocomplete and prefix lookup queries.
 */
export const toPrefixPattern = (input: string): string =>
  `${escapeLikePattern(input)}%`;

/**
 * Converts user-supplied search input into a safe SQL `LIKE`/`ILIKE` substring pattern (`%<escaped>%`)
 * for contains/keyword filter queries.
 */
export const toContainsPattern = (input: string): string =>
  `%${escapeLikePattern(input)}%`;

/**
 * Creates a Zod validation schema for optional search/filter query parameters that trims whitespace,
 * enforces a maximum length bound, and normalizes empty strings (`?q=`) to `undefined`.
 */
export const createSearchQueryParamSchema = (
  maxLength: number = DEFAULT_SEARCH_MAX_LENGTH,
) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .transform((val) => (val.length === 0 ? undefined : val))
    .optional();

/**
 * Standard optional search query parameter schema with a 100-character bound.
 */
export const searchQueryParamSchema = createSearchQueryParamSchema();
