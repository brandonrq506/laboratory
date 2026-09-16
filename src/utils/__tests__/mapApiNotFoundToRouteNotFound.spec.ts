import { HttpStatusCode } from "axios";
import { isNotFound } from "@tanstack/react-router";

import { mapApiNotFoundToRouteNotFound } from "../mapApiNotFoundToRouteNotFound";

const createAxiosError = (status: HttpStatusCode) => ({
  isAxiosError: true,
  response: { status },
});

describe("mapApiNotFoundToRouteNotFound", () => {
  const entity = "Activity";

  it("returns successful request data", async () => {
    const data = { id: 1 };

    await expect(
      mapApiNotFoundToRouteNotFound(Promise.resolve(data), entity),
    ).resolves.toBe(data);
  });

  it("maps Axios 404 responses to router not-found errors", async () => {
    const error = createAxiosError(HttpStatusCode.NotFound);

    const routeError = await mapApiNotFoundToRouteNotFound(
      Promise.reject(error),
      entity,
    ).catch((caught: unknown) => caught);

    expect(isNotFound(routeError)).toBe(true);
    expect(routeError).toMatchObject({ data: { entity } });
  });

  it("preserves other Axios errors", async () => {
    const error = createAxiosError(HttpStatusCode.InternalServerError);

    await expect(
      mapApiNotFoundToRouteNotFound(Promise.reject(error), entity),
    ).rejects.toBe(error);
  });

  it("preserves application errors", async () => {
    const error = new Error("Render failed");

    await expect(
      mapApiNotFoundToRouteNotFound(Promise.reject(error), entity),
    ).rejects.toBe(error);
  });
});
