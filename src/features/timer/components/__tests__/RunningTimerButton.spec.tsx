import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RunningTimerButton } from "../RunningTimerButton";
import { inProgressTasks } from "@/test/store/tasks";

const useOnlineStatusMock = vi.fn();
const mutateSpy = vi.fn();
const useCompleteTaskMock = vi.fn();

vi.mock("@/hooks", () => ({
  useOnlineStatus: () => useOnlineStatusMock(),
}));

vi.mock("@/features/tasks/api/tanstack/useCompleteTask", () => ({
  useCompleteTask: () => useCompleteTaskMock(),
}));

const task = inProgressTasks[0];

describe("RunningTimerButton", () => {
  beforeEach(() => {
    mutateSpy.mockReset();
    useOnlineStatusMock.mockReset();
    useCompleteTaskMock.mockReset();

    // Default happy path values
    useOnlineStatusMock.mockReturnValue(true);
    useCompleteTaskMock.mockReturnValue({ mutate: mutateSpy, isError: false });
  });

  it("calls mutate with completed payload on click", async () => {
    const user = userEvent.setup();
    const btnText = "Stop button";

    render(<RunningTimerButton task={task} />);

    const btn = screen.getByRole("button", { name: btnText });
    await user.click(btn);

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    const payload = mutateSpy.mock.calls[0][0];
    expect(payload.status).toBe("completed");
    expect(payload.start_time).toBeDefined();
    expect(payload.end_time).toBeDefined();
  });

  it("renders retry state when isError", () => {
    useCompleteTaskMock.mockReturnValue({ mutate: mutateSpy, isError: true });
    const btnText = "Retry button";

    render(<RunningTimerButton task={task} />);

    expect(screen.getByRole("button", { name: btnText })).toBeInTheDocument();
  });

  it("shows offline icon when offline", () => {
    useOnlineStatusMock.mockReturnValue(false);
    const btnText = "No Network button";

    render(<RunningTimerButton task={task} />);

    expect(screen.getByRole("button", { name: btnText })).toBeInTheDocument();
  });
});
