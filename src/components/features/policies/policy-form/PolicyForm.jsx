import { useForm } from "@tanstack/react-form";
import { useAtom } from "jotai";
import FormInput from "@components/ui/form-input";
import LoadingSpinner from "@components/common/LoadingSpinner";
import {
  policyFormSchema,
  defaultPolicyFormValues,
} from "@/schema/policy/policyFormSchema";
import {
  createPolicyMutation,
  updatePolicyMutation,
} from "@state/policies/policyMutations";

const PolicyForm = ({ policy = null, onSuccess }) => {
  const isEditMode = !!policy;

  const [createMutation] = useAtom(createPolicyMutation);
  const [updateMutation] = useAtom(updatePolicyMutation);

  const form = useForm({
    defaultValues: policy || defaultPolicyFormValues,
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          await updateMutation.mutateAsync({
            id: policy.id,
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
            {error.message || "Failed to save policy. Please try again."}
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
          name="customerId"
          validators={{
            onChange: policyFormSchema.shape.customerId,
          }}
        >
          {(field) => (
            <FormInput
              label="Customer ID"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              error={!field.state.meta.isValid && field.state.meta.errors?.[0]}
              placeholder={1}
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="policyNumber"
          validators={{
            onChange: policyFormSchema.shape.policyNumber,
          }}
        >
          {(field) => (
            <FormInput
              label="Policy Number"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={!field.state.meta.isValid && field.state.meta.errors?.[0]}
              placeholder="CXA-123467"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="policyName"
          validators={{
            onChange: policyFormSchema.shape.policyName,
          }}
        >
          {(field) => (
            <FormInput
              label="Policy Name"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Auto Insurance"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="policyDescription"
          validators={{
            onChange: policyFormSchema.shape.policyDescription,
          }}
        >
          {(field) => (
            <FormInput
              label="Description"
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Policy description"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="policyType"
          validators={{
            onChange: policyFormSchema.shape.policyType,
          }}
        >
          {(field) => (
            <FormInput
              label="Type"
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Policy type"
              required
              disabled={isMutating}
            />
          )}
        </form.Field>

        <form.Field
          name="policyStatus"
          validators={{
            onChange: policyFormSchema.shape.policyStatus,
          }}
        >
          {(field) => (
            <FormInput
              label="Status"
              name={field.name}
              type="select"
              options={["Active", "Inactive", "Pending"]}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={field.state.meta.errors?.[0]}
              placeholder="Policy status"
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
              <>{isEditMode ? "Update Policy" : "Create Policy"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PolicyForm;
