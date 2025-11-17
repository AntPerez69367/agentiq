import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import FormInput from "@components/ui/form-input";
import LoadingSpinner from "@components/common/LoadingSpinner";
import {
  employeeFormSchema,
  defaultEmployeeFormValues,
} from "@/schema/employee/employeeFormSchema";
import {
  createEmployeeMutation,
  updateEmployeeMutation,
} from "@state/employees/employeeMutations";

const EmployeeForm = ({ employee = null, onSuccess }) => {
  const isEditMode = !!employee;

  const [createMutation] = useAtom(createEmployeeMutation);
  const [updateMutation] = useAtom(updateEmployeeMutation);

  const form = useForm({
    defaultValues: employee || defaultEmployeeFormValues,
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          await updateMutation.mutateAsync({
            id: employee.id,
            data: value,
          });
        } else {
          await createMutation.mutateAsync(value);
        }
        onSuccess?.();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
  });

  const isMutating = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-sm text-red-400">
            {error.message || "Failed to save employee. Please try again."}
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="firstName"
          validators={{
            onChange: employeeFormSchema.shape.firstName,
          }}
        >
          {(field) => (
            <FormInput
              label="First Name"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={!field.state.meta.isValid && field.state.meta.errors?.[0]}
              placeholder="John"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="lastName"
          validators={{
            onChange: employeeFormSchema.shape.lastName,
          }}
        >
          {(field) => (
            <FormInput
              label="Last Name"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Doe"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: employeeFormSchema.shape.email,
          }}
        >
          {(field) => (
            <FormInput
              label="Email"
              name={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="john.doe@example.com"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="title"
          validators={{
            onChange: employeeFormSchema.shape.title,
          }}
        >
          {(field) => (
            <FormInput
              label="Title"
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Software Engineer"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isMutating || !form.state.canSubmit}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isMutating ? (
              <>
                <LoadingSpinner size="small" text="" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEditMode ? "Update Employee" : "Create Employee"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
