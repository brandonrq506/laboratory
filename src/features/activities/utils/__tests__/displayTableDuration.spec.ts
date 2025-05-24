import { displayTableDuration } from "../displayTableDuration";

describe("displayTableDuration", () => {
  it("should return the time in HH:MM:SS format", () => {
    const result = displayTableDuration(3600);
    expect(result).toBe("01:00");
  });
});
