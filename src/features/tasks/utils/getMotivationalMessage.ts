import type { PerformanceSummary } from "./getPerformanceSummary";

export const MESSAGES = {
  empty: "Start your first task!",
  outstanding: "Outstanding pace!",
  solid: "Solid effort, keep going!",
  tough: "Tough day — tomorrow is a fresh start!",
  room: "Room to improve, stay focused!",
} as const;

/** Net minutes thresholds (inclusive). */
export const OUTSTANDING_MIN_MINUTES = 15;
export const SOLID_MIN_MINUTES = 0;
export const ROOM_MIN_MINUTES = -30;

export function getMotivationalMessage({
  total,
  netMinutes,
}: PerformanceSummary): string {
  if (total === 0) return MESSAGES.empty;
  if (netMinutes >= OUTSTANDING_MIN_MINUTES) return MESSAGES.outstanding;
  if (netMinutes >= SOLID_MIN_MINUTES) return MESSAGES.solid;
  if (netMinutes >= ROOM_MIN_MINUTES) return MESSAGES.room;
  return MESSAGES.tough;
}
