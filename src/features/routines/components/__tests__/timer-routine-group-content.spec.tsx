import { HttpResponse, http } from "msw";
import { render, screen, waitFor } from "@/test/test-utils";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import userEvent from "@testing-library/user-event";

import {
  SCHEDULED_LIST_DATE,
  routineApplication,
  routineWrapCard,
  scheduledTasks,
  withApplication,
  withEST,
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
import { ScheduledItemCard } from "@/features/tasks/components";
import { TimerRoutineGroupContent } from "../timer-routine-group-content";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import { formatDatetimeTo12hTime } from "@/utils";

const [first, second, , fourth, fifth, sixth] = scheduledTasks;
const ESTS = [
  new Date("2025-05-08T09:00:00.000Z"),
  new Date("2025-05-08T11:30:00.000Z"),
  new Date("2025-05-08T12:15:00.000Z"),
];
const members = [fourth, fifth, sixth].map((task, index) =>
  withEST(withApplication(task), ESTS[index]),
);
const item = routineWrapCard(members, false);
const { routine_name } = routineApplication;

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
            <TimerRoutineGroupContent
              item={groupItem}
              onToggleExpanded={vi.fn()}
            />
          </ScheduledItemCard>
        </SortableContext>
      </DndContext>
    </QueryWrapper>,
  );
};

describe("TimerRoutineGroupContent", () => {
  it("shows routine name, task count, total duration, and the first absorbed task's EST", () => {
    renderGroup();

    expect(screen.getByText(routine_name)).toBeInTheDocument();
    expect(screen.getByText("3 tasks")).toBeInTheDocument();
    expect(screen.getByText("22m")).toBeInTheDocument();
    expect(
      screen.getByText(formatDatetimeTo12hTime(ESTS[0].toISOString())),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(formatDatetimeTo12hTime(ESTS[1].toISOString())),
    ).not.toBeInTheDocument();
  });

  it("trash intentionally deletes unrelated absorbed tasks along with routine members", async () => {
    const user = userEvent.setup();
    const deletePayload = vi.fn();
    server.use(
      http.post(apiRoutes.taskSpanDeletions, async ({ request }) => {
        deletePayload(await request.json());
        return new HttpResponse(null, { status: 204 });
      }),
    );
    const unrelated = withEST(second, ESTS[0]);
    const absorbed = [members[0], unrelated, ...members.slice(1)];
    const groupWithForeignTask = {
      ...routineWrapCard(absorbed, false),
      member_ids: members.map((task) => task.id),
    };
    const queryClient = createTestQueryClient();
    const { queryKey } = scheduledTasksQueryOptions();
    const futureQueryOptions = futureTasksQueryOptions(SCHEDULED_LIST_DATE);
    queryClient.setQueryData(queryKey, [first, ...absorbed]);
    seedBystander(queryClient, futureQueryOptions);
    renderGroup(queryClient, groupWithForeignTask);

    await user.click(
      screen.getByRole("button", { name: `Delete ${routine_name} routine` }),
    );

    await waitFor(() => {
      expect(deletePayload).toHaveBeenCalledExactlyOnceWith({
        task_ids: absorbed.map((task) => task.id),
      });
    });
    expect(queryClient.getQueryData(queryKey)).toEqual([first]);
    await waitFor(() => {
      expect(queryClient.isMutating()).toBe(0);
    });
    expectBystanderUntouched(queryClient, futureQueryOptions);
  });

  it("tab order across the row is handle, trash, chevron", async () => {
    const user = userEvent.setup();
    renderGroup();

    await user.tab();
    expect(screen.getByRole("button", { name: /drag handle/i })).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: `Delete ${routine_name} routine` }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: `${routine_name} tasks` }),
    ).toHaveFocus();
  });
});
