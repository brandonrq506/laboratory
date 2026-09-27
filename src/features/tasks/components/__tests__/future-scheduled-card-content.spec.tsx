import { render, screen } from "@/test/test-utils";

import {
  SCHEDULED_LIST_DATE,
  routineApplication,
  routineWrapCard,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";
import { FutureScheduledCardContent } from "../future-scheduled-card-content";

import { formatDatetimeTo12hTime } from "@/utils";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { ScheduledRenderItem } from "../../types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "../../types/scheduledTask";

import { CARD_TYPE } from "../../types/card-types";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  getRouteApi: () => ({ useSearch: () => ({ date: SCHEDULED_LIST_DATE }) }),
  Link: ({ to, ...props }: React.ComponentProps<"a"> & { to: string }) => (
    <a href={to} {...props} />
  ),
}));

const [task, second, third] = scheduledTasks;
const members = [second, third].map(withApplication);
const wrap = routineWrapCard(members, false);
const toggleLabel = `${routineApplication.routine_name} tasks`;

const renderContent = (item: ScheduledRenderItem<ScheduledTaskAPI>) =>
  render(<FutureScheduledCardContent item={item} onToggleExpanded={vi.fn()} />);

describe("FutureScheduledCardContent", () => {
  it("renders a wrap as routine group content, without Start or time of day", () => {
    renderContent(wrap);

    expect(
      screen.getByRole("button", { name: toggleLabel }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Start task" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(formatDatetimeTo12hTime(second.scheduled_at)),
    ).not.toBeInTheDocument();
  });

  it.each([
    { kind: CARD_TYPE.TASK, id: task.id, task },
    { kind: CARD_TYPE.EXPANDED_CHILD, id: task.id, task },
  ] satisfies ScheduledRenderItem<ScheduledTaskAPI>[])(
    "renders a $kind item as future task content",
    (item) => {
      renderContent(item);

      expect(
        screen.getByRole("link", {
          name: (name) => name.startsWith(task.activity.display_name),
        }),
      ).toHaveAttribute("href", "/scheduled/$taskId");
      expect(
        screen.queryByRole("button", { name: toggleLabel }),
      ).not.toBeInTheDocument();
    },
  );
});
