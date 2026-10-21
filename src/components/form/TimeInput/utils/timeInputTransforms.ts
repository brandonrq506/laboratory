import type { TimeInputTransform } from "../types";

import { format, isValid, set } from "date-fns";
import { splitHHMM } from "@/utils";

const HHMM_FORMAT = "HH:mm";

/** Time of day with no date, e.g. a Routine start time. The form value is "HH:mm". */
export const wallClockTransform: TimeInputTransform = {
  input: (value) => value ?? "",
  output: (hhmm) => hhmm,
};

/** A moment on `date`, e.g. a Task start/end. The form value is an ISO string. */
export const instantOnTransform = (
  date: Date | string,
): TimeInputTransform => ({
  input: (iso) => {
    const instant = new Date(iso ?? "");

    return isValid(instant) ? format(instant, HHMM_FORMAT) : "";
  },
  output: (hhmm) => {
    if (!hhmm) return "";

    const [hours, minutes] = splitHHMM(hhmm);

    return set(new Date(date), { hours, minutes }).toISOString();
  },
});
