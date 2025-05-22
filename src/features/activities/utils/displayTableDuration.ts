import { secondsToHHmm } from "@/utils";

export const displayTableDuration = (avg_time: number | null) => {
  if (avg_time === null) return "N/A";
  return secondsToHHmm(avg_time);
};
