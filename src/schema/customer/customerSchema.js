import { z } from "zod";
import policySchema from "../policy/policySchema";

const customerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  address: z.string(),
  policies: z.array(policySchema),
});

export default customerSchema;
