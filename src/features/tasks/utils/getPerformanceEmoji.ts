import { ActivityAPI } from "@/features/activities/types/activityAPI";

interface Props {
  activity: ActivityAPI;
  duration_seconds: number;
}

export function getPerformanceEmoji({ activity, duration_seconds }: Props) {
  const { exp_seconds, max_seconds } = activity;

  if (duration_seconds > max_seconds) {
    return "🐌";
  } else if (duration_seconds > exp_seconds) {
    return "🐢";
  }
  return "🚀";
}
