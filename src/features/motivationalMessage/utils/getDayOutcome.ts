import { DAY_OUTCOME, type DayOutcome } from "../types/day-outcome";
import { NET_BAND } from "../types/net-band";
import { NET_BAND_MIN_MINUTES } from "../constants/net-band";

/** On Track when the Net Delta is Steady or better, Off Track when behind. */
export function getDayOutcome(netDelta: number): DayOutcome {
  return netDelta >= NET_BAND_MIN_MINUTES[NET_BAND.STEADY]
    ? DAY_OUTCOME.ON_TRACK
    : DAY_OUTCOME.OFF_TRACK;
}
