import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteRoutineGroupButton } from "../delete-routine-group-button";

describe("DeleteRoutineGroupButton", () => {
  it("calls onClick once when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <DeleteRoutineGroupButton routineName="Workout" onClick={onClick} />,
    );

    await user.click(
      screen.getByRole("button", { name: /delete workout routine/i }),
    );

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("labels the button with the routine name", () => {
    render(
      <DeleteRoutineGroupButton routineName="Morning Prep" onClick={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Delete Morning Prep routine" }),
    ).toBeInTheDocument();
  });
});
