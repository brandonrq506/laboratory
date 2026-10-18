import { DAY_PHASE } from "../../types/day-phase";
import { getDayPhase } from "../getDayPhase";
import { parse } from "date-fns";

const BASE_DATE = new Date("2026-10-18T00:00:00");
const at = (label: string) => parse(label, "HH:mm", BASE_DATE);

describe("getDayPhase", () => {
  it.each([
    { label: "00:40", phase: DAY_PHASE.NIGHT },
    { label: "04:59", phase: DAY_PHASE.NIGHT },
    { label: "05:00", phase: DAY_PHASE.MORNING },
    { label: "11:59", phase: DAY_PHASE.MORNING },
    { label: "12:00", phase: DAY_PHASE.AFTERNOON },
    { label: "16:59", phase: DAY_PHASE.AFTERNOON },
    { label: "17:00", phase: DAY_PHASE.EVENING },
    { label: "20:59", phase: DAY_PHASE.EVENING },
    { label: "21:00", phase: DAY_PHASE.NIGHT },
    { label: "23:59", phase: DAY_PHASE.NIGHT },
  ])("returns $phase at $label", ({ label, phase }) => {
    expect(getDayPhase(at(label))).toBe(phase);
  });
});
