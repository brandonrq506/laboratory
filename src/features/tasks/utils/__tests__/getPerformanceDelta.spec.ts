import { PERFORMANCE_TIER } from "../../types/performance-tier";
import { activities } from "@/test/store/activities";
import { getPerformanceDelta } from "../getPerformanceDelta";

const activity = { ...activities[0], exp_seconds: 1800, max_seconds: 2700 };

describe("getPerformanceDelta", () => {
  it("finishing early is ahead with positive minutes", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 1500 })).toEqual({
      minutes: 5,
      tier: PERFORMANCE_TIER.AHEAD,
    });
  });

  it("finishing exactly on expected time is on time", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 1800 })).toEqual({
      minutes: 0,
      tier: PERFORMANCE_TIER.ON_TIME,
    });
  });

  it("over expected but within max is late", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 2400 })).toEqual({
      minutes: -10,
      tier: PERFORMANCE_TIER.LATE,
    });
  });

  it("exactly at max is still late", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 2700 })).toEqual({
      minutes: -15,
      tier: PERFORMANCE_TIER.LATE,
    });
  });

  it("over max is over", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 7200 })).toEqual({
      minutes: -90,
      tier: PERFORMANCE_TIER.OVER,
    });
  });

  it("rounds legacy durations with seconds to nearest minute", () => {
    expect(getPerformanceDelta({ activity, duration_seconds: 1780 })).toEqual({
      minutes: 0,
      tier: PERFORMANCE_TIER.ON_TIME,
    });
    expect(getPerformanceDelta({ activity, duration_seconds: 1820 })).toEqual({
      minutes: 0,
      tier: PERFORMANCE_TIER.ON_TIME,
    });
    expect(getPerformanceDelta({ activity, duration_seconds: 1740 })).toEqual({
      minutes: 1,
      tier: PERFORMANCE_TIER.AHEAD,
    });
  });
});
