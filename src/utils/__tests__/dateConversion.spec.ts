import { localDateToUtc, utcToLocalDate } from "../dateConversion";

describe("utcToLocalDate", () => {
  it("should return a yyyy-MM-dd string", () => {
    const result = utcToLocalDate("2026-03-21T12:00:00.000Z");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("localDateToUtc", () => {
  it("should return an ISO string", () => {
    const result = localDateToUtc("2026-03-21");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
  });
});

describe("round-trip", () => {
  it("should preserve the date through a round-trip", () => {
    const date = "2026-06-15";
    const utc = localDateToUtc(date);
    const back = utcToLocalDate(utc);
    expect(back).toBe(date);
  });
});
