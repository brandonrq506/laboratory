/// <reference types="vitest" />

import {
  ViteUserConfig,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ] as ViteUserConfig["plugins"],
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
