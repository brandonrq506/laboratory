import { AxiosError } from "axios";
import { getRouteErrorPageContent } from "../getRouteErrorPageContent";

describe("getRouteErrorPageContent", () => {
  it("returns offline content for network failures while offline", () => {
    const error = new AxiosError("Network Error", AxiosError.ERR_NETWORK);
    const content = getRouteErrorPageContent(error, false);

    expect(content.kind).toBe("network");
    expect(content.title).toBe("You're offline");
  });

  it("returns network content for Axios network failures", () => {
    const error = new AxiosError("Network Error", AxiosError.ERR_NETWORK);

    expect(getRouteErrorPageContent(error, true).kind).toBe("network");
  });

  it("returns unexpected error content for HTTP failures", () => {
    const error = new AxiosError("Request failed", AxiosError.ERR_BAD_RESPONSE);

    expect(getRouteErrorPageContent(error, true).kind).toBe("unexpected");
  });

  it.each([true, false])(
    "returns unexpected error content for application crashes when online is %s",
    (isOnline) => {
      const content = getRouteErrorPageContent(
        new Error("Render failed"),
        isOnline,
      );

      expect(content.kind).toBe("unexpected");
    },
  );
});
