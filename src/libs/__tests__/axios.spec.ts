import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { apiV1 } from "@/libs/axios";
import { server } from "@/test/server";

const maintenancePage = (status: number) =>
  http.get(apiRoutes.test, () =>
    HttpResponse.html("<html><body>Maintenance</body></html>", { status }),
  );

describe("apiV1 HTML response guard", () => {
  it("rejects a 200 HTML page (proxy / maintenance) instead of returning it as data", async () => {
    server.use(maintenancePage(200));

    await expect(apiV1.get("/test")).rejects.toThrow(
      "Received HTML response when JSON was expected",
    );
  });

  it("rejects a 5xx HTML page with the HTML error message, not the axios error", async () => {
    server.use(maintenancePage(503));

    await expect(apiV1.get("/test")).rejects.toThrow(
      "Received HTML error response when JSON was expected",
    );
  });

  it("passes a JSON error response through as the original axios error", async () => {
    server.use(
      http.get(apiRoutes.test, () =>
        HttpResponse.json({ error: "boom" }, { status: 500 }),
      ),
    );

    await expect(apiV1.get("/test")).rejects.toMatchObject({
      response: { status: 500, data: { error: "boom" } },
    });
  });
});
