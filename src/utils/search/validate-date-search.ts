import { format, isValid, parse } from "date-fns";
import { getToday } from "../getToday";

// Validates date search parameters
export const validateDateSearch = (param: string | undefined) => {
  if (!param) return { date: getToday() };

  if (param === "today") return { date: getToday() };

  const parsed = parse(param, "yyyy-MM-dd", new Date());
  if (!isValid(parsed)) return { date: getToday() };
  if (format(parsed, "yyyy-MM-dd") !== param) return { date: getToday() };

  return {
    date: param,
  };
};
