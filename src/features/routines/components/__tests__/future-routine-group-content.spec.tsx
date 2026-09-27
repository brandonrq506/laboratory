import { HttpResponse, http } from "msw";
import { render, screen, waitFor, within } from "@/test/test-utils";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import userEvent from "@testing-library/user-event";

import {
  SCHEDULED_LIST_DATE,
  routineApplication,
  routineWrapCard,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils/query-client";
import {
  expectBystanderUntouched,
  seedBystander,
} from "@/test/utils/scheduled-list-isolation";
import {
  futureTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { FutureRoutineGroupContent } from "../future-routine-group-content";
import { ScheduledItemCard } from "@/features/tasks/components";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import { CANCEL, CONFIRM } from "@/constants/actions";
import { formatDatetimeTo12hTime } from "@/utils";

import type * as TanStackReactRouter from "@tanstack/react-router";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  getRouteApi: () => ({ useSearch: () => ({ date: SCHEDULED_LIST_DATE }) }),
}));

const [first, second, , fourth, fifth, sixth] = scheduledTasks;
const members = [fourth, fifth, sixth].map(withApplication);
const item = routineWrapCard(members, false);
const { routine_name } = routineApplication;
const deleteLabel = `Delete ${routine_name} routine`;
const dialogName = `Delete ${routine_name}`;

const renderGroup = (
  queryClient = createTestQueryClient(),
  groupItem = item,
) => {
  const QueryWrapper = createQueryWrapper(queryClient);
  render(
    <QueryWrapper>
      <DndContext>
        <SortableContext items={[groupItem.id]}>
          <ScheduledItemCard item={groupItem}>
            <FutureRoutineGroupContent
              item={groupItem}
              onToggleExpanded={vi.fn()}
            />
          </ScheduledItemCard>
        </SortableContext>
      </DndContext>
    </QueryWrapper>,
  );
};

const spyOnSpanDeletions = () => {
  const deletePayload = vi.fn();
  server.use(
    http.post(apiRoutes.taskSpanDeletions, async ({ request }) => {
      deletePayload(await request.json());
      return new HttpResponse(null, { status: 204 });
    }),
  );
  return deletePayload;
};

describe("FutureRoutineGroupContent", () => {
  it("shows routine name, task count and total duration, but no time of day", () => {
    renderGroup();

    expect(screen.getByText(routine_name)).toBeInTheDocument();
    expect(screen.getByText("3 tasks")).toBeInTheDocument();
    expect(screen.getByText("22m")).toBeInTheDocument();
    expect(
      screen.queryByText(formatDatetimeTo12hTime(fourth.scheduled_at)),
    ).not.toBeInTheDocument();
  });

  it("confirmation intentionally deletes unrelated absorbed tasks along with routine members", async () => {
    const user = userEvent.setup();
    const deletePayload = spyOnSpanDeletions();
    const absorbed = [members[0], second, ...members.slice(1)];
    const groupWithForeignTask = {
      ...routineWrapCard(absorbed, false),
      member_ids: members.map((task) => task.id),
    };
    const queryClient = createTestQueryClient();
    const { queryKey } = futureTasksQueryOptions(SCHEDULED_LIST_DATE);
    const timerQueryOptions = scheduledTasksQueryOptions();
    queryClient.setQueryData(queryKey, [first, ...absorbed]);
    seedBystander(queryClient, timerQueryOptions);
    renderGroup(queryClient, groupWithForeignTask);

    await user.click(screen.getByRole("button", { name: deleteLabel }));
    const dialog = await screen.findByRole("dialog", { name: dialogName });
    expect(deletePayload).not.toHaveBeenCalled();

    await user.click(within(dialog).getByRole("button", { name: CONFIRM }));

    await waitFor(() => {
      expect(deletePayload).toHaveBeenCalledExactlyOnceWith({
        task_ids: absorbed.map((task) => task.id),
      });
    });
    expect(queryClient.getQueryData(queryKey)).toEqual([first]);
    await waitFor(() => {
      expect(queryClient.isMutating()).toBe(0);
    });
    expectBystanderUntouched(queryClient, timerQueryOptions);
  });

  it("cancel closes the dialog and deletes nothing", async () => {
    const user = userEvent.setup();
    const deletePayload = spyOnSpanDeletions();
    renderGroup();

    await user.click(screen.getByRole("button", { name: deleteLabel }));
    const dialog = await screen.findByRole("dialog", { name: dialogName });
    await user.click(within(dialog).getByRole("button", { name: CANCEL }));

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: dialogName }),
      ).not.toBeInTheDocument();
    });
    expect(deletePayload).not.toHaveBeenCalled();
  });

  it("tab order across the row is handle, trash, chevron", async () => {
    const user = userEvent.setup();
    renderGroup();

    await user.tab();
    expect(screen.getByRole("button", { name: /drag handle/i })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: deleteLabel })).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: `${routine_name} tasks` }),
    ).toHaveFocus();
  });
});
