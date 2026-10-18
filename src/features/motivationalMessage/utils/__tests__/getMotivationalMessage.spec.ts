import {
  EMPTY_PHRASES,
  MILESTONE_PHRASES,
  NET_BAND_PHRASES,
  NIGHT_PHRASES,
  PACE_TREND_PHRASES,
} from "../../constants/phrases";
import { DAY_OUTCOME } from "../../types/day-outcome";
import { DAY_PHASE } from "../../types/day-phase";
import { NET_BAND } from "../../types/net-band";
import { PACE_TREND } from "../../types/pace-trend";
import { getMotivationalMessage } from "../getMotivationalMessage";
import { makeCompletedDay } from "@/test/utils/make-completed-task";
import { parse } from "date-fns";

const BASE_DATE = new Date("2026-10-18T00:00:00");
const at = (label: string) => parse(label, "HH:mm", BASE_DATE);

const message = (deltas: number[], time: string) =>
  getMotivationalMessage({ tasks: makeCompletedDay(deltas), now: at(time) });

const milestones = (count: number) =>
  MILESTONE_PHRASES.map((phrase) => phrase(count));

/** Deltas with no Pace Trend: last 3 match the earlier average. */
const flat = (count: number, delta = 0) =>
  Array.from({ length: count }, () => delta);

describe("getMotivationalMessage", () => {
  it.each([
    { time: "09:00", phase: DAY_PHASE.MORNING },
    { time: "14:00", phase: DAY_PHASE.AFTERNOON },
    { time: "18:00", phase: DAY_PHASE.EVENING },
    { time: "22:00", phase: DAY_PHASE.NIGHT },
  ])("invites a first task by Day Phase at $time", ({ time, phase }) => {
    expect(EMPTY_PHRASES[phase]).toContain(message([], time));
  });

  describe("one day, in order", () => {
    it("09:10 · 4 done · +5m → steady morning", () => {
      expect(NET_BAND_PHRASES[NET_BAND.STEADY][DAY_PHASE.MORNING]).toContain(
        message([2, 1, 1, 1], "09:10"),
      );
    });

    it("09:50 · 5 done → milestone", () => {
      expect(milestones(5)).toContain(message([2, 1, 1, 1, 3], "09:50"));
    });

    it("10:30 · 6 done → back to steady", () => {
      expect(NET_BAND_PHRASES[NET_BAND.STEADY][DAY_PHASE.MORNING]).toContain(
        message([2, 1, 1, 1, 3, 0], "10:30"),
      );
    });

    it("13:00 · last 3 slower → slowing down", () => {
      expect(PACE_TREND_PHRASES[PACE_TREND.SLOWING_DOWN]).toContain(
        message([...flat(6), -7, -7, -6], "13:00"),
      );
    });

    it("13:40 · 10 done → milestone beats trend", () => {
      expect(milestones(10)).toContain(
        message([...flat(6), -7, -7, -6, -5], "13:40"),
      );
    });

    it("14:30 · −60m but last 3 faster → speeding up", () => {
      expect(PACE_TREND_PHRASES[PACE_TREND.SPEEDING_UP]).toContain(
        message([-9, -9, -9, -9, -8, -8, -7, -7, 2, 2, 2], "14:30"),
      );
    });

    it("20:40 · 15 done → milestone, still Evening", () => {
      expect(milestones(15)).toContain(message([...flat(14), -10], "20:40"));
    });

    it("21:20 · behind → off-track wrap-up", () => {
      expect(NIGHT_PHRASES[DAY_OUTCOME.OFF_TRACK]).toContain(
        message([...flat(15), -5], "21:20"),
      );
    });

    it("21:30 · back to 15 done → Night beats milestone", () => {
      expect(NIGHT_PHRASES[DAY_OUTCOME.OFF_TRACK]).toContain(
        message([...flat(14), -5], "21:30"),
      );
    });
  });

  it("14:25 · −60m with no trend → catch up, not a fresh start", () => {
    const afternoonMessage = message([-30, -30], "14:25");

    expect(
      NET_BAND_PHRASES[NET_BAND.FAR_BEHIND][DAY_PHASE.AFTERNOON],
    ).toContain(afternoonMessage);
    expect(NIGHT_PHRASES[DAY_OUTCOME.OFF_TRACK]).not.toContain(
      afternoonMessage,
    );
  });

  it("wraps up an even or ahead day as on track at Night", () => {
    expect(NIGHT_PHRASES[DAY_OUTCOME.ON_TRACK]).toContain(
      message(flat(3), "23:00"),
    );
  });

  it("treats after midnight as Night, not a strong start", () => {
    expect(NIGHT_PHRASES[DAY_OUTCOME.ON_TRACK]).toContain(
      message(flat(3, 10), "00:40"),
    );
  });

  describe("Slowing Down cutoff", () => {
    const slowingDown = [4, 4, 4, 0, 0, -1];

    it("calls out Slowing Down before the cutoff", () => {
      expect(PACE_TREND_PHRASES[PACE_TREND.SLOWING_DOWN]).toContain(
        message(slowingDown, "19:59"),
      );
    });

    it("falls back to the Net Band from the cutoff", () => {
      expect(NET_BAND_PHRASES[NET_BAND.STEADY][DAY_PHASE.EVENING]).toContain(
        message(slowingDown, "20:15"),
      );
    });

    it("keeps Speeding Up after the cutoff", () => {
      expect(PACE_TREND_PHRASES[PACE_TREND.SPEEDING_UP]).toContain(
        message([0, 0, 0, 4, 4, 4], "20:30"),
      );
    });
  });

  it("keeps the same phrase for the same day and count", () => {
    expect(message([2, 1, 1, 1], "09:10")).toBe(message([2, 1, 1, 1], "11:45"));
  });
});
