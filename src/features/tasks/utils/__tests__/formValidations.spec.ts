import { isInThePast } from "../formValidations";

describe("isInThePast", () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  it("should return true if the time is in the past", () => {
    const now = new Date("2025-01-29T17:30:00.000Z");
    const past = "2025-01-29T17:29:00.000Z";

    vi.setSystemTime(now);
    const result = isInThePast(past);
    expect(result).toBe(true);
  });

  it("should return false if the time is in the future", () => {
    const now = new Date("2025-01-29T17:30:00.000Z");
    const future = "2025-01-29T17:31:00.000Z";

    vi.setSystemTime(now);
    const result = isInThePast(future);
    expect(result).toBe(false);
  });
});
