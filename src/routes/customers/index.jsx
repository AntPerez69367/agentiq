import { createFileRoute } from "@tanstack/react-router";
import CustomerOverviewPage from "@components/features/customers/CustomerOverviewPage";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.CUSTOMERS)({
  component: CustomerOverviewPage,
});
