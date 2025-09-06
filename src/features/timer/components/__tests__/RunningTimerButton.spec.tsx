import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RunningTimerButton } from "../RunningTimerButton";
import { inProgressTasks } from "@/test/store/tasks";

// Mutable flags to control mocked hook behavior per test (avoids dynamic re-imports)
let onlineMock = true;
let isErrorMock = false;
const mutateSpy = vi.fn();

vi.mock("@/hooks", () => ({
  useOnlineStatus: () => onlineMock,
}));

vi.mock("@/features/tasks/api/tanstack/useCompleteTask", () => ({
  useCompleteTask: () => ({ mutate: mutateSpy, isError: isErrorMock }),
}));

const task = inProgressTasks[0];

describe("RunningTimerButton", () => {
  beforeEach(() => {
    mutateSpy.mockReset();
    onlineMock = true;
    isErrorMock = false;
  });

  it("calls mutate with completed payload on click", async () => {
    const user = userEvent.setup();

    render(<RunningTimerButton task={task} />);

    const btn = screen.getByRole("button", { name: /stop button/i });
    await user.click(btn);

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    const payload = mutateSpy.mock.calls[0][0];
    expect(payload.status).toBe("completed");
    expect(payload.start_time).toBeDefined();
    expect(payload.end_time).toBeDefined();
  });

  it("renders retry state when isError", () => {
    isErrorMock = true;
    render(<RunningTimerButton task={task} />);
    expect(
      screen.getByRole("button", { name: /retry button/i }),
    ).toBeInTheDocument();
  });

  it("shows offline icon when offline", () => {
    onlineMock = false;
    render(<RunningTimerButton task={task} />);
    expect(
      screen.getByRole("button", { name: /no network button/i }),
    ).toBeInTheDocument();
  });
});
