import { format, isValid, parse } from "date-fns";

// Validates date search parameters
const today = () => format(new Date(), "yyyy-MM-dd");

export const validateDateSearch = (param: string | undefined) => {
  if (!param) return { date: today() };

  if (param === "today") return { date: today() };

  const parsed = parse(param, "yyyy-MM-dd", new Date());
  if (!isValid(parsed)) return { date: today() };
  if (format(parsed, "yyyy-MM-dd") !== param) return { date: today() };

  return {
    date: param,
  };
};
