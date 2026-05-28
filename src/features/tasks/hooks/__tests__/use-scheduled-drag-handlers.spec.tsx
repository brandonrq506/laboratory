import { act, renderHook } from "@testing-library/react";

import { useScheduledDragHandlers } from "../use-scheduled-drag-handlers";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

describe("useScheduledDragHandlers", () => {
  it("handleDragStart sets draggingId; handleDragCancel clears it", () => {
    const performMove = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useScheduledDragHandlers({ performMove }),
    );

    act(() => {
      result.current.handleDragStart(123);
    });
    expect(result.current.draggingId).toBe(123);

    act(() => {
      result.current.handleDragCancel();
    });
    expect(result.current.draggingId).toBeNull();
  });

  it("handleDragEnd clears draggingId and forwards the move to performMove", () => {
    const performMove = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useScheduledDragHandlers({ performMove }),
    );

    act(() => {
      result.current.handleDragStart(7);
    });
    act(() => {
      result.current.handleDragEnd({
        itemId: 7,
        prevItemId: 8,
        nextItemId: 9,
        items: [],
      });
    });

    expect(result.current.draggingId).toBeNull();
    expect(performMove).toHaveBeenCalledWith(7, 8);
  });

  it("handleDragEnd on a wrap sortable id forwards the wrap id verbatim", () => {
    const performMove = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useScheduledDragHandlers({ performMove }),
    );

    const wrapId = wrapSortableId(42);
    act(() => {
      result.current.handleDragEnd({
        itemId: wrapId,
        prevItemId: null,
        nextItemId: 5,
        items: [],
      });
    });

    expect(performMove).toHaveBeenCalledWith(wrapId, null);
  });
});
