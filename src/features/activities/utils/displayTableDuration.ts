import { convertSecondsToHHMMSS } from "@/utils";

export const displayTableDuration = (avg_time: number | null) => {
  if (avg_time === null) return "N/A";
  return convertSecondsToHHMMSS(avg_time);
};
