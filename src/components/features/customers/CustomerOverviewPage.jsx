import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import customersAtom from "@state/customers/customersAtom";
import usePagination from "@hooks/usePagination";
import CustomerOverviewTable from "./CustomerOverviewTable";
import titleAtom from "@state/global/titleAtom";
import { PAGINATION } from "@/constants";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ErrorDisplay from "@components/common/ErrorDisplay";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const CustomerOverviewPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [, setTitle] = useAtom(titleAtom);

  useEffect(() => {
    setTitle("Customer Overview");
  }, [setTitle]);

  const paginatedAtom = useMemo(
    () => customersAtom(page, limit),
    [page, limit]
  );

  const [{ data, isPending, isError, isFetching }] = useAtom(paginatedAtom);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  const handleRetry = () => {
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  if (isPending) {
    return <LoadingSpinner text="Loading customers..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Error loading customers"
        error={{ message: "Failed to fetch customer data. Please try again." }}
        onRetry={handleRetry}
      />
    );
  }

  const hasNextPage = !!data.links?.next;
  const hasPreviousPage = !!data.links?.prev;

  return (
    <div>
      <CustomerOverviewTable className="mb-4" data={data.customers} />

      <Pagination>
        <PaginationPrevious
          className={`cursor-pointer ${hasPreviousPage ? "" : "opacity-50 cursor-not-allowed"}`}
          onClick={hasPreviousPage ? handlePreviousPage : null}
          disabled={!hasPreviousPage || isFetching}
        />
        <Select value={String(limit)} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[125px] ml-5 mr-5 border-0 cursor-pointer">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {PAGINATION.PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <PaginationNext
          className={`cursor-pointer ${hasNextPage ? "" : "opacity-50 cursor-not-allowed"}`}
          onClick={hasNextPage ? handleNextPage : null}
          disabled={!hasNextPage || isFetching}
        />
      </Pagination>
    </div>
  );
};

export default CustomerOverviewPage;
