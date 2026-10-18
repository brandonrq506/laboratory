import { clsx } from "clsx";

import type { PerformanceTier } from "../types/performance-tier";

import { PERFORMANCE_TIER_CLASS } from "../constants/performance";
import { formatPerformanceDelta } from "../utils/formatPerformanceDelta";
import { getPerformanceDeltaLabel } from "../utils/getPerformanceDeltaLabel";

interface Props {
  minutes: number;
  tier: PerformanceTier;
  className?: string;
}

export const PerformanceDelta = ({ minutes, tier, className }: Props) => (
  <span
    className={clsx("tabular-nums", PERFORMANCE_TIER_CLASS[tier], className)}>
    <span aria-hidden>{formatPerformanceDelta(minutes)}</span>
    <span className="sr-only">{getPerformanceDeltaLabel(minutes)}</span>
  </span>
);
