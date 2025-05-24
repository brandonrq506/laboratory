import { secondsToHHmm } from "@/utils";

export const displayTableDuration = (exp_seconds: number | null) => {
  if (exp_seconds === null) return "N/A";
  return secondsToHHmm(exp_seconds);
};
