import {
  PERFORMANCE_TIER,
  type PerformanceTier,
} from "../types/performance-tier";

export const PLUS_SIGN = "+";
/** Typographic minus (U+2212): same width as "+", keeps tabular-nums aligned. */
export const MINUS_SIGN = "−";
export const MINUTE_SUFFIX = "m";

export const PERFORMANCE_LABEL = {
  AHEAD: "ahead",
  LATE: "late",
  ON_TIME: "On time",
} as const;

export const PERFORMANCE_TIER_CLASS = {
  [PERFORMANCE_TIER.AHEAD]: "text-success-text",
  [PERFORMANCE_TIER.ON_TIME]: "text-foreground-muted",
  [PERFORMANCE_TIER.LATE]: "text-warning-text",
  [PERFORMANCE_TIER.OVER]: "text-danger-text",
} satisfies Record<PerformanceTier, string>;
