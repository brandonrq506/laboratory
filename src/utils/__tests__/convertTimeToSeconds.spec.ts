import { convertTimeToSeconds } from "../convertTimeToSeconds";

describe("convertSecondsToHHMMSS", () => {
  it("throws when time is empty", () => {
    expect(() => convertTimeToSeconds("")).toThrow("Time cannot be empty");
  });

  it("throws when time is zero", () => {
    expect(() => convertTimeToSeconds("00:00")).toThrow("Time cannot be 00:00");
  });

  it("throws when time does not have proper separator", () => {
    expect(() => convertTimeToSeconds("00-00")).toThrow(
      "Time must be in the format HH:MM",
    );
  });

  it("throws when time contains letters", () => {
    expect(() => convertTimeToSeconds("00:0a")).toThrow(
      "Time cannot contain letters",
    );
  });

  it("converts '01:30' to seconds", () => {
    const expected = 5400;
    expect(convertTimeToSeconds("01:30")).toBe(expected);
  });
});
