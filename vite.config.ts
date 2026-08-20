/// <reference types="vitest" />

import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const domTestFiles = [
  "src/components/**/*.{test,spec}.tsx",
  "src/hooks/**/*.{test,spec}.ts",
  "src/features/userPreferences/components/**/*.{test,spec}.tsx",
  "src/features/userPreferences/utils/__tests__/localStorage.{test,spec}.ts",
];

const nodeTestFiles = ["src/**/utils/**/*.{test,spec}.ts"];

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
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          globals: true,
          environment: "node",
          include: nodeTestFiles,
          exclude: domTestFiles,
        },
      },
      {
        extends: true,
        test: {
          name: "jsdom",
          globals: true,
          environment: "jsdom",
          include: domTestFiles,
          setupFiles: ["./src/test/setup-dom.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "msw",
          globals: true,
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          exclude: [...domTestFiles, ...nodeTestFiles],
          setupFiles: ["./src/test/setup.ts"],
        },
      },
    ],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "clover", "json"],
      exclude: ["src/routes", ...coverageConfigDefaults.exclude],
    },
  },
});
