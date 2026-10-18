import {
  EMPTY_PHRASES,
  MILESTONE_PHRASES,
  NET_BAND_PHRASES,
  NIGHT_PHRASES,
  PACE_TREND_PHRASES,
} from "../constants/phrases";
import type { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { DAY_PHASE } from "../types/day-phase";
import { MILESTONE_STEP } from "../constants/motivational-message";
import { PACE_TREND } from "../types/pace-trend";
import { SLOWING_DOWN_CUTOFF_HOUR } from "../constants/pace-trend";

import { getDayOutcome } from "./getDayOutcome";
import { getDayPhase } from "./getDayPhase";
import { getHours } from "date-fns";
import { getNetBand } from "./getNetBand";
import { getPaceTrend } from "./getPaceTrend";
import { getPerformanceSummary } from "@/features/tasks/utils/getPerformanceSummary";
import { getVariantSeed } from "./getVariantSeed";
import { pickVariant } from "./pickVariant";

interface Props {
  tasks: CompletedTaskAPI[];
  now?: Date;
}

/**
 * Picks the Motivational Message for today's Completed Tasks. First match wins:
 * empty, Night wrap-up, Milestone, Pace Trend, then Net Band by Day Phase.
 *
 * @param props.tasks - Today's Completed Tasks, in any order.
 * @param props.now - Current time; defaults to now.
 * @returns A short phrase, stable for the same day and task count.
 */
export function getMotivationalMessage({
  tasks,
  now = new Date(),
}: Props): string {
  const { total, netDelta } = getPerformanceSummary(tasks);
  const phase = getDayPhase(now);
  const seed = getVariantSeed(now, total);

  if (total === 0) return pickVariant(EMPTY_PHRASES[phase], seed);

  if (phase === DAY_PHASE.NIGHT)
    return pickVariant(NIGHT_PHRASES[getDayOutcome(netDelta)], seed);

  if (total % MILESTONE_STEP === 0)
    return pickVariant(MILESTONE_PHRASES, seed)(total);

  const trend = getPaceTrend(tasks);

  const isSlowingDownMuted =
    trend === PACE_TREND.SLOWING_DOWN &&
    getHours(now) >= SLOWING_DOWN_CUTOFF_HOUR;

  if (trend && !isSlowingDownMuted)
    return pickVariant(PACE_TREND_PHRASES[trend], seed);

  return pickVariant(NET_BAND_PHRASES[getNetBand(netDelta)][phase], seed);
}
