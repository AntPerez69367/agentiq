import { createFileRoute } from "@tanstack/react-router";
import CustomerDetailPage from "@/components/features/customers/customer-detail";

export const Route = createFileRoute("/customers/$customerId")({
  component: CustomerDetailPage,
});
