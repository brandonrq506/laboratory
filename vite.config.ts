/// <reference types="vitest" />

import { ViteUserConfig, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()] as ViteUserConfig["plugins"],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: ["text", "html", "clover", "json"],
      extension: ["ts", "tsx"],
    },
    setupFiles: ["./src/test/setup.ts"],
  },
});
// include: ['src/**/__tests__/*'], should test if this really applies to __tests__ deep nested.
