import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router";
import { RunningTimer } from "../RunningTimer";
import { inProgressTasks } from "@/test/store/tasks";

const prefetch = vi.fn();
vi.mock("@/features/tasks/api/tanstack/usePrefetchTask", () => ({
  usePrefetchTask: () => prefetch,
}));

const task = inProgressTasks[0];

describe("RunningTimer", () => {
  it("renders activity name", () => {
    render(
      <MemoryRouter>
        <RunningTimer task={task} />
      </MemoryRouter>,
    );

    expect(screen.getByText(task.activity.name)).toBeInTheDocument();
  });

  it("prefetches on hover and focus", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <RunningTimer task={task} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /React/i });

    await user.hover(link);

    link.focus();

    expect(prefetch).toHaveBeenCalledWith(task.id);
  });
});
