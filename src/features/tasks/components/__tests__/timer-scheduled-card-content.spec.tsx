import { render, screen } from "@/test/test-utils";

import { HttpResponse, http } from "msw";
import {
  routineApplication,
  routineWrapCard,
  scheduledTasks,
  withApplication,
  withEST,
} from "@/test/store/tasks";
import { ScheduledItemCardOverlay } from "../scheduled-item-card-overlay";
import { TimerScheduledCardContent } from "../timer-scheduled-card-content";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { ScheduledRenderItem } from "../../types/scheduled-grouped-card";
import type { ScheduledTaskWithEST } from "../../types/scheduledTaskWithEST";

import { CARD_TYPE } from "../../types/card-types";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

const EST = new Date("2025-05-08T09:00:00.000Z");
const [first, second, third] = scheduledTasks;
const task = withEST(first, EST);
const members = [second, third].map((member) =>
  withEST(withApplication(member), EST),
);
const wrap = routineWrapCard(members, false);
const toggleLabel = `${routineApplication.routine_name} tasks`;

const renderContent = (item: ScheduledRenderItem<ScheduledTaskWithEST>) =>
  render(<TimerScheduledCardContent item={item} onToggleExpanded={vi.fn()} />);

describe("TimerScheduledCardContent", () => {
  beforeEach(() => {
    // No in-progress task: the task action stays "Start task".
    server.use(http.get(apiRoutes.tasks, () => HttpResponse.json([])));
  });

  it("renders a wrap as routine group content", () => {
    renderContent(wrap);

    expect(
      screen.getByRole("button", { name: toggleLabel }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Start task" }),
    ).not.toBeInTheDocument();
  });

  it.each([
    { kind: CARD_TYPE.TASK, id: task.id, task },
    { kind: CARD_TYPE.EXPANDED_CHILD, id: task.id, task },
  ] satisfies ScheduledRenderItem<ScheduledTaskWithEST>[])(
    "renders a $kind item as timer task content",
    (item) => {
      renderContent(item);

      expect(
        screen.getByRole("button", { name: "Start task" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: toggleLabel }),
      ).not.toBeInTheDocument();
    },
  );

  it("renders the same content as an inert snapshot inside the drag overlay", () => {
    render(
      <ScheduledItemCardOverlay item={wrap}>
        <TimerScheduledCardContent item={wrap} onToggleExpanded={vi.fn()} />
      </ScheduledItemCardOverlay>,
    );

    expect(
      screen.getByText(routineApplication.routine_name, {
        selector: "[inert] *",
      }),
    ).toBeInTheDocument();
  });
});
