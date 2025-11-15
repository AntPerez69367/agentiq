import { createFileRoute } from "@tanstack/react-router";
import Employees from "@/components/features/employees";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.EMPLOYEES)({
  component: Employees,
});
