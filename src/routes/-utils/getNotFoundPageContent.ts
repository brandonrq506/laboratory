import { ROUTE_NOT_FOUND_ENTITIES } from "@/constants/entities";
import type { RouteNotFoundData } from "@/types/core";

const DEFAULT_CONTENT = {
  title: "Page not found",
  description: "Sorry, we couldn't find the page you're looking for.",
} as const;

const isRouteNotFoundData = (data: unknown): data is RouteNotFoundData =>
  typeof data === "object" &&
  data !== null &&
  "entity" in data &&
  ROUTE_NOT_FOUND_ENTITIES.some((entity) => entity === data.entity);

export const getNotFoundPageContent = (data: unknown) => {
  if (!isRouteNotFoundData(data)) return DEFAULT_CONTENT;

  return {
    title: `${data.entity} not found`,
    description: `The ${data.entity.toLowerCase()} you're looking for doesn't exist or may have been deleted.`,
  };
};
