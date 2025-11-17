import usePagination from "@hooks/usePagination";
import policiesAtom from "@/state/policies/policiesAtom";
import { useAtom, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import PolicyOverviewTable from "./PolicyOverviewTable";
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

import {
  createPolicyIsOpenAtom,
  selectedPolicyAtom,
} from "@/state/policies/policyOverview";

const PolicyOverviewPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const setTitle = useSetAtom(titleAtom);
  const setCreatePolicyIsOpen = useSetAtom(createPolicyIsOpenAtom);
  const setSelectedPolicy = useSetAtom(selectedPolicyAtom);

  useEffect(() => {
    setTitle("Policy Overview");
  }, [setTitle]);

  const paginatedAtom = useMemo(() => policiesAtom(page, limit), [page, limit]);

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
    return <LoadingSpinner text="Loading policies..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Error loading policies"
        error={{ message: "Failed to fetch policy data. Please try again." }}
        onRetry={handleRetry}
      />
    );
  }

  const hasNextPage = !!data.links?.next;
  const hasPreviousPage = !!data.links?.prev;

  const handleOpenCreateModal = () => {
    setSelectedPolicy(null);
    setCreatePolicyIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus size={20} />
          Create Policy
        </Button>
      </div>

      <PolicyOverviewTable data={data.policies} />
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

export default PolicyOverviewPage;
