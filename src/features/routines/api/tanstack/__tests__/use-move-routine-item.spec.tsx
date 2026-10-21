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
import { useMoveRoutineItem } from "../use-move-routine-item";

const [routine, bystander] = routines;
const initialList = [routine, bystander];

const [first, second, ...rest] = routine.routine_items;
const reorderedItems = [second, first, ...rest];

const detailKey = routineByIdQueryOptions(routine.id).queryKey;
const listKey = routineListQueryOptions().queryKey;
const payload = {
  routine_id: routine.id,
  routine_item_id: second.id,
  new_position: first.position,
  routine_items: reorderedItems,
};

const seedClient = () => {
  const queryClient = createTestQueryClient();
  queryClient.setQueryData(detailKey, routine);
  queryClient.setQueryData(listKey, initialList);
  return queryClient;
};

describe("useMoveRoutineItem", () => {
  it("reorders the detail and only that routine in the list, and invalidates both", async () => {
    const queryClient = seedClient();

    const { result } = renderHook(() => useMoveRoutineItem(), {
      wrapper: createQueryWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => {
      expect(queryClient.getQueryData(detailKey)).toEqual({
        ...routine,
        routine_items: reorderedItems,
      });
    });
    expect(queryClient.getQueryData(listKey)).toEqual([
      { ...routine, routine_items: reorderedItems },
      bystander,
    ]);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(queryClient.getQueryState(detailKey)?.isInvalidated).toBe(true);
    expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(true);
  });

  it("restores detail and list caches to the snapshot on 422", async () => {
    server.use(
      http.patch(apiRoutes.routineItemsMove, () =>
        HttpResponse.json({ errors: [] }, { status: 422 }),
      ),
    );
    const queryClient = seedClient();

    const { result } = renderHook(() => useMoveRoutineItem(), {
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
