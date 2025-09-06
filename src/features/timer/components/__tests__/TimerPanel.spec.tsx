import { render, screen } from "@/test/test-utils";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { TimerPanel } from "../TimerPanel";

import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";
import { inProgressTaskOptions } from "@/features/tasks/api/queryOptions";
import { inProgressTasks } from "@/test/store/tasks";

const task = inProgressTasks[0];

const renderWithData = (data: InProgressTaskAPI[]) => {
  const qc = new QueryClient();
  qc.setQueryData(inProgressTaskOptions().queryKey, data);
  return render(
    <MemoryRouter>
      <QueryClientProvider client={qc}>
        <TimerPanel />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("TimerPanel", () => {
  it("renders IdleTimer when no in-progress tasks", () => {
    renderWithData([]);

    const btnText = { name: /start button/i };
    const activityLabel = { name: /activities/i };

    expect(screen.getByRole("combobox", activityLabel)).toBeInTheDocument();
    expect(screen.getByRole("button", btnText)).toBeInTheDocument();
  });

  it("renders RunningTimer when there's an in-progress task", () => {
    renderWithData([task]);

    const btnText = { name: /stop button/i };

    expect(screen.getByText(task.activity.name)).toBeInTheDocument();
    expect(screen.getByRole("button", btnText)).toBeInTheDocument();
  });
});
