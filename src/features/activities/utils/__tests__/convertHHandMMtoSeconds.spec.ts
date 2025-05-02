import { convertHHandMMtoSeconds } from "../convertHHandMMtoSeconds";

describe("convertHHandMMtoSeconds", () => {
  it("should convert 0 hours and 0 minutes to 0 seconds", () => {
    expect(convertHHandMMtoSeconds({ hours: 0, minutes: 0 })).toBe(0);
  });

  it("should convert 1 hour and 0 minutes to 3600 seconds", () => {
    expect(convertHHandMMtoSeconds({ hours: 1, minutes: 0 })).toBe(3600);
  });

  it("should convert 0 hours and 1 minute to 60 seconds", () => {
    expect(convertHHandMMtoSeconds({ hours: 0, minutes: 1 })).toBe(60);
  });

  it("should convert 1 hour and 1 minute to 3660 seconds", () => {
    expect(convertHHandMMtoSeconds({ hours: 1, minutes: 1 })).toBe(3660);
  });

  it("should throw an error for negative hours", () => {
    expect(() => convertHHandMMtoSeconds({ hours: -1, minutes: 0 })).toThrow(
      "Invalid time: -1 hours and 0 minutes",
    );
  });

  it("should throw an error for negative minutes", () => {
    expect(() => convertHHandMMtoSeconds({ hours: 0, minutes: -1 })).toThrow(
      "Invalid time: 0 hours and -1 minutes",
    );
  });
});
