import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import {
  SCHEDULED_LIST_DATE,
  routineApplication,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";
import { FutureScheduledTaskList } from "../future-scheduled-task-list";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import { formatDatetimeTo12hTime } from "@/utils";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  getRouteApi: () => ({ useSearch: () => ({ date: SCHEDULED_LIST_DATE }) }),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

/** Serves `tasks` only for the route's date, so a list bound to another date renders empty. */
const setupServer = (tasks: ScheduledTaskAPI[]) => {
  server.use(
    http.get(apiRoutes.tasks, ({ request }) => {
      const date = new URL(request.url).searchParams.get(
        "filter[scheduled_at][is_equal_to]",
      );
      return HttpResponse.json(date === SCHEDULED_LIST_DATE ? tasks : []);
    }),
  );
};

describe("FutureScheduledTaskList", () => {
  it("shows a spinner while the date's tasks load", async () => {
    setupServer([]);

    render(<FutureScheduledTaskList />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("No Tasks")).toBeInTheDocument();
  });

  it("displays error state when API call fails", async () => {
    server.use(
      http.get(apiRoutes.tasks, () =>
        HttpResponse.json({ message: "Failed" }, { status: 500 }),
      ),
    );

    render(<FutureScheduledTaskList />);

    expect(
      await screen.findByText("There was an error loading your tasks"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("intentionally keeps a routine at the start of a future date flat", async () => {
    const members = scheduledTasks.slice(0, 3).map(withApplication);
    setupServer(members);

    render(<FutureScheduledTaskList />);

    expect(
      await screen.findByText(members[0].activity.display_name),
    ).toBeInTheDocument();
    members.forEach((task) => {
      expect(screen.getByText(task.activity.display_name)).toBeInTheDocument();
    });
    expect(
      screen.queryByText(routineApplication.routine_name),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: `${routineApplication.routine_name} tasks`,
      }),
    ).not.toBeInTheDocument();
  });

  it("displays empty state when the date has no tasks", async () => {
    setupServer([]);

    render(<FutureScheduledTaskList />);

    expect(await screen.findByText("No Tasks")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("FutureScheduledTaskList with a routine group", () => {
  const [first, second, third, fourth, fifth] = scheduledTasks;
  const members = [fourth, fifth].map(withApplication);
  const { routine_name } = routineApplication;

  beforeEach(() => {
    setupServer([first, second, third, ...members]);
  });

  it("renders a wrap card with the routine name and no time of day", async () => {
    render(<FutureScheduledTaskList />);

    expect(await screen.findByText(routine_name)).toBeInTheDocument();
    expect(screen.getByText(`${members.length} tasks`)).toBeInTheDocument();
    expect(
      screen.queryByText(formatDatetimeTo12hTime(fourth.scheduled_at)),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(fourth.activity.display_name),
    ).not.toBeInTheDocument();
  });

  it("expanding the wrap shows its children", async () => {
    const user = userEvent.setup();
    render(<FutureScheduledTaskList />);

    await user.click(
      await screen.findByRole("button", { name: `${routine_name} tasks` }),
    );

    expect(screen.getByText(fourth.activity.display_name)).toBeInTheDocument();
    expect(screen.getByText(fifth.activity.display_name)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `${routine_name} tasks` }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
