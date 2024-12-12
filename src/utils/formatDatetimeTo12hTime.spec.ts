import { formatDatetimeTo12hTime } from "./formatDatetimeTo12hTime";

describe("formatDatetimeTo12hTime", () => {
  it("should return 12-hour time format", () => {
    const datetime = "2021-09-17T12:00:00";
    const result = formatDatetimeTo12hTime(datetime);
    expect(result).toBe("12:00 PM");
  });
});
