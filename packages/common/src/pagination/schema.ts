import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "./constants.js";

/**
 * Zod validation schema for incoming HTTP list request pagination parameters,
 * coercing string query parameters from URLs into integers and enforcing bounds.
 */
export const paginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, { message: "Page must be at least 1" })
    .default(DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(1, { message: "Limit must be at least 1" })
    .max(MAX_PAGE_SIZE, { message: `Limit cannot exceed ${MAX_PAGE_SIZE}` })
    .default(DEFAULT_PAGE_SIZE),
});

/**
 * Parsed pagination query parameters ready for service or database layer consumption.
 */
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
