export const queryKeys = {
  customers: {
    all: ["customers"],
    lists: () => [...queryKeys.customers.all, "list"],
    list: (filters) => [...queryKeys.customers.lists(), filters],
    details: () => [...queryKeys.customers.all, "detail"],
    detail: (id) => [...queryKeys.customers.details(), id],
  },
  employees: {
    all: ["employees"],
    lists: () => [...queryKeys.employees.all, "list"],
    list: (filters) => [...queryKeys.employees.lists(), filters],
    details: () => [...queryKeys.employees.all, "detail"],
    detail: (id) => [...queryKeys.employees.details(), id],
  },
  policies: {
    all: ["policies"],
    lists: () => [...queryKeys.policies.all, "list"],
    list: (filters) => [...queryKeys.policies.lists(), filters],
    details: () => [...queryKeys.policies.all, "detail"],
    detail: (id) => [...queryKeys.policies.details(), id],
  },
};
