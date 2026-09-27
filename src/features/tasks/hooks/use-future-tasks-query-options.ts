import { getRouteApi } from "@tanstack/react-router";

import { futureTasksQueryOptions } from "@/features/tasks/api/queries";

const routeApi = getRouteApi("/__protected/scheduled");

/**
 * The /scheduled page's list cache, bound to the route's `date`. The list and
 * every mutation on it read it from here, so they share one cache.
 */
export const useFutureTasksQueryOptions = () =>
  futureTasksQueryOptions(routeApi.useSearch().date);
