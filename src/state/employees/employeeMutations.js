import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { employeesApi } from "@api/employees";
import { queryKeys } from "@api/queryKeys";
import { toast } from "sonner";

export const createEmployeeMutation = atomWithMutation((get) => ({
  mutationFn: (newEmployee) => employeesApi.create(newEmployee),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Employee created successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.employees.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error creating employee: ${error.message}`);
  },
}));

export const updateEmployeeMutation = atomWithMutation((get) => ({
  mutationFn: ({ id, data }) => employeesApi.update(id, data),
  onSuccess: (_, { id }) => {
    const queryClient = get(queryClientAtom);
    toast.success("Employee updated successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.employees.detail(id),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.employees.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error updating employee: ${error.message}`);
  },
}));

export const deleteEmployeeMutation = atomWithMutation((get) => ({
  mutationFn: (employeeId) => employeesApi.delete(employeeId),
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    toast.success("Employee deleted successfully!");
    queryClient.invalidateQueries({
      queryKey: queryKeys.employees.lists(),
    });
  },
  onError: (error) => {
    toast.error(`Error deleting employee: ${error.message}`);
  },
}));
