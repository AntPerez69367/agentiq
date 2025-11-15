import { z } from "zod";

const employeeFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .email()
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters"),
  title: z.string(),
});

export const defaultEmployeeFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  title: "",
};

export default employeeFormSchema;
