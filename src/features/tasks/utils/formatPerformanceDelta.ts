import { MINUS_SIGN, MINUTE_SUFFIX, PLUS_SIGN } from "../constants/performance";

const getSign = (minutes: number) => {
  if (minutes > 0) return PLUS_SIGN;
  if (minutes < 0) return MINUS_SIGN;
  return "";
};

/** e.g. "+12m", "−90m", "0m". */
export const formatPerformanceDelta = (minutes: number) =>
  `${getSign(minutes)}${Math.abs(minutes)}${MINUTE_SUFFIX}`;
