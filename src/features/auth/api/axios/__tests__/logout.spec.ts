import { SESSION_ENDPOINT, apiV1 } from "@/libs/axios";
import { logout } from "../logout";

describe("logout", () => {
  it("skips auth refresh for explicit logout", async () => {
    const deleteSpy = vi.spyOn(apiV1, "delete").mockResolvedValue({
      data: null,
      status: 204,
      statusText: "No Content",
      headers: {},
      config: { headers: undefined },
    });

    await logout();

    expect(deleteSpy).toHaveBeenCalledWith(SESSION_ENDPOINT, {
      _skipAuthRefresh: true,
    });
  });
});
