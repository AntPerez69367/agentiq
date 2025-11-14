import { z } from "zod";

const policySchema = z.object({
  id: z.string(),
  policyNumber: z.string(),
  policyName: z.string(),
  policyDescription: z.string(),
  policyType: z.string(),
  policyStatus: z.enum(["active", "inactive", "pending", "cancelled"]),
});

export default policySchema;
