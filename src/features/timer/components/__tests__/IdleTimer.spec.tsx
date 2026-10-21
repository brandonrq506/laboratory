import { act, render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { IdleTimer } from "../IdleTimer";
import { activities } from "@/test/store/activities";
import { inProgressTasks } from "@/test/store/tasks";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { server } from "@/test/server";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

describe("IdleTimer", () => {
  it("should be focused on the activity input when the component is mounted", async () => {
    const user = userEvent.setup();
    render(<IdleTimer />);

    const input = screen.getByRole("combobox", { name: "Activities" });

    await waitFor(() => {
      expect(input).toHaveFocus();
    });

    await user.type(input, "Test");

    expect(input).toHaveValue("Test");
  });

  it("should display error status when activity is not selected", async () => {
    const user = userEvent.setup();
    render(<IdleTimer />);

    const input = screen.getByRole("combobox", { name: "Activities" });
    const playBtn = screen.getByRole("button", { name: "Start Button" });

    await user.click(playBtn);

    expect(input).toHaveAttribute("aria-invalid");
    expect(input).toHaveClass("ring-invalid-border");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  describe("starting a task", () => {
    const NOW = new Date("2030-01-15T10:30:45.678Z");
    const activity = activities[0];

    const setupCreateStartServer = () => {
      const requests: Record<string, unknown>[] = [];
      const response = createDeferred<void>();

      server.use(
        http.post(apiRoutes.taskCreateAndStart, async ({ request }) => {
          requests.push((await request.json()) as Record<string, unknown>);
          await response.promise;

          return HttpResponse.json(inProgressTasks[0], { status: 201 });
        }),
      );

      return { requests, release: () => response.resolve() };
    };

    const selectActivity = async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(
        screen.getByRole("combobox", { name: "Activities" }),
        activity.display_name,
      );
      await user.click(
        await screen.findByRole("option", { name: activity.display_name }),
      );
    };

    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(NOW);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("creates and starts the selected activity with the current time floored to the second", async () => {
      const user = userEvent.setup();
      const { requests, release } = setupCreateStartServer();
      render(<IdleTimer />);

      await selectActivity(user);
      await user.click(screen.getByRole("button", { name: "Start Button" }));
      release();

      await waitFor(() => expect(requests).toHaveLength(1));
      expect(requests[0]).toEqual({
        activity_id: activity.id,
        status: TASK_STATUS.IN_PROGRESS,
        start_time: "2030-01-15T10:30:45.000Z",
      });
    });

    it("replaces the start button with a disabled loading button while the start is pending", async () => {
      const user = userEvent.setup();
      const { requests, release } = setupCreateStartServer();
      render(<IdleTimer />);

      await selectActivity(user);
      await user.click(screen.getByRole("button", { name: "Start Button" }));

      expect(
        await screen.findByRole("button", { name: /loading/i }),
      ).toBeDisabled();
      expect(
        screen.queryByRole("button", { name: "Start Button" }),
      ).not.toBeInTheDocument();

      release();
      await waitFor(() => expect(requests).toHaveLength(1));
    });

    it("disables starting when the user goes offline", async () => {
      const user = userEvent.setup();
      const { requests, release } = setupCreateStartServer();
      release();
      render(<IdleTimer />);

      await selectActivity(user);
      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      const offlineButton = screen.getByRole("button", {
        name: "No Network button",
      });
      expect(offlineButton).toBeDisabled();
      expect(
        screen.queryByRole("button", { name: "Start Button" }),
      ).not.toBeInTheDocument();

      await user.click(offlineButton);
      expect(requests).toHaveLength(0);
    });
  });
});
