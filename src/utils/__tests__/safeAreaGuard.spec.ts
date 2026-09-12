/// <reference types="node" />
import { join, relative } from "node:path";
import { readFileSync, readdirSync } from "node:fs";

/**
 * Safe-area guard.
 *
 * The page opts into `viewport-fit=cover` (index.html), so anything positioned
 * against the viewport (`fixed` / `sticky`) can end up under the status bar or
 * the home indicator. Normal-flow content is already protected by MainLayout.
 *
 * Any component that uses `fixed` or `sticky` must offset with the safe-area
 * utilities from src/index.css (`pt-safe-N`, `pb-safe-N`, `top-safe-N`,
 * `bottom-safe-N`, `pt-safe`, `pb-safe`) and be listed below.
 *
 * Limitation: `absolute` children of a fixed wrapper (e.g. DesktopSidebarToggle)
 * cannot be detected statically; review those by hand.
 */
const SAFE_AREA_AWARE_FILES = [
  "src/components/core/Modal/FullHeightModal.tsx",
  "src/components/core/Modal/Modal.tsx",
  "src/components/core/Network/NetworkBadge.tsx",
  "src/components/layout/main/Header.tsx",
  "src/components/layout/main/Sidebar/Sidebar.tsx",
  "src/features/timer/components/TimerPanel.tsx",
];

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const TEST_FILE = /(__tests__|\.spec\.|\.test\.)/;
const VIEWPORT_POSITIONED = /["'`][^"'`\n]*\b(fixed|sticky)\b/;

const listComponentFiles = () =>
  readdirSync(SRC, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".tsx") && !TEST_FILE.test(file))
    .map((file) => relative(ROOT, join(SRC, file)).split("\\").join("/"))
    .sort();

const usesViewportPositioning = (file: string) =>
  VIEWPORT_POSITIONED.test(readFileSync(join(ROOT, file), "utf8"));

const bulletList = (files: string[]) =>
  files.map((file) => `  - ${file}`).join("\n");

describe("safe-area guard", () => {
  const files = listComponentFiles();

  it("every fixed/sticky component is safe-area aware (allowlisted)", () => {
    const offenders = files.filter(
      (file) =>
        !SAFE_AREA_AWARE_FILES.includes(file) && usesViewportPositioning(file),
    );

    expect(
      offenders,
      `Viewport-positioned (fixed/sticky) elements found outside the allowlist:
${bulletList(offenders)}
Offset them with top-safe-N / bottom-safe-N / pt-safe-N / pb-safe-N (see src/index.css), then add the file to SAFE_AREA_AWARE_FILES.`,
    ).toEqual([]);
  });

  it("allowlist has no stale entries", () => {
    const stale = SAFE_AREA_AWARE_FILES.filter(
      (file) => !files.includes(file) || !usesViewportPositioning(file),
    );

    expect(
      stale,
      `Allowlisted files no longer exist or no longer use fixed/sticky:
${bulletList(stale)}`,
    ).toEqual([]);
  });
});
