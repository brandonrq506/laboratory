import { adjustInProgressStartTime } from "../adjustInProgressStartTime";

describe("adjustInProgressStartTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("core functionality", () => {
    it("should return original time when start_time is in the future", () => {
      const currentTime = new Date("2025-08-23T20:33:33.000Z");
      vi.setSystemTime(currentTime);

      const futureStartTime = "2025-08-23T20:34:00.000Z";
      const result = adjustInProgressStartTime(futureStartTime);

      expect(result).toEqual(new Date(futureStartTime));
    });

    it("should floor seconds when same minute and seconds < 30", () => {
      const currentTime = new Date("2025-08-23T20:33:45.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:15.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date("2025-08-23T20:33:00.000Z"));
    });

    it("should return original time when same minute and seconds >= 30", () => {
      const currentTime = new Date("2025-08-23T20:33:45.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:45.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date(startTime));
    });

    it("should round to nearest minute when in different minutes", () => {
      const currentTime = new Date("2025-08-23T20:34:20.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:33.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date("2025-08-23T20:34:00.000Z"));
    });

    it("should return original when rounded time would exceed current time", () => {
      const currentTime = new Date("2025-08-23T20:34:15.000Z");
      vi.setSystemTime(currentTime);

      // This would round to 20:35:00 which exceeds current time 20:34:15
      const startTime = "2025-08-23T20:33:45.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date("2025-08-23T20:34:00.000Z"));
    });
  });

  describe("boundary conditions", () => {
    it("should handle exactly 30 seconds threshold", () => {
      const currentTime = new Date("2025-08-23T20:33:45.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:30.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date(startTime));
    });

    it("should handle 29 seconds (just under threshold)", () => {
      const currentTime = new Date("2025-08-23T20:33:45.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:29.000Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date("2025-08-23T20:33:00.000Z"));
    });

    it("should handle milliseconds correctly", () => {
      const currentTime = new Date("2025-08-23T20:35:00.000Z");
      vi.setSystemTime(currentTime);

      const startTime = "2025-08-23T20:33:33.456Z";
      const result = adjustInProgressStartTime(startTime);

      expect(result).toEqual(new Date("2025-08-23T20:34:00.000Z"));
    });
  });
});
