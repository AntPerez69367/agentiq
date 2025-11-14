import { createFileRoute } from "@tanstack/react-router";
import CustomerDetailPage from "@components/features/customers/CustomerDetailPage";

export const Route = createFileRoute("/customers/$customerId")({
  component: CustomerDetailPage,
});