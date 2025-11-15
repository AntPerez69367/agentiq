import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { policiesApi } from "@api/policies";
import { queryKeys } from "@api/queryKeys";
import { toast } from "sonner";

export const createPolicyMutation = atomWithMutation((get) => ({
  mutationFn: (newPolicy) => policiesApi.create(newPolicy),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Policy created successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.policies.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error creating policy: ${error.message}`);
  },
}));

export const updatePolicyMutation = atomWithMutation((get) => ({
  mutationFn: ({ id, data }) => policiesApi.update(id, data),
  onSuccess: (_, { id }) => {
    const queryClient = get(queryClientAtom);
    toast.success("Policy updated successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.policies.detail(id),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.policies.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error updating policy: ${error.message}`);
  },
}));

export const deletePolicyMutation = atomWithMutation((get) => ({
  mutationFn: (policyId) => policiesApi.delete(policyId),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Policy deleted successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.policies.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error deleting policy: ${error.message}`);
  },
}));
