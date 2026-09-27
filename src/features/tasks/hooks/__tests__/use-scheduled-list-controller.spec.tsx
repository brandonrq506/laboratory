/* eslint-disable max-lines */
import { HttpResponse, http } from "msw";
import { act, renderHook, waitFor } from "@/test/test-utils";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  routineApplication,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { scheduledTasksQueryOptions } from "@/features/tasks/api/queries";
import { server } from "@/test/server";
import { useScheduledListController } from "../use-scheduled-list-controller";
import { useTimerScheduledListData } from "../use-timer-scheduled-list-data";
import { wrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type {
  ScheduledListSource,
  SetTempItems,
} from "@/features/tasks/types/scheduled-list-source";
import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

/** A list whose pin is a spy: lets specs read exactly what the controller pins. */
const buildSource = (rawItems: ScheduledTaskAPI[]) =>
  ({
    listQueryOptions: scheduledTasksQueryOptions(),
    rawItems,
    displayTasks: rawItems,
    setTempItems: vi.fn<SetTempItems>(),
  }) satisfies ScheduledListSource<ScheduledTaskAPI>;

const renderController = (source: ScheduledListSource<ScheduledTaskAPI>) =>
  renderHook(() => useScheduledListController(source), {
    wrapper: createQueryWrapper(createTestQueryClient()),
  });

const idsOf = (items: ScheduledRenderItem<ScheduledTaskAPI>[]) =>
  items.map((item) => item.id);

const ids = (tasks: ScheduledTaskAPI[]) => tasks.map((task) => task.id);

const [first, second, third, fourth, fifth, sixth] = scheduledTasks;
const flatOrder = [first, second, third, fourth, fifth];
const members = [fourth, fifth, sixth].map(withApplication);
const wrappable = [first, second, third, ...members];
const wrapId = wrapSortableId(routineApplication.id);

describe("useScheduledListController — moves", () => {
  it("a single move sends move_drag, pins the planned order, then releases the pin", async () => {
    const movePayload = vi.fn();
    server.use(
      http.patch(apiRoutes.taskMove, async ({ request }) => {
        movePayload(await request.json());
        return HttpResponse.json({ ok: true });
      }),
    );
    const source = buildSource(flatOrder);
    const { result } = renderController(source);

    act(() => {
      result.current.handleDragEnd({
        itemId: first.id,
        prevItemId: second.id,
        nextItemId: third.id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(source.setTempItems).toHaveBeenCalledTimes(2);
    });
    const [[pinned], [released]] = source.setTempItems.mock.calls;
    expect(pinned).toEqual([second, first, third, fourth, fifth]);
    expect(released).toBeNull();
    expect(movePayload).toHaveBeenCalledWith({
      task_id: first.id,
      previous_task_id: second.id,
      next_task_id: third.id,
    });
  });

  it("a wrap move sends span_moves with the wrap's member ids", async () => {
    const spanMovePayload = vi.fn();
    server.use(
      http.post(apiRoutes.taskSpanMoves, async ({ request }) => {
        spanMovePayload(await request.json());
        return new HttpResponse(null, { status: 204 });
      }),
    );
    const source = buildSource(wrappable);
    const { result } = renderController(source);

    act(() => {
      result.current.handleDragEnd({
        itemId: wrapId,
        prevItemId: null,
        nextItemId: first.id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(source.setTempItems).toHaveBeenCalledTimes(2);
    });
    expect(spanMovePayload).toHaveBeenCalledWith({
      task_ids: ids(members),
      previous_task_id: null,
      next_task_id: first.id,
    });
  });

  it("a move that keeps the order sends nothing", () => {
    const moveRequest = vi.fn();
    server.use(
      http.patch(apiRoutes.taskMove, () => {
        moveRequest();
        return HttpResponse.json({ ok: true });
      }),
    );
    const source = buildSource(flatOrder);
    const { result } = renderController(source);

    act(() => {
      result.current.handleDragEnd({
        itemId: first.id,
        prevItemId: null,
        nextItemId: second.id,
        items: [],
      });
    });

    // The plan bails synchronously, before the pin and before any request.
    expect(source.setTempItems).not.toHaveBeenCalled();
    expect(moveRequest).not.toHaveBeenCalled();
  });

  it("a failed move still releases the pin", async () => {
    server.use(
      http.patch(apiRoutes.taskMove, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );
    const source = buildSource(flatOrder);
    const { result } = renderController(source);

    act(() => {
      result.current.handleDragEnd({
        itemId: first.id,
        prevItemId: second.id,
        nextItemId: third.id,
        items: [],
      });
    });

    await waitFor(() => {
      expect(source.setTempItems).toHaveBeenCalledTimes(2);
    });
    expect(source.setTempItems).toHaveBeenLastCalledWith(null);
  });

  it("a move on the timer list writes server-shaped tasks (no expected_start_time) to the cache", async () => {
    const moveResponse = createDeferred<void>();
    server.use(
      http.patch(apiRoutes.taskMove, async () => {
        await moveResponse.promise;
        return HttpResponse.json({ ok: true });
      }),
    );
    const queryClient = createTestQueryClient();
    const { queryKey } = scheduledTasksQueryOptions();
    const { result } = renderHook(
      () => useScheduledListController(useTimerScheduledListData()),
      { wrapper: createQueryWrapper(queryClient) },
    );
    await waitFor(() => {
      expect(result.current.items).toHaveLength(scheduledTasks.length);
    });

    act(() => {
      result.current.handleDragEnd({
        itemId: first.id,
        prevItemId: second.id,
        nextItemId: third.id,
        items: [],
      });
    });

    const [, , ...rest] = scheduledTasks;
    await waitFor(() => {
      expect(queryClient.getQueryData(queryKey)).toEqual([
        second,
        first,
        ...rest,
      ]);
    });
    queryClient.getQueryData(queryKey)?.forEach((task) => {
      expect(task).not.toHaveProperty("expected_start_time");
    });

    moveResponse.resolve();
    await waitFor(() => {
      expect(queryClient.isMutating()).toBe(0);
    });
  });
});

describe("useScheduledListController — expansion and drag", () => {
  const collapsedIds = [first.id, second.id, third.id, wrapId];
  const expandedIds = [...collapsedIds, ...ids(members)];

  it("toggleExpanded shows the wrap's children, then hides them", () => {
    const { result } = renderController(buildSource(wrappable));
    expect(idsOf(result.current.items)).toEqual(collapsedIds);

    act(() => {
      result.current.toggleExpanded(routineApplication.id);
    });
    expect(idsOf(result.current.items)).toEqual(expandedIds);

    act(() => {
      result.current.toggleExpanded(routineApplication.id);
    });
    expect(idsOf(result.current.items)).toEqual(collapsedIds);
  });

  it("dragging an expanded wrap collapses it and cancelling restores it; dragging a plain task leaves it expanded", () => {
    const { result } = renderController(buildSource(wrappable));
    act(() => {
      result.current.toggleExpanded(routineApplication.id);
    });

    act(() => {
      result.current.handleDragStart(first.id);
    });
    expect(idsOf(result.current.items)).toEqual(expandedIds);
    act(() => {
      result.current.handleDragCancel();
    });

    act(() => {
      result.current.handleDragStart(wrapId);
    });
    expect(idsOf(result.current.items)).toEqual(collapsedIds);
    expect(
      result.current.items.find((item) => item.id === wrapId),
    ).toHaveProperty("expanded", false);

    act(() => {
      result.current.handleDragCancel();
    });
    expect(idsOf(result.current.items)).toEqual(expandedIds);
  });

  it("a wrap drag that ends in place re-expands the wrap", () => {
    const { result } = renderController(buildSource(wrappable));
    act(() => {
      result.current.toggleExpanded(routineApplication.id);
    });
    act(() => {
      result.current.handleDragStart(wrapId);
    });
    expect(idsOf(result.current.items)).toEqual(collapsedIds);

    act(() => {
      result.current.handleDragEnd({
        itemId: wrapId,
        prevItemId: third.id,
        nextItemId: null,
        items: [],
      });
    });

    expect(idsOf(result.current.items)).toEqual(expandedIds);
  });
});
