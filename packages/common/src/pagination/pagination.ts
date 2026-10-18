import type {
  PaginatedResult,
  PaginationMeta,
  PaginationOptions,
} from "./types.js";

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
