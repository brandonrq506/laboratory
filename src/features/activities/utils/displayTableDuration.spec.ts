import { displayTableDuration } from "./displayTableDuration";

describe("displayTableDuration", () => {
  it("should return N/A when avg_time is null", () => {
    const result = displayTableDuration(null);
    expect(result).toBe("N/A");
  });

  it("should return the time in HH:MM:SS format", () => {
    const result = displayTableDuration(3600);
    expect(result).toBe("01:00:00");
  });
});
