import { NET_BAND } from "../../types/net-band";
import { NET_BAND_MIN_MINUTES } from "../../constants/net-band";
import { getNetBand } from "../getNetBand";

const OUTSTANDING_MIN = NET_BAND_MIN_MINUTES[NET_BAND.OUTSTANDING];
const STEADY_MIN = NET_BAND_MIN_MINUTES[NET_BAND.STEADY];
const BEHIND_MIN = NET_BAND_MIN_MINUTES[NET_BAND.BEHIND];

describe("getNetBand", () => {
  it.each([
    { netDelta: OUTSTANDING_MIN, band: NET_BAND.OUTSTANDING },
    { netDelta: OUTSTANDING_MIN - 1, band: NET_BAND.STEADY },
    { netDelta: STEADY_MIN, band: NET_BAND.STEADY },
    { netDelta: STEADY_MIN - 1, band: NET_BAND.BEHIND },
    { netDelta: BEHIND_MIN, band: NET_BAND.BEHIND },
    { netDelta: BEHIND_MIN - 1, band: NET_BAND.FAR_BEHIND },
  ])("returns $band at a Net Delta of $netDelta", ({ netDelta, band }) => {
    expect(getNetBand(netDelta)).toBe(band);
  });
});
