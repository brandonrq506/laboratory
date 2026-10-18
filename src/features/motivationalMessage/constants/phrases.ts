import { DAY_OUTCOME, type DayOutcome } from "../types/day-outcome";
import {
  DAY_PHASE,
  type DayPhase,
  type DaytimePhase,
} from "../types/day-phase";
import { NET_BAND, type NetBand } from "../types/net-band";
import { PACE_TREND, type PaceTrend } from "../types/pace-trend";
import type { MilestonePhrase } from "../types/milestone-phrase";
import type { Variants } from "../types/variants";

export const EMPTY_PHRASES = {
  [DAY_PHASE.MORNING]: ["Let's get started"],
  [DAY_PHASE.AFTERNOON]: ["Not too late to start"],
  [DAY_PHASE.EVENING]: ["Still time for one"],
  [DAY_PHASE.NIGHT]: ["Fresh start tomorrow"],
} satisfies Record<DayPhase, Variants>;

export const NIGHT_PHRASES = {
  [DAY_OUTCOME.ON_TRACK]: ["Great day, rest up", "Well earned rest"],
  [DAY_OUTCOME.OFF_TRACK]: ["Fresh start tomorrow", "Rest up, reset"],
} satisfies Record<DayOutcome, Variants>;

export const MILESTONE_PHRASES = [
  (count) => `${count} done, nice!`,
  (count) => `${count} down, keep going`,
] satisfies Variants<MilestonePhrase>;

export const PACE_TREND_PHRASES = {
  [PACE_TREND.SPEEDING_UP]: ["Picking up pace", "Finding your rhythm"],
  [PACE_TREND.SLOWING_DOWN]: ["Pace slipping a bit", "Refocus, you got it"],
} satisfies Record<PaceTrend, Variants>;

export const NET_BAND_PHRASES = {
  [NET_BAND.OUTSTANDING]: {
    [DAY_PHASE.MORNING]: ["Strong start!", "On a roll"],
    [DAY_PHASE.AFTERNOON]: ["Crushing it", "On a roll"],
    [DAY_PHASE.EVENING]: ["Finish strong!"],
  },
  [NET_BAND.STEADY]: {
    [DAY_PHASE.MORNING]: ["Good start", "Steady pace"],
    [DAY_PHASE.AFTERNOON]: ["Right on track", "Steady pace"],
    [DAY_PHASE.EVENING]: ["Solid day so far"],
  },
  [NET_BAND.BEHIND]: {
    [DAY_PHASE.MORNING]: ["Easy catch-up"],
    [DAY_PHASE.AFTERNOON]: ["Close the gap"],
    [DAY_PHASE.EVENING]: ["Close the gap"],
  },
  [NET_BAND.FAR_BEHIND]: {
    [DAY_PHASE.MORNING]: ["Plenty of day left"],
    [DAY_PHASE.AFTERNOON]: ["Time to catch up"],
    [DAY_PHASE.EVENING]: ["Finish strong"],
  },
} satisfies Record<NetBand, Record<DaytimePhase, Variants>>;
