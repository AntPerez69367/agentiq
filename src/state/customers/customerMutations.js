import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { customersApi } from "@api/customers";
import { queryKeys } from "@api/queryKeys";
import { toast } from "sonner";

/**
 * Mutation atom for creating a new customer
 */
export const createCustomerMutation = atomWithMutation((get) => ({
  mutationFn: (newCustomer) => customersApi.create(newCustomer),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Customer created successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error creating customer: ${error.message}`);
  },
}));

/**
 * Mutation atom for updating an existing customer
 */
export const updateCustomerMutation = atomWithMutation((get) => ({
  mutationFn: ({ id, data }) => customersApi.update(id, data),
  onSuccess: (_, { id }) => {
    const queryClient = get(queryClientAtom);
    toast.success("Customer updated successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.detail(id),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error updating customer: ${error.message}`);
  },
}));

/**
 * Mutation atom for deleting a customer
 */
export const deleteCustomerMutation = atomWithMutation((get) => ({
  mutationFn: (customerId) => customersApi.delete(customerId),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Customer deleted successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.customers.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error deleting customer: ${error.message}`);
  },
}));
