import { format } from "date-fns";

export const getToday = () => format(new Date(), "yyyy-MM-dd");
