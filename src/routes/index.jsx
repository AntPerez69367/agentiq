import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@components/features/home/HomePage";
import { ROUTES } from "@/constants/routes";

export const Route = createFileRoute(ROUTES.HOME)({
  component: HomePage,
});
