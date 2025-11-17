import { createFileRoute } from "@tanstack/react-router";
import Policies from "@/components/features/policies";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.POLICIES)({
  component: Policies,
});
