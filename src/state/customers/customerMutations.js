import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { customersApi } from "@api/customers";
import { queryKeys } from "@api/queryKeys";

/**
 * Mutation atom for creating a new customer
 */
export const createCustomerMutation = atomWithMutation((get) => ({
  mutationFn: (newCustomer) => customersApi.create(newCustomer),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);

    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
}));

/**
 * Mutation atom for updating an existing customer
 */
export const updateCustomerMutation = atomWithMutation((get) => ({
  mutationFn: ({ id, data }) => customersApi.update(id, data),
  onSuccess: (_, { id }) => {
    const queryClient = get(queryClientAtom);

    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.detail(id),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
}));

/**
 * Mutation atom for deleting a customer
 */
export const deleteCustomerMutation = atomWithMutation((get) => ({
  mutationFn: (customerId) => customersApi.delete(customerId),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);

    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
}));
