import { NET_BAND, type NetBand } from "../types/net-band";

/** Lowest Net Delta, in minutes, each band starts at; below Behind is Far Behind. */
export const NET_BAND_MIN_MINUTES = {
  [NET_BAND.OUTSTANDING]: 15,
  [NET_BAND.STEADY]: 0,
  [NET_BAND.BEHIND]: -30,
} satisfies Record<Exclude<NetBand, typeof NET_BAND.FAR_BEHIND>, number>;
