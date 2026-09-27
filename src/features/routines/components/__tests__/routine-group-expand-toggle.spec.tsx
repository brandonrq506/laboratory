import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RoutineGroupExpandToggle } from "../routine-group-expand-toggle";

const APPLICATION_ID = 42;
const ROUTINE_NAME = "Workout";

const renderToggle = (expanded: boolean, onToggle = vi.fn()) => {
  render(
    <RoutineGroupExpandToggle
      routineApplicationId={APPLICATION_ID}
      routineName={ROUTINE_NAME}
      expanded={expanded}
      onToggle={onToggle}
    />,
  );
  return { onToggle };
};

describe("RoutineGroupExpandToggle", () => {
  it("collapsed: named after the routine with aria-expanded false", () => {
    renderToggle(false);

    expect(
      screen.getByRole("button", { name: "Workout tasks" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("expanded: same name with aria-expanded true", () => {
    renderToggle(true);

    expect(
      screen.getByRole("button", { name: "Workout tasks" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle with the routine application id when clicked", async () => {
    const user = userEvent.setup();
    const { onToggle } = renderToggle(false);

    await user.click(screen.getByRole("button", { name: "Workout tasks" }));

    expect(onToggle).toHaveBeenCalledExactlyOnceWith(APPLICATION_ID);
  });
});
