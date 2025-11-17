import { z } from "zod";

export const policyFormSchema = z.object({
  customerId: z.number().min(1, "Customer ID is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  policyName: z.string().min(1, "Policy name is required"),
  policyDescription: z.string().min(1, "Policy description is required"),
  policyType: z.string().min(1, "Policy type is required"),
  policyStatus: z.enum(["active", "inactive", "pending", "cancelled"], {
    errorMap: () => ({ message: "Policy status is required" }),
  }),
});

export const defaultPolicyFormValues = {
  policyNumber: "",
  policyName: "",
  policyDescription: "",
  policyType: "",
  policyStatus: "pending",
};

export default policyFormSchema;
