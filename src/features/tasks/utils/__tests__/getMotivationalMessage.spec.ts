import type { PerformanceSummary } from "../getPerformanceSummary";

import {
  MESSAGES,
  OUTSTANDING_MIN_MINUTES,
  ROOM_MIN_MINUTES,
  SOLID_MIN_MINUTES,
  getMotivationalMessage,
} from "../getMotivationalMessage";
import { PERFORMANCE_TIER } from "../../types/performance-tier";

const makeSummary = (netMinutes: number, total = 3): PerformanceSummary => ({
  total,
  netMinutes,
  tier: PERFORMANCE_TIER.ON_TIME,
});

describe("getMotivationalMessage", () => {
  it("returns empty message when total is 0", () => {
    expect(getMotivationalMessage(makeSummary(0, 0))).toBe(MESSAGES.empty);
  });

  it.each([
    [OUTSTANDING_MIN_MINUTES, MESSAGES.outstanding],
    [OUTSTANDING_MIN_MINUTES - 1, MESSAGES.solid],
    [SOLID_MIN_MINUTES, MESSAGES.solid],
    [SOLID_MIN_MINUTES - 1, MESSAGES.room],
    [ROOM_MIN_MINUTES, MESSAGES.room],
    [ROOM_MIN_MINUTES - 1, MESSAGES.tough],
  ])("net %i returns %s", (netMinutes, message) => {
    expect(getMotivationalMessage(makeSummary(netMinutes))).toBe(message);
  });
});
