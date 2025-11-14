import { z } from "zod";
import policySchema from "./policySchema";

const customerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  policies: z.array(policySchema),
});

export default customerSchema;
