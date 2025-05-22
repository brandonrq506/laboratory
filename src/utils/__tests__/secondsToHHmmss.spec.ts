import { secondsToHHmmss } from "../secondsToHHmmss";

describe("secondsToHHmmss", () => {
  it("should convert 0 seconds to 00:00:00", () => {
    const seconds = 0;
    const expected = "00:00:00";
    const result = secondsToHHmmss(seconds);
    expect(result).toBe(expected);
  });

  it("should convert 1 second to 00:00:01", () => {
    const seconds = 1;
    const expected = "00:00:01";
    const result = secondsToHHmmss(seconds);
    expect(result).toBe(expected);
  });

  it("should convert 60 seconds to 00:01:00", () => {
    const seconds = 60;
    const expected = "00:01:00";
    const result = secondsToHHmmss(seconds);
    expect(result).toBe(expected);
  });

  it("should convert 3600 seconds to 01:00:00", () => {
    const seconds = 3600;
    const expected = "01:00:00";
    const result = secondsToHHmmss(seconds);
    expect(result).toBe(expected);
  });

  it("should convert 3661 seconds to 01:01:01", () => {
    const seconds = 3661;
    const expected = "01:01:01";
    const result = secondsToHHmmss(seconds);
    expect(result).toBe(expected);
  });

  it("throws an error when seconds is negative", () => {
    const seconds = -1;
    expect(() => secondsToHHmmss(seconds)).toThrow(
      "Seconds must be a positive number",
    );
  });

  it("returns '01:30:00' when seconds is a float", () => {
    const seconds = 5400.345;
    expect(secondsToHHmmss(seconds)).toBe("01:30:00");
  });
});
