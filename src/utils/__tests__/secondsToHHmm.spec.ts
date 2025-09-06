import { secondsToHHmm } from "../secondsToHHmm";

describe("secondsToHHmm", () => {
  it("returns 00:01 for 60 seconds", () => {
    expect(secondsToHHmm(60)).toBe("00:01");
  });

  it("returns 23:59 for 86399 seconds (last minute of day)", () => {
    expect(secondsToHHmm(86399)).toBe("23:59");
  });

  it("throws when seconds is negative", () => {
    expect(() => secondsToHHmm(-1)).toThrow(
      "Seconds must be a positive number. Received: -1",
    );
  });
});
