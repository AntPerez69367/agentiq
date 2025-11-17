import usePagination from "@hooks/usePagination";
import customersAtom from "@state/customers/customersAtom";
import { useAtom, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import CustomerOverviewTable from "./CustomerOverviewTable";
import { PAGINATION } from "@/constants";
import ErrorDisplay from "@components/common/ErrorDisplay";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { Button } from "@components/ui/button";
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

import titleAtom from "@state/global/titleAtom";
import { createCustomerIsOpenAtom } from "@/state/customers/customerOverview";

const CustomerOverviewPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const setTitle = useSetAtom(titleAtom);
  const setCustomerCreateOpen = useSetAtom(createCustomerIsOpenAtom);

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

  const handleOpenCreateModal = () => {
    setCustomerCreateOpen(true);
  };

  const hasNextPage = !!data.links?.next;
  const hasPreviousPage = !!data.links?.prev;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus size={20} />
          Create Customer
        </Button>
      </div>

      <CustomerOverviewTable data={data.customers} />

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
