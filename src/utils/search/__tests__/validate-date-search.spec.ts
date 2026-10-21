import { validateDateSearch } from "../validate-date-search";

describe("validateDateSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes a valid date through", () => {
    expect(validateDateSearch("2026-02-28")).toEqual({ date: "2026-02-28" });
  });

  it.each([
    ["a non-existent calendar date", "2026-02-30"],
    ["garbage", "garbage"],
    ["a wrong format", "02-28-2026"],
    ["an empty string", ""],
    ["undefined", undefined],
  ])("falls back to today for %s", (_label, input) => {
    expect(validateDateSearch(input)).toEqual({ date: "2026-06-15" });
  });

  it('resolves "today" to the current date', () => {
    expect(validateDateSearch("today")).toEqual({ date: "2026-06-15" });
  });
});
