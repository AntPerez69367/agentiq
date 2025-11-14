import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { PAGINATION } from "@/constants";

/**
 * Custom hook to manage pagination state.
 * @param {number} initialPage - Starting page number (default from PAGINATION.DEFAULT_PAGE)
 * @param {number} initialLimit - Items per page (default from PAGINATION.DEFAULT_PAGE_SIZE)
 * @returns {Object} Pagination state and setters
 */
const usePagination = (
  initialPage = PAGINATION.DEFAULT_PAGE,
  initialLimit = PAGINATION.DEFAULT_PAGE_SIZE
) => {
  const pageAtom = useMemo(() => atom(initialPage), []);
  const limitAtom = useMemo(() => atom(initialLimit), []);

  const [page, setPage] = useAtom(pageAtom);
  const [limit, setLimit] = useAtom(limitAtom);

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
};

export default usePagination;
