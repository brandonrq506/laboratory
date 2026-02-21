import type { PerformanceSummary } from "./getPerformanceSummary";

export const MESSAGES = {
  empty: "Start your first task!",
  outstanding: "Outstanding pace!",
  solid: "Solid effort, keep going!",
  tough: "Tough day — tomorrow is a fresh start!",
  room: "Room to improve, stay focused!",
} as const;

const OUTSTANDING_THRESHOLD = 80;
const SOLID_THRESHOLD = 50;
const TOUGH_DAY_THRESHOLD = 50;

export function getMotivationalMessage(summary: PerformanceSummary): string {
  if (summary.total === 0) return MESSAGES.empty;
  if (summary.rocketPct >= OUTSTANDING_THRESHOLD) return MESSAGES.outstanding;
  if (summary.rocketPct >= SOLID_THRESHOLD) return MESSAGES.solid;
  if (summary.snailPct >= TOUGH_DAY_THRESHOLD) return MESSAGES.tough;
  return MESSAGES.room;
}
