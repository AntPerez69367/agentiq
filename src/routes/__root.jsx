import { createRootRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useAtom } from "jotai";
import titleAtom from "@state/global/titleAtom";
import userAtom from "@state/global/userAtom";
import { APP_META, ROUTES, ROUTE_LABELS } from "@/constants";
import ErrorBoundary from "@components/common/ErrorBoundary";

const NavigationLink = ({ to, children }) => {
  const router = useRouterState();
  const isActive = router.location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded transition-colors ${
        isActive
          ? "bg-purple-600 text-white font-semibold"
          : "hover:bg-gray-700 hover:text-purple-400"
      }`}
    >
      {children}
    </Link>
  );
};

const NavigationMenu = () => (
  <nav className="flex flex-col gap-2">
    <NavigationLink to={ROUTES.HOME}>{ROUTE_LABELS[ROUTES.HOME]}</NavigationLink>
    <NavigationLink to={ROUTES.CUSTOMERS}>{ROUTE_LABELS[ROUTES.CUSTOMERS]}</NavigationLink>
    <NavigationLink to={ROUTES.EMPLOYEES}>{ROUTE_LABELS[ROUTES.EMPLOYEES]}</NavigationLink>
    <NavigationLink to={ROUTES.POLICIES}>{ROUTE_LABELS[ROUTES.POLICIES]}</NavigationLink>
  </nav>
);

const RootLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <LeftSidebar />
      <MainContent />
    </div>
  );
};

const Header = () => {
  const [title] = useAtom(titleAtom);
  const [user] = useAtom(userAtom);

  return (
    <header className="bg-gray-800 border-b border-gray-700 text-gray-100 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">
            Welcome, {user?.name || "User"}
          </span>
          <User className="hover:text-purple-400 transition-colors cursor-pointer" size={24} />
        </div>
      </div>
    </header>
  );
};

const LeftSidebar = () => (
  <div className="w-full text-center md:w-[15%] bg-gray-850 text-gray-100 p-6 border-r border-gray-700">
    <div className="mb-8">
      <h2 className="mb-1 text-2xl font-bold text-purple-400">{APP_META.NAME}</h2>
      <hr className="border-gray-700" />
    </div>
    <NavigationMenu />
  </div>
);

const MainContent = () => (
  <div className="flex flex-col flex-1 bg-gray-900">
    <Header />
    <div className="flex-1 p-6 overflow-auto bg-gray-900 text-gray-100">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
});
