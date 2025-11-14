import { createFileRoute } from "@tanstack/react-router";
import PoliciesOverviewPage from "@components/features/policies/PoliciesOverviewPage";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.POLICIES)({
  component: PoliciesOverviewPage,
});
