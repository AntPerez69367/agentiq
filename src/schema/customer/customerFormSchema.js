import { z } from "zod";

/**
 * Customer form validation schema
 * Used for creating and updating customers (id is optional for updates)
 */
export const customerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Invalid phone number format"
    ),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
});

export const defaultCustomerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
};
