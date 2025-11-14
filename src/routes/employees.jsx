import { createFileRoute } from "@tanstack/react-router";
import EmployeesOverviewPage from "@components/features/employees/EmployeesOverviewPage";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.EMPLOYEES)({
  component: EmployeesOverviewPage,
});
