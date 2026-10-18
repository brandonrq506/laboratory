import { getPerformanceDeltaLabel } from "../getPerformanceDeltaLabel";

describe("getPerformanceDeltaLabel", () => {
  it("describes minutes ahead", () => {
    expect(getPerformanceDeltaLabel(12)).toBe("12 minutes ahead");
  });

  it("describes minutes late in singular", () => {
    expect(getPerformanceDeltaLabel(-1)).toBe("1 minute late");
  });

  it("keeps minutes past an hour", () => {
    expect(getPerformanceDeltaLabel(-90)).toBe("90 minutes late");
  });

  it("describes zero as on time", () => {
    expect(getPerformanceDeltaLabel(0)).toBe("On time");
  });
});
