import { render, screen } from "@testing-library/react";
import { RoutineCard } from "../RoutineCard";

import { routines } from "@/test/store/routines";

describe("RoutineCard", () => {
  const morningRoutine = routines[0];
  const emptyRoutine = routines[2];
  const showerRoutine = routines[3];

  it("renders the routine name and total time", () => {
    render(<RoutineCard routine={morningRoutine} />);

    expect(screen.getByText(morningRoutine.name)).toBeInTheDocument();
    expect(screen.getByText("24m")).toBeInTheDocument();
  });

  it("renders card properly when there are no activities", () => {
    render(<RoutineCard routine={emptyRoutine} />);

    expect(screen.getByText("No activities")).toBeInTheDocument();
    expect(screen.getByText("0s")).toBeInTheDocument();
  });

  it("blurs the bottom of the card when there are more than 5 activities", () => {
    render(<RoutineCard routine={morningRoutine} />);

    const blurredSection = screen.getByText("Blurred section");
    expect(blurredSection).toBeInTheDocument();
  });

  it("does not blur the bottom of the card when there are 5 or fewer activities", () => {
    render(<RoutineCard routine={showerRoutine} />);

    const blurredSection = screen.queryByText("Blurred section");
    expect(blurredSection).not.toBeInTheDocument();
  });
});
