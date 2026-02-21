import type { PerformanceSummary } from "../getPerformanceSummary";

import { MESSAGES, getMotivationalMessage } from "../getMotivationalMessage";

const makeSummary = (
  overrides: Partial<PerformanceSummary> = {},
): PerformanceSummary => ({
  rocket: 0,
  turtle: 0,
  snail: 0,
  total: 0,
  rocketPct: 0,
  turtlePct: 0,
  snailPct: 0,
  ...overrides,
});

describe("getMotivationalMessage", () => {
  it("returns empty message when total is 0", () => {
    expect(getMotivationalMessage(makeSummary())).toBe(MESSAGES.empty);
  });

  it("returns outstanding when rocketPct >= 80", () => {
    expect(
      getMotivationalMessage(makeSummary({ total: 5, rocketPct: 80 })),
    ).toBe(MESSAGES.outstanding);
  });

  it("returns solid when rocketPct >= 50 but < 80", () => {
    expect(
      getMotivationalMessage(makeSummary({ total: 4, rocketPct: 50 })),
    ).toBe(MESSAGES.solid);
  });

  it("returns tough when snailPct >= 50", () => {
    expect(
      getMotivationalMessage(
        makeSummary({ total: 4, rocketPct: 25, snailPct: 50 }),
      ),
    ).toBe(MESSAGES.tough);
  });

  it("returns room to improve as default", () => {
    expect(
      getMotivationalMessage(
        makeSummary({ total: 4, rocketPct: 25, snailPct: 25 }),
      ),
    ).toBe(MESSAGES.room);
  });
});
