import { convertSecondsToHHandMM } from "../convertSecondsToHHandMM";

describe("convertSecondsToHHMMSS", () => {
  it("should convert 0 seconds to 0 hours and 0 minutes", () => {
    expect(convertSecondsToHHandMM(0)).toEqual({ hours: 0, minutes: 0 });
  });

  it("should convert 3600 seconds to 1 hour and 0 minutes", () => {
    expect(convertSecondsToHHandMM(3600)).toEqual({ hours: 1, minutes: 0 });
  });

  it("should convert 60 seconds to 0 hours and 1 minute", () => {
    expect(convertSecondsToHHandMM(60)).toEqual({ hours: 0, minutes: 1 });
  });

  it("should convert 3660 seconds to 1 hour and 1 minute", () => {
    expect(convertSecondsToHHandMM(3660)).toEqual({ hours: 1, minutes: 1 });
  });

  it("should throw an error for negative seconds", () => {
    expect(() => convertSecondsToHHandMM(-1)).toThrow(
      "Seconds must be a positive number. Received: -1",
    );
  });
});
