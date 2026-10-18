import { NET_BAND, type NetBand } from "../types/net-band";
import { NET_BAND_MIN_MINUTES } from "../constants/net-band";

/**
 * Classifies a day's Net Delta.
 *
 * @param netDelta - Net Delta in minutes.
 * @returns Its {@link NetBand}.
 */
export function getNetBand(netDelta: number): NetBand {
  if (netDelta >= NET_BAND_MIN_MINUTES[NET_BAND.OUTSTANDING])
    return NET_BAND.OUTSTANDING;
  if (netDelta >= NET_BAND_MIN_MINUTES[NET_BAND.STEADY]) return NET_BAND.STEADY;
  if (netDelta >= NET_BAND_MIN_MINUTES[NET_BAND.BEHIND]) return NET_BAND.BEHIND;
  return NET_BAND.FAR_BEHIND;
}
