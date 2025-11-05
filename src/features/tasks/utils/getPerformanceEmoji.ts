import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";

interface Props {
  activity: ActivityWithCategory;
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
