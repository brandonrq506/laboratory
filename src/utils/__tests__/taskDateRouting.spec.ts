import { addDays, format, subDays } from "date-fns";
import { isRedirect } from "@tanstack/react-router";

import {
  redirectHistoryFutureDate,
  redirectScheduledPastDate,
} from "../taskDateRouting";
import { getToday } from "../getToday";

const getRedirect = (cb: () => void) => {
  try {
    cb();
  } catch (error) {
    return error;
  }

  throw new Error("Expected redirect");
};

describe("taskDateRouting", () => {
  it("redirects future history dates to scheduled", () => {
    const date = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const redirect = getRedirect(() => redirectHistoryFutureDate(date));

    expect(isRedirect(redirect)).toBe(true);
    const redirectObj = redirect as {
      options: { search: { date: string }; to: string };
    };

    expect(redirectObj.options.to).toBe("/scheduled");
    expect(redirectObj.options.search).toEqual({ date });
  });

  it("does not redirect non-future history dates", () => {
    const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

    expect(() => redirectHistoryFutureDate(yesterday)).not.toThrow();
    expect(() => redirectHistoryFutureDate(getToday())).not.toThrow();
  });

  it("redirects scheduled past-or-today dates to history", () => {
    const date = getToday();
    const redirect = getRedirect(() => redirectScheduledPastDate(date));

    expect(isRedirect(redirect)).toBe(true);
    const redirectObj = redirect as {
      options: { search: { date: string }; to: string };
    };

    expect(redirectObj.options.to).toBe("/history");
    expect(redirectObj.options.search).toEqual({ date });
  });

  it("does not redirect future scheduled dates", () => {
    const date = format(addDays(new Date(), 1), "yyyy-MM-dd");

    expect(() => redirectScheduledPastDate(date)).not.toThrow();
  });
});
