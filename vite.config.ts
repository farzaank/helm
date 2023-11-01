import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import config from './public/config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    outDir: `./static_build`,
  },
  base: "/helm/" + config.LEGACY_RELEASE + '/',// can't add process.env.HELM_SUITE here with GH pages 
});
