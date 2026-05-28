/* eslint-disable max-lines */
import { HttpResponse, delay, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { scheduledTasks } from "@/test/store/tasks";
import { server } from "@/test/server";
import { useScheduledMutationOps } from "../use-scheduled-mutation-ops";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${TASKS_ENDPOINT}`;
const MOVE_URL = `${BASE_URL}/move_drag`;
const SPAN_MOVE_URL = `${BASE_URL}/span_moves`;

const APPLICATION_ID = 42;
const ROUTINE_NAME = "Workout";

const buildQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const makeWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const withApplication = (task: ScheduledTaskAPI): ScheduledTaskAPI => ({
  ...task,
  routine_application: {
    id: APPLICATION_ID,
    routine_id: APPLICATION_ID,
    routine_name: ROUTINE_NAME,
  },
});

const stubFreshGet = (data: ScheduledTaskAPI[]) => {
  server.use(
    http.get(BASE_URL, () => HttpResponse.json(data, { status: 200 })),
  );
};

/**
 * Test fixture: mirrors how the page composes the data hook + mutation ops, so
 * we can exercise performMove against a realistic optimistic state without
 * dragging in the full page render.
 */
const useOpsFixture = (initialRaw: ScheduledTaskAPI[]) => {
  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);
  const rawItems = tempItems ?? initialRaw;
  const groupedItems = groupRoutineTasks(
    rawItems.map((t) => ({ ...t, expected_start_time: new Date() })),
  );
  const ops = useScheduledMutationOps({
    rawItems,
    groupedItems,
    setTempItems,
  });
  return { rawItems, ...ops };
};

describe("useScheduledMutationOps", () => {
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

  it("performMove on a single task calls move_drag with the computed neighbors", async () => {
    const movePayload = vi.fn();
    server.use(
      http.patch(MOVE_URL, async ({ request }) => {
        const body = await request.json();
        movePayload(body);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useOpsFixture(flatOrder), {
      wrapper: makeWrapper(queryClient),
    });

    await act(async () => {
      await result.current.performMove(flatOrder[0].id, flatOrder[1].id);
    });

    await waitFor(() => {
      expect(movePayload).toHaveBeenCalledTimes(1);
    });
    const body = movePayload.mock.calls[0][0];
    expect(body.task_id).toBe(flatOrder[0].id);
    expect(body.previous_task_id).toBe(flatOrder[1].id);
    expect(body.next_task_id).toBe(flatOrder[2].id);
  });

  it("rawItems reflects the optimistic order while the move mutation is pending", async () => {
    server.use(
      http.patch(MOVE_URL, async () => {
        await delay(100);
        return HttpResponse.json({ ok: true });
      }),
    );

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useOpsFixture(flatOrder), {
      wrapper: makeWrapper(queryClient),
    });

    act(() => {
      void result.current.performMove(flatOrder[0].id, flatOrder[1].id);
    });

    await waitFor(() => {
      expect(result.current.rawItems.map((t) => t.id)).toEqual([
        flatOrder[1].id,
        flatOrder[0].id,
        flatOrder[2].id,
        flatOrder[3].id,
        flatOrder[4].id,
      ]);
    });
  });

  it("performMove bails (no mutate) when the resulting order matches the existing order", async () => {
    const moveSpy = vi.fn();
    server.use(
      http.patch(MOVE_URL, () => {
        moveSpy();
        return HttpResponse.json({ ok: true });
      }),
    );
    stubFreshGet(flatOrder);

    const queryClient = seedClient(flatOrder);
    const { result } = renderHook(() => useOpsFixture(flatOrder), {
      wrapper: makeWrapper(queryClient),
    });

    // Drop A back where it already is: prev=null, dest=0 → no change.
    await act(async () => {
      await result.current.performMove(flatOrder[0].id, null);
    });

    await new Promise((r) => setTimeout(r, 30));
    expect(moveSpy).not.toHaveBeenCalled();
  });

  it("performMove on a wrap sortable id calls span_moves with all absorbed task ids", async () => {
    const spanMovePayload = vi.fn();
    server.use(
      http.post(SPAN_MOVE_URL, async ({ request }) => {
        const body = await request.json();
        spanMovePayload(body);
        return HttpResponse.json({ success: true });
      }),
    );

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
    const { result } = renderHook(() => useOpsFixture(wrappable), {
      wrapper: makeWrapper(queryClient),
    });

    const wrapId = wrapSortableId(APPLICATION_ID);

    await act(async () => {
      await result.current.performMove(wrapId, null);
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
});
