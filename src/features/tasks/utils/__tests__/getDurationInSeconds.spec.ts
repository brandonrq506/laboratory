import { getDurationInSeconds } from "../getDurationInSeconds";

describe("getDurationInSeconds", () => {
  it("should return the difference between two dates in seconds", () => {
    const start = "2024-12-01T00:00:00.000Z";
    const end = "2024-12-01T00:10:00.000Z";
    const result = 600;

    expect(getDurationInSeconds(start, end)).toBe(result);
  });
});
