import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ No need for connect-history-api-fallback, Vercel handles SPA routing.
// ✅ Vite itself already knows to serve index.html for unknown routes.

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    port: 5173, // default dev port
  },
  preview: {
    port: 4173, // preview build port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // where Vercel will serve from
  },
});
