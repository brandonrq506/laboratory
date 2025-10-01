import type { QueryClient } from "@tanstack/react-query";
import { activityListQueryOptions } from "@/features/activities/api/queries";

export const getActivityFromCache = (
  queryClient: QueryClient,
  activityId: number,
) => {
  const activitiesList = queryClient.getQueryData(
    activityListQueryOptions().queryKey,
  );

  const activity = activitiesList?.find((item) => item.id === activityId);

  if (!activity) {
    console.error(
      `Activity ${activityId} should exist in cache before creating a routine activity.`,
    );
    return null;
  }

  return activity;
};
