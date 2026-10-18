import { MINUS_SIGN, MINUTE_SUFFIX, PLUS_SIGN } from "../constants/performance";

const getSign = (minutes: number) => {
  if (minutes > 0) return PLUS_SIGN;
  if (minutes < 0) return MINUS_SIGN;
  return "";
};

/**
 * Formats minutes won or lost as a signed, compact label.
 *
 * @param minutes - Minutes won (positive) or lost (negative).
 * @returns The signed minutes with an `m` suffix, unsigned when zero.
 *
 * @example
 * formatPerformanceDelta(12); // "+12m"
 * formatPerformanceDelta(-90); // "−90m"
 * formatPerformanceDelta(0); // "0m"
 */
export const formatPerformanceDelta = (minutes: number) =>
  `${getSign(minutes)}${Math.abs(minutes)}${MINUTE_SUFFIX}`;
