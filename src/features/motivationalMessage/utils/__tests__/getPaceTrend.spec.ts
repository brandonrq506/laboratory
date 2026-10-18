import {
  PACE_TREND_MIN_GAP_MINUTES,
  PACE_TREND_MIN_TASKS,
} from "../../constants/pace-trend";
import { PACE_TREND } from "../../types/pace-trend";
import { getPaceTrend } from "../getPaceTrend";
import { makeCompletedDay } from "@/test/utils/make-completed-task";

describe("getPaceTrend", () => {
  it(`returns null with fewer than ${PACE_TREND_MIN_TASKS} tasks`, () => {
    expect(getPaceTrend(makeCompletedDay([-15, 5, 5]))).toBeNull();
  });

  it("detects speeding up even while behind overall", () => {
    expect(getPaceTrend(makeCompletedDay([-15, -15, -15, 2, 2, 2]))).toBe(
      PACE_TREND.SPEEDING_UP,
    );
  });

  it("detects slowing down even while ahead overall", () => {
    expect(getPaceTrend(makeCompletedDay([20, 20, 5, 5, 5]))).toBe(
      PACE_TREND.SLOWING_DOWN,
    );
  });

  it(`returns null when the gap is under ${PACE_TREND_MIN_GAP_MINUTES}m per task`, () => {
    expect(getPaceTrend(makeCompletedDay([0, 2, 2, 2]))).toBeNull();
  });

  it(`counts a gap of exactly ${PACE_TREND_MIN_GAP_MINUTES}m per task`, () => {
    expect(getPaceTrend(makeCompletedDay([0, 3, 3, 3]))).toBe(
      PACE_TREND.SPEEDING_UP,
    );
  });

  it("counts an exact gap whose averages are fractional", () => {
    expect(getPaceTrend(makeCompletedDay([7, 0, 0, 16, 0, 0]))).toBe(
      PACE_TREND.SPEEDING_UP,
    );
    expect(getPaceTrend(makeCompletedDay([16, 0, 0, 7, 0, 0]))).toBe(
      PACE_TREND.SLOWING_DOWN,
    );
  });

  it("orders tasks by end time, not input order", () => {
    const newestFirst = makeCompletedDay([-15, -15, 2, 2, 2]).toReversed();

    expect(getPaceTrend(newestFirst)).toBe(PACE_TREND.SPEEDING_UP);
  });
});
