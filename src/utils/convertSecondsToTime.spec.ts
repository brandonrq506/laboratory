import { convertSecondsToTime } from "./convertSecondsToTime";

describe("convertSecondsToTime", () => {
  it("throws an error when seconds is negative", () => {
    const seconds = -1;
    const expected = "Seconds must be a positive number";
    expect(() => convertSecondsToTime(seconds)).toThrow(expected);
  });

  it("throws an error when seconds is greater than a day", () => {
    const seconds = 86401;
    const expected = "Seconds must be less than a day";
    expect(() => convertSecondsToTime(seconds)).toThrow(expected);
  });

  it("returns '0s' when seconds is 0", () => {
    const seconds = 0;
    expect(convertSecondsToTime(seconds)).toBe("0s");
  });

  it("returns '59s' when seconds is 59", () => {
    const seconds = 59;
    expect(convertSecondsToTime(seconds)).toBe("59s");
  });

  it("returns '1:01m' when seconds is 61", () => {
    const seconds = 61;
    expect(convertSecondsToTime(seconds)).toBe("1:01m");
  });

  it("returns '30m' when seconds is 1800", () => {
    const seconds = 1800;
    expect(convertSecondsToTime(seconds)).toBe("30m");
  });

  it("returns 1h when seconds is 3600", () => {
    const seconds = 3600;
    expect(convertSecondsToTime(seconds)).toBe("1h");
  });

  it("returns '1:00:54h' when seconds is 3654", () => {
    const seconds = 3654;
    expect(convertSecondsToTime(seconds)).toBe("1:00:54h");
  });

  it("returns '1:30h' when seconds is 5400", () => {
    const seconds = 5400;
    expect(convertSecondsToTime(seconds)).toBe("1:30h");
  });

  it("returns '23:59:59h' when seconds is 86399", () => {
    const seconds = 86399;
    expect(convertSecondsToTime(seconds)).toBe("23:59:59h");
  });

  it("returns '24h' when seconds is 86400", () => {
    const seconds = 86400;
    expect(convertSecondsToTime(seconds)).toBe("24h");
  });

  it("returns '1:30h' when seconds is a float", () => {
    const seconds = 5400.345;
    expect(convertSecondsToTime(seconds)).toBe("1:30h");
  });
});
