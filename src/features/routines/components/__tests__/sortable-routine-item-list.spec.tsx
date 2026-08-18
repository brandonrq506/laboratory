import { act, render, screen, waitFor } from "@/test/test-utils";

import { SortableRoutineItemList } from "../sortable-routine-item-list";
import { calculateRoutineItemStartTime } from "../../utils/calculateRoutineItemStartTime";
import { routines } from "@/test/store/routines";

import type * as DndKitCore from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

const mocks = vi.hoisted(() => ({
  dragEnd: undefined as ((event: DragEndEvent) => void) | undefined,
  mutateAsync: vi.fn(),
}));

vi.mock("@dnd-kit/core", async (importOriginal) => {
  const original = await importOriginal<typeof DndKitCore>();

  return {
    ...original,
    DndContext: ({
      children,
      onDragEnd,
    }: PropsWithChildren<{ onDragEnd: (event: DragEndEvent) => void }>) => {
      mocks.dragEnd = onDragEnd;
      return children;
    },
    useSensor: vi.fn(),
    useSensors: vi.fn(() => []),
  };
});

vi.mock("@/components/core", () => ({
  SortableItemCard: ({
    children,
  }: PropsWithChildren<{ itemId: string | number }>) => (
    <div data-testid="routine-item">{children}</div>
  ),
}));

vi.mock("../routine-item-content", () => ({
  RoutineItemContent: ({ item }: { item: { item_name: string } }) => (
    <span>{item.item_name}</span>
  ),
}));

vi.mock("../../api/tanstack/use-move-routine-item", () => ({
  useMoveRoutineItem: () => ({ mutateAsync: mocks.mutateAsync }),
}));

const ROUTINE_ID = routines[0].id;
const items = calculateRoutineItemStartTime(
  routines[0].routine_items.slice(0, 3),
  routines[0].start_time,
);
const reorderedItems = [items[1], items[2], items[0]];

const getOrder = () =>
  screen.getAllByTestId("routine-item").map((item) => item.textContent);

const createDeferred = () => {
  let resolve: () => void = () => undefined;
  let reject: (reason?: unknown) => void = () => undefined;
  const promise = new Promise<void>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, reject, resolve };
};

const drop = (activeId: number, overId: number | null) => {
  act(() => {
    mocks.dragEnd?.({
      active: { id: activeId },
      over: overId === null ? null : { id: overId },
    } as DragEndEvent);
  });
};

describe("SortableRoutineItemList", () => {
  beforeEach(() => {
    mocks.dragEnd = undefined;
    mocks.mutateAsync.mockReset();
  });

  it("shows the reordered items while the mutation is pending", async () => {
    const mutation = createDeferred();
    mocks.mutateAsync.mockReturnValue(mutation.promise);
    render(<SortableRoutineItemList routineId={ROUTINE_ID} items={items} />);

    drop(items[0].id, items[2].id);

    await waitFor(() => {
      expect(getOrder()).toEqual(reorderedItems.map((item) => item.item_name));
    });
    expect(mocks.mutateAsync).toHaveBeenCalledWith({
      routine_id: ROUTINE_ID,
      routine_item_id: items[0].id,
      new_position: 2,
      routine_items: reorderedItems,
    });
    await act(async () => {
      mutation.resolve();
      await mutation.promise;
    });
  });

  it("keeps the reordered items when canonical items converge", async () => {
    const mutation = createDeferred();
    mocks.mutateAsync.mockReturnValue(mutation.promise);
    const { rerender } = render(
      <SortableRoutineItemList routineId={ROUTINE_ID} items={items} />,
    );

    drop(items[0].id, items[2].id);
    rerender(
      <SortableRoutineItemList routineId={ROUTINE_ID} items={reorderedItems} />,
    );
    await act(async () => {
      mutation.resolve();
      await mutation.promise;
    });

    expect(getOrder()).toEqual(reorderedItems.map((item) => item.item_name));
  });

  it("restores canonical items when the mutation fails", async () => {
    const mutation = createDeferred();
    mocks.mutateAsync.mockReturnValue(mutation.promise);
    const { rerender } = render(
      <SortableRoutineItemList routineId={ROUTINE_ID} items={items} />,
    );

    drop(items[0].id, items[2].id);
    await waitFor(() => {
      expect(getOrder()).toEqual(reorderedItems.map((item) => item.item_name));
    });
    await act(async () => {
      mutation.reject(new Error("Move failed"));
      await mutation.promise.catch(() => undefined);
    });
    rerender(
      <SortableRoutineItemList routineId={ROUTINE_ID} items={[...items]} />,
    );

    await waitFor(() => {
      expect(getOrder()).toEqual(items.map((item) => item.item_name));
    });
  });

  it.each([
    [items[0].id, items[0].id],
    [999, items[0].id],
    [items[0].id, 999],
    [items[0].id, null],
  ])("ignores invalid drop from %s to %s", (activeId, overId) => {
    render(<SortableRoutineItemList routineId={ROUTINE_ID} items={items} />);

    drop(activeId, overId);

    expect(mocks.mutateAsync).not.toHaveBeenCalled();
    expect(getOrder()).toEqual(items.map((item) => item.item_name));
  });
});
