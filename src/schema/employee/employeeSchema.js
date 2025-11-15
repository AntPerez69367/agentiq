import { z } from "zod";
import { LocalDateTime } from "@/utils/zodTypes/localDateTime";

const employeeSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  title: z.string(),
  createdAt: LocalDateTime,
  updatedAt: LocalDateTime,
});

export default employeeSchema;
