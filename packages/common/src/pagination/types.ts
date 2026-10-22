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
