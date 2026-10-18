import { MINUS_SIGN } from "../../constants/performance";
import { formatPerformanceDelta } from "../formatPerformanceDelta";

describe("formatPerformanceDelta", () => {
  it("prefixes positive minutes with plus", () => {
    expect(formatPerformanceDelta(12)).toBe("+12m");
  });

  it("prefixes negative minutes with typographic minus", () => {
    expect(formatPerformanceDelta(-1)).toBe(`${MINUS_SIGN}1m`);
  });

  it("keeps minutes past an hour", () => {
    expect(formatPerformanceDelta(-90)).toBe(`${MINUS_SIGN}90m`);
  });

  it("shows zero without sign", () => {
    expect(formatPerformanceDelta(0)).toBe("0m");
  });
});
