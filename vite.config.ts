/// <reference types="vitest" />

import {
  ViteUserConfig,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
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
      extension: ["ts", "tsx"],
      exclude: ["src/experiments", ...coverageConfigDefaults.exclude],
    },
    setupFiles: ["./src/test/setup.ts"],
  },
});
// include: ['src/**/__tests__/*'], should test if this really applies to __tests__ deep nested.
