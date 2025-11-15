import { atomWithQuery } from "jotai-tanstack-query";
import { policiesApi } from "@api/policies";
import { queryKeys } from "@api/queryKeys";
import { PAGINATION } from "@/constants";

const policiesAtom = (
  page = PAGINATION.DEFAULT_PAGE,
  limit = PAGINATION.DEFAULT_PAGE_SIZE
) =>
  atomWithQuery(() => ({
    queryKey: queryKeys.policies.list({ page, size: limit }),
    queryFn: async () => {
      const data = await policiesApi.getAll({ page, size: limit });
      return {
        policies: data._embedded?.policyResponseList || [],
        links: data._links || {},
      };
    },
  }));

export default policiesAtom;
