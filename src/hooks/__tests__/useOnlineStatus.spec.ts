import { act, renderHook } from "@testing-library/react";
import { useOnlineStatus } from "../useOnlineStatus";

describe("useOnlineStatus", () => {
  it("defaults to true and responds to online/offline events", () => {
    const { result, unmount } = renderHook(() => useOnlineStatus());

    expect(result.current).toBe(true);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(result.current).toBe(false);

    // Back online
    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    expect(result.current).toBe(true);

    // Ensure listeners are removed on unmount (no error thrown on dispatch)
    unmount();
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
  });
});
