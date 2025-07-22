import { getNewTaskDefaultTimes } from "../getNewTaskDefaultTimes";

describe("getNewTaskDefaultTimes", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("should return the current hour when more than 15 minutes into the hour", () => {
    // Set date to 14:16
    const mockDate = new Date(2023, 1, 1, 14, 16, 0);
    vi.setSystemTime(mockDate);

    expect(getNewTaskDefaultTimes()).toBe("14:00");
  });

  it("should return the previous hour when 15 minutes or less into the hour", () => {
    // Set date to 14:15
    const mockDate = new Date(2023, 1, 1, 14, 15, 0);
    vi.setSystemTime(mockDate);

    expect(getNewTaskDefaultTimes()).toBe("13:00");
  });

  it("should handle midnight case correctly by returning 23:00", () => {
    // Set date to 00:10
    const mockDate = new Date(2023, 1, 1, 0, 10, 0);
    vi.setSystemTime(mockDate);

    expect(getNewTaskDefaultTimes()).toBe("23:00");
  });
});
