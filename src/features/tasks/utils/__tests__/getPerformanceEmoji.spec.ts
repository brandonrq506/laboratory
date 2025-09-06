import { getPerformanceEmoji } from "../getPerformanceEmoji";

import { activities } from "@/test/store/activities";

const baseActivity = activities[0];

describe("getPerformanceEmoji", () => {
  it("> max returns snail", () => {
    const activity = baseActivity;
    expect(
      getPerformanceEmoji({
        activity,
        duration_seconds: activity.max_seconds + 1,
      }),
    ).toBe("🐌");
  });

  it("> exp returns turtle", () => {
    const activity = baseActivity;
    expect(
      getPerformanceEmoji({
        activity,
        duration_seconds: activity.exp_seconds + 1,
      }),
    ).toBe("🐢");
  });

  it("<= exp returns rocket", () => {
    const activity = baseActivity;
    expect(
      getPerformanceEmoji({ activity, duration_seconds: activity.exp_seconds }),
    ).toBe("🚀");
  });
});
