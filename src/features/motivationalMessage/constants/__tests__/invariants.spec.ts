import { DAY_PHASE } from "../../types/day-phase";
import { DAY_PHASE_START_HOUR } from "../day-phase";
import { NET_BAND } from "../../types/net-band";
import { NET_BAND_MIN_MINUTES } from "../net-band";
import { SLOWING_DOWN_CUTOFF_HOUR } from "../pace-trend";

describe("motivational message constants", () => {
  it("starts Day Phases in order through the day", () => {
    const { morning, afternoon, evening, night } = DAY_PHASE_START_HOUR;

    expect(morning).toBeLessThan(afternoon);
    expect(afternoon).toBeLessThan(evening);
    expect(evening).toBeLessThan(night);
  });

  it("mutes Slowing Down during the Evening, before Night takes over", () => {
    expect(SLOWING_DOWN_CUTOFF_HOUR).toBeGreaterThanOrEqual(
      DAY_PHASE_START_HOUR[DAY_PHASE.EVENING],
    );
    expect(SLOWING_DOWN_CUTOFF_HOUR).toBeLessThan(
      DAY_PHASE_START_HOUR[DAY_PHASE.NIGHT],
    );
  });

  it("orders Net Band thresholds from best to worst", () => {
    expect(NET_BAND_MIN_MINUTES[NET_BAND.OUTSTANDING]).toBeGreaterThan(
      NET_BAND_MIN_MINUTES[NET_BAND.STEADY],
    );
    expect(NET_BAND_MIN_MINUTES[NET_BAND.STEADY]).toBeGreaterThan(
      NET_BAND_MIN_MINUTES[NET_BAND.BEHIND],
    );
  });
});
