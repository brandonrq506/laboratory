import { ACTIVITIES_ENDPOINT } from "@/libs/axios";

export const activityKeys = {
  all: [{ endpoint: ACTIVITIES_ENDPOINT }] as const,
  lists: () => [{ ...activityKeys.all[0], entity: "list" }] as const,
  details: () => [{ ...activityKeys.all[0], entity: "details" }] as const,
  detail: (activityId: number) =>
    [{ ...activityKeys.details()[0], activityId }] as const,
};
