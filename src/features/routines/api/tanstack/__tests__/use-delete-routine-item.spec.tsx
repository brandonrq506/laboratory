import { HttpResponse, http } from "msw";
import { renderHook, waitFor } from "@/test/test-utils";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  routineByIdQueryOptions,
  routineListQueryOptions,
} from "../../queries";
import { apiRoutes } from "@/test/handlers/api-routes";
import { routines } from "@/test/store/routines";
import { server } from "@/test/server";
import { useDeleteRoutineItem } from "../use-delete-routine-item";

import type { RoutineWithItems } from "@/features/routines/types/routine-with-items";

const [routine] = routines;
const [deletedItem] = routine.routine_items;

// Shares item ids with `routine`: only the routine id tells them apart.
const lookalike: RoutineWithItems = { ...routine, id: 99, name: "Lookalike" };
const initialList = [routine, lookalike];

const withoutDeletedItem = (target: RoutineWithItems): RoutineWithItems => ({
  ...target,
  routine_items: target.routine_items.filter(({ id }) => id !== deletedItem.id),
});

const detailKey = routineByIdQueryOptions(routine.id).queryKey;
const listKey = routineListQueryOptions().queryKey;
const payload = { itemId: deletedItem.id, routineId: routine.id };

const seedClient = () => {
  const queryClient = createTestQueryClient();
  queryClient.setQueryData(detailKey, routine);
  queryClient.setQueryData(listKey, initialList);
  return queryClient;
};

describe("useDeleteRoutineItem", () => {
  it("removes the item from the detail and only that routine in the list, and invalidates both", async () => {
    const queryClient = seedClient();

    const { result } = renderHook(() => useDeleteRoutineItem(), {
      wrapper: createQueryWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => {
      expect(queryClient.getQueryData(detailKey)).toEqual(
        withoutDeletedItem(routine),
      );
    });
    expect(queryClient.getQueryData(listKey)).toEqual([
      withoutDeletedItem(routine),
      lookalike,
    ]);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(queryClient.getQueryState(detailKey)?.isInvalidated).toBe(true);
    expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(true);
  });

  it("restores detail and list caches to the snapshot on 422", async () => {
    server.use(
      http.delete(apiRoutes.routineItem, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );
    const queryClient = seedClient();

    const { result } = renderHook(() => useDeleteRoutineItem(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await result.current.mutateAsync(payload).catch(() => undefined);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(queryClient.getQueryData(detailKey)).toEqual(routine);
    expect(queryClient.getQueryData(listKey)).toEqual(initialList);
  });
});
