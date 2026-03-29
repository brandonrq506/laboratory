import { isFuture, parse } from "date-fns";
import { redirect } from "@tanstack/react-router";

const DATE_FORMAT = "yyyy-MM-dd";

const parseDate = (date: string) => parse(date, DATE_FORMAT, new Date());

export const redirectHistoryFutureDate = (date: string) => {
  if (isFuture(parseDate(date))) {
    throw redirect({ to: "/scheduled", search: { date } });
  }
};

export const redirectScheduledPastDate = (date: string) => {
  if (!isFuture(parseDate(date))) {
    throw redirect({ to: "/history", search: { date } });
  }
};
