import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  preview: {
    port: 4173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 👇 add history fallback for React Router
  configureServer(server) {
    server.middlewares.use(
      history({
        index: "/index.html",
        disableDotRule: true,
      })
    );
  },
});

