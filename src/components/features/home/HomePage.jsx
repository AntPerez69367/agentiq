import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import titleAtom from "@state/global/titleAtom";
import QuickLinkCard from "@components/ui/quick-link-card";
import { APP_META, ROUTES, ROUTE_LABELS } from "@constants";

const HomePage = () => {
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Home size={48} className="text-purple-400" />
        <div>
          <h2 className="text-3xl font-bold text-gray-100">
            Welcome to {APP_META.NAME}
          </h2>
          <p className="text-gray-400 mt-1">{APP_META.TAGLINE}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <QuickLinkCard
          to={ROUTES.CUSTOMERS}
          title={ROUTE_LABELS[ROUTES.CUSTOMERS]}
          description="View and manage customer information"
          icon="👥"
        />
        <QuickLinkCard
          to={ROUTES.EMPLOYEES}
          title={ROUTE_LABELS[ROUTES.EMPLOYEES]}
          description="Manage employee records and access"
          icon="💼"
        />
        <QuickLinkCard
          to={ROUTES.POLICIES}
          title={ROUTE_LABELS[ROUTES.POLICIES]}
          description="View and edit policy documents"
          icon="📋"
        />
      </div>
    </div>
  );
};

export default HomePage;
