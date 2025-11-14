import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
      "@components": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/components"
      ),
      "@hooks": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/hooks"
      ),
      "@api": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/api"
      ),
      "@state": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/state"
      ),
      "@utils": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/utils"
      ),
      "@constants": path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "./src/constants"
      ),
    },
  },
});
