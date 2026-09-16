import type { ROUTE_NOT_FOUND_ENTITIES } from "@/constants/entities";

export type RouteNotFoundEntity = (typeof ROUTE_NOT_FOUND_ENTITIES)[number];

export interface RouteNotFoundData {
  entity: RouteNotFoundEntity;
}
