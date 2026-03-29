/// <reference types="vitest" />

import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: ["text", "html", "clover", "json"],
      exclude: ["src/routes", ...coverageConfigDefaults.exclude],
    },
    setupFiles: ["./src/test/setup.ts"],
  },
});
