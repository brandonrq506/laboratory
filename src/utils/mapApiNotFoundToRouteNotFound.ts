import { HttpStatusCode, isAxiosError } from "axios";
import type { RouteNotFoundData } from "@/types/core";
import { notFound } from "@tanstack/react-router";

export const mapApiNotFoundToRouteNotFound = async <T>(
  request: Promise<T>,
  entity: RouteNotFoundData["entity"],
) => {
  try {
    return await request;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.NotFound
    ) {
      const data: RouteNotFoundData = { entity };
      throw notFound({ data });
    }

    throw error;
  }
};
