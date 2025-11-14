import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientAtomProvider } from "jotai-tanstack-query/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes - data stays fresh
      gcTime: 10 * 60 * 1000,        // 10 minutes - unused data kept in cache
      retry: 1,                       // Retry failed requests once
      refetchOnWindowFocus: false,   // Don't refetch when window regains focus
    },
    mutations: {
      retry: 0,                       // Don't retry failed mutations
    },
  },
});

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientAtomProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientAtomProvider>
  </StrictMode>
);
