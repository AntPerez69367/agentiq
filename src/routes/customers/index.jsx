import { createFileRoute } from "@tanstack/react-router";
import CustomerPage from "@/components/features/customers";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.CUSTOMERS)({
  component: CustomerPage,
});
