import { z } from "zod";

/**
 * Default starting page number for paginated lists across the application.
 */
export const DEFAULT_PAGE = 1;

/**
 * Default number of items returned per page for lists and tables.
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Maximum allowable page size to prevent unbounded query loads and client memory strain.
 */
export const MAX_PAGE_SIZE = 100;

/**
 * Input parameters required to calculate pagination metadata for a collection.
 */
export interface PaginationOptions {
  /** Total count of items available in the dataset */
  totalItems: number;
  /** Current 1-based page number requested */
  page: number;
  /** Number of items requested per page */
  pageSize: number;
}

/**
 * Standard pagination metadata representing navigation state for paginated collections in UI and APIs.
 */
export interface PaginationMeta {
  /** Current 1-based page index */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total count of items across all pages */
  total: number;
  /** Total number of pages available */
  totalPages: number;
  /** Whether a subsequent page of items exists */
  hasNextPage: boolean;
  /** Whether an antecedent page of items exists */
  hasPrevPage: boolean;
}

/**
 * Business envelope for paginated collection responses, combining data items with pagination metadata.
 */
export interface PaginatedResult<T> extends PaginationMeta {
  /** Array of items on the current page */
  items: T[];
}

/**
 * Isomorphic pagination calculation that computes pagination navigation state
 * for both backend query slicing and frontend table controls.
 */
export const calculatePagination = ({
  totalItems,
  page,
  pageSize,
}: PaginationOptions): PaginationMeta => {
  const safePageSize = Math.max(1, pageSize);
  const safeTotal = Math.max(0, totalItems);
  const totalPages = Math.ceil(safeTotal / safePageSize);
  const currentPage = Math.max(1, page);

  return {
    page: currentPage,
    pageSize: safePageSize,
    total: safeTotal,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1 && totalPages > 0,
  };
};

/**
 * Calculates the zero-based record offset for SQL database queries or array slicing.
 */
export const getPaginationOffset = (page: number, pageSize: number): number => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  return (safePage - 1) * safePageSize;
};

/**
 * Assembles a standardized paginated response combining data items and computed pagination metadata.
 */
export const createPaginatedResult = <T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
): PaginatedResult<T> => {
  const meta = calculatePagination({ totalItems: total, page, pageSize });
  return {
    ...meta,
    items,
  };
};

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
