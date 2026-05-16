/* eslint-disable max-lines, max-lines-per-function */
import { HttpResponse, delay, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import { useScheduledTasksSorting } from "../use-scheduled-tasks-sorting";

import type { ReactNode } from "react";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${TASKS_ENDPOINT}`;
const MOVE_URL = `${BASE_URL}/move_drag`;
const SPAN_MOVE_URL = `${BASE_URL}/span_moves`;
const SPAN_DELETE_URL = `${BASE_URL}/span_deletions`;

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const APPLICATION_ID = 42;
const ROUTINE_NAME = "Workout";

const withApplication = (task: ScheduledTaskAPI): ScheduledTaskAPI => ({
  ...task,
  routine_application: {
    id: APPLICATION_ID,
    routine_id: APPLICATION_ID,
    routine_name: ROUTINE_NAME,
  },
});

const stubFreshGet = (data: ScheduledTaskAPI[]) => {
  /* Keep onSettled invalidate refetches stable so the cache doesn't drift to
     the global store while the test is asserting hook-managed state. */
  server.use(
    http.get(BASE_URL, () => HttpResponse.json(data, { status: 200 })),
  );
};

describe("useScheduledTasksSorting", () => {
  const scheduledKey = scheduledTasksQueryOptions().queryKey;
  const inProgressKey = inProgressTasksQueryOptions().queryKey;

  const flatOrder: ScheduledTaskAPI[] = [
    scheduledTasks[0],
    scheduledTasks[1],
    scheduledTasks[2],
    scheduledTasks[3],
    scheduledTasks[4],
  ];

  const seedClient = (data: ScheduledTaskAPI[]) => {
    const queryClient = buildQueryClient();
    queryClient.setQueryData(scheduledKey, data);
    queryClient.setQueryData(inProgressKey, []);
    return queryClient;
  };

  it("handleDragStart sets draggingId; handleDragCancel clears it without mutating expansion", () => {
    stubFreshGet(flatOrder);
    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      result.current.handleDragStart(scheduledTasks[0].id);
    });
    expect(result.current.draggingId).toBe(scheduledTasks[0].id);
    expect(result.current.expansionByApplicationId.size).toBe(0);

    act(() => {
      result.current.handleDragCancel();
    });
    expect(result.current.draggingId).toBeNull();
    expect(result.current.expansionByApplicationId.size).toBe(0);
  });

  it("toggleExpanded adds when absent and removes when present; drag handlers do not write expansion", () => {
    stubFreshGet(flatOrder);
    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });
    expect(result.current.expansionByApplicationId.has(APPLICATION_ID)).toBe(
      true,
    );

    act(() => {
      result.current.handleDragStart(scheduledTasks[0].id);
      result.current.handleDragCancel();
    });
    expect(result.current.expansionByApplicationId.has(APPLICATION_ID)).toBe(
      true,
    );

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });
    expect(result.current.expansionByApplicationId.has(APPLICATION_ID)).toBe(
      false,
    );
  });

  it("handleDragEnd (single-task) calls move_drag with the computed neighbors and clears draggingId", async () => {
    const movePayload = vi.fn();
    server.use(
      http.patch(MOVE_URL, async ({ request }) => {
        const body = await request.json();
        movePayload(body);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      result.current.handleDragStart(flatOrder[0].id);
    });

    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: flatOrder[1].id,
        nextItemId: flatOrder[2].id,
        items: [],
      });
    });

    expect(result.current.draggingId).toBeNull();

    await waitFor(() => {
      expect(movePayload).toHaveBeenCalledTimes(1);
    });
    const body = movePayload.mock.calls[0][0];
    expect(body.task_id).toBe(flatOrder[0].id);
    expect(body.previous_task_id).toBe(flatOrder[1].id);
    expect(body.next_task_id).toBe(flatOrder[2].id);
  });

  it("renderItems reflects the optimistic order while the move mutation is pending", async () => {
    server.use(
      http.patch(MOVE_URL, async () => {
        await delay(100);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: flatOrder[1].id,
        nextItemId: flatOrder[2].id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(result.current.renderItems.map((i) => i.id)).toEqual([
        flatOrder[1].id,
        flatOrder[0].id,
        flatOrder[2].id,
        flatOrder[3].id,
        flatOrder[4].id,
      ]);
    });
  });

  it("handleDragEnd bails (no mutate call) when the resulting order matches the existing order", async () => {
    const moveSpy = vi.fn();
    server.use(
      http.patch(MOVE_URL, () => {
        moveSpy();
        return HttpResponse.json({ ok: true });
      }),
    );
    stubFreshGet(flatOrder);

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    // Drop A back where it already is: prev=null, dest=0 → no change.
    act(() => {
      result.current.handleDragEnd({
        itemId: flatOrder[0].id,
        prevItemId: null,
        nextItemId: flatOrder[1].id,
        items: [],
      });
    });

    await new Promise((r) => setTimeout(r, 30));
    expect(moveSpy).not.toHaveBeenCalled();
  });

  it("bulkDeleteAbsorbed calls span_deletions with the supplied task ids", async () => {
    const deletePayload = vi.fn();
    server.use(
      http.post(SPAN_DELETE_URL, async ({ request }) => {
        const body = await request.json();
        deletePayload(body);
        return HttpResponse.json({ success: true, deleted_count: 2 });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    const taskIds = [flatOrder[1].id, flatOrder[2].id];

    act(() => {
      result.current.bulkDeleteAbsorbed(taskIds);
    });

    await waitFor(() => {
      expect(deletePayload).toHaveBeenCalledTimes(1);
    });
    expect(deletePayload.mock.calls[0][0]).toEqual({ task_ids: taskIds });
  });

  it("handleDragEnd on a wrap sortable id calls span_moves with all absorbed task ids", async () => {
    const spanMovePayload = vi.fn();
    server.use(
      http.post(SPAN_MOVE_URL, async ({ request }) => {
        const body = await request.json();
        spanMovePayload(body);
        return HttpResponse.json({ success: true });
      }),
    );

    // Build a list with a wrappable group at the end (≥ MIN, position ≥ WRAP_POINT).
    const wrappable: ScheduledTaskAPI[] = [
      scheduledTasks[0],
      scheduledTasks[1],
      scheduledTasks[2],
      withApplication(scheduledTasks[3]),
      withApplication(scheduledTasks[4]),
      withApplication(scheduledTasks[5]),
    ];
    stubFreshGet(wrappable);

    const queryClient = seedClient(wrappable);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    // Sanity check: the lifted hook produced a wrap item.
    const wrapId = wrapSortableId(APPLICATION_ID);
    expect(result.current.renderItems.some((i) => i.id === wrapId)).toBe(true);

    act(() => {
      result.current.handleDragEnd({
        itemId: wrapId,
        prevItemId: null,
        nextItemId: wrappable[0].id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(spanMovePayload).toHaveBeenCalledTimes(1);
    });

    const body = spanMovePayload.mock.calls[0][0];
    expect(body.task_ids).toEqual([
      wrappable[3].id,
      wrappable[4].id,
      wrappable[5].id,
    ]);
    expect(body.previous_task_id).toBeNull();
    expect(body.next_task_id).toBe(wrappable[0].id);
  });

  it("renderItems drops expanded-child rows of the dragging wrap and restores them on cancel", () => {
    const wrappable: ScheduledTaskAPI[] = [
      scheduledTasks[0],
      scheduledTasks[1],
      scheduledTasks[2],
      withApplication(scheduledTasks[3]),
      withApplication(scheduledTasks[4]),
    ];
    stubFreshGet(wrappable);

    const queryClient = seedClient(wrappable);
    const { result } = renderHook(() => useScheduledTasksSorting(), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      result.current.toggleExpanded(APPLICATION_ID);
    });

    const expandedChildCountBefore = result.current.renderItems.filter(
      (i) => i.kind === "expanded-child",
    ).length;
    expect(expandedChildCountBefore).toBeGreaterThan(0);
    expect(
      result.current.renderItems.some(
        (i) => i.id === wrapSortableId(APPLICATION_ID),
      ),
    ).toBe(true);
    const idsBefore = result.current.renderItems.map((i) => i.id);

    act(() => {
      result.current.handleDragStart(wrapSortableId(APPLICATION_ID));
    });

    expect(
      result.current.renderItems.filter(
        (i) =>
          i.kind === "expanded-child" &&
          i.parent_routine_application_id === APPLICATION_ID,
      ).length,
    ).toBe(0);
    expect(
      result.current.renderItems.some(
        (i) => i.id === wrapSortableId(APPLICATION_ID),
      ),
    ).toBe(true);

    act(() => {
      result.current.handleDragCancel();
    });

    expect(
      result.current.renderItems.filter((i) => i.kind === "expanded-child")
        .length,
    ).toBe(expandedChildCountBefore);
    expect(result.current.renderItems.map((i) => i.id)).toEqual(idsBefore);
  });
});
