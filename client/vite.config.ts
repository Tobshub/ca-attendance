import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTSconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTSconfigPaths()],
  server: {
    proxy: {
      "/api": "http://localhost:2048",
    },
  },
});

