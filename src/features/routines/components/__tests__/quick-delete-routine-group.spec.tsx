import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { QuickDeleteRoutineGroup } from "../quick-delete-routine-group";

const { mutate } = vi.hoisted(() => ({ mutate: vi.fn() }));

vi.mock("@/features/tasks/api/tanstack/use-delete-tasks", () => ({
  useDeleteTasks: () => ({ mutate }),
}));

describe("QuickDeleteRoutineGroup", () => {
  beforeEach(() => mutate.mockClear());

  it("deletes the supplied task ids when clicked", async () => {
    const user = userEvent.setup();
    render(
      <QuickDeleteRoutineGroup
        taskIds={[101, 102, 103]}
        routineName="Workout"
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /delete workout routine/i }),
    );

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith({ task_ids: [101, 102, 103] });
  });

  it("labels the button with the routine name", () => {
    render(
      <QuickDeleteRoutineGroup taskIds={[1]} routineName="Morning Prep" />,
    );

    expect(
      screen.getByRole("button", { name: "Delete Morning Prep routine" }),
    ).toBeInTheDocument();
  });
});
