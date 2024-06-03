/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
