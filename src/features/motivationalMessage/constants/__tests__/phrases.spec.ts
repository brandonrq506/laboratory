import {
  EMPTY_PHRASES,
  MILESTONE_PHRASES,
  NET_BAND_PHRASES,
  NIGHT_PHRASES,
  PACE_TREND_PHRASES,
} from "../phrases";
import { MAX_MESSAGE_LENGTH } from "../motivational-message";

/** Largest count a milestone realistically shows; widest number to fit. */
const WIDEST_MILESTONE_COUNT = 100;
const EM_DASH = "—";

const ALL_PHRASES = [
  ...Object.values(EMPTY_PHRASES),
  ...Object.values(NET_BAND_PHRASES).flatMap(Object.values),
  ...Object.values(PACE_TREND_PHRASES),
  ...Object.values(NIGHT_PHRASES),
  MILESTONE_PHRASES.map((phrase) => phrase(WIDEST_MILESTONE_COUNT)),
].flat();

describe("phrases", () => {
  it.each(ALL_PHRASES)(
    `"%s" fits in ${MAX_MESSAGE_LENGTH} characters, single clause`,
    (phrase) => {
      expect(phrase.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH);
      expect(phrase).not.toContain(EM_DASH);
    },
  );
});
