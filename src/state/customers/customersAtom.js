import { atomWithQuery } from "jotai-tanstack-query";
import { customersApi } from "@api/customers";
import { queryKeys } from "@api/queryKeys";
import { PAGINATION } from "@/constants";

const customersAtom = (
  page = PAGINATION.DEFAULT_PAGE,
  limit = PAGINATION.DEFAULT_PAGE_SIZE
) =>
  atomWithQuery(() => ({
    queryKey: queryKeys.customers.list({ page, size: limit }),
    queryFn: async () => {
      const data = await customersApi.getAll({ page, size: limit });
      return {
        customers: data._embedded?.customerResponseList || [],
        links: data._links || {},
      };
    },
  }));

export default customersAtom;
