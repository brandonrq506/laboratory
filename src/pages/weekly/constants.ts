import { minutesInHour, secondsInMinute } from "date-fns/constants";
const HOURS_PER_DAY = 24;

export const SECONDS_PER_PIXEL = 15;
export const SECONDS_PER_HOUR = secondsInMinute * minutesInHour;
export const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;
export const PIXELS_PER_HOUR = SECONDS_PER_HOUR / SECONDS_PER_PIXEL;
export const TIMELINE_HEIGHT = SECONDS_PER_DAY / SECONDS_PER_PIXEL;
