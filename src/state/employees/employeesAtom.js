import { atomWithQuery } from "jotai-tanstack-query";
import { employeesApi } from "@api/employees";
import { queryKeys } from "@api/queryKeys";
import { PAGINATION } from "@/constants";

const employeesAtom = (
  page = PAGINATION.DEFAULT_PAGE,
  limit = PAGINATION.DEFAULT_PAGE_SIZE
) =>
  atomWithQuery(() => ({
    queryKey: queryKeys.employees.list({ page, size: limit }),
    queryFn: async () => {
      const data = await employeesApi.getAll({ page, size: limit });
      return {
        employees: data._embedded?.employeeResponseList || [],
        links: data._links || {},
      };
    },
  }));

export default employeesAtom;
