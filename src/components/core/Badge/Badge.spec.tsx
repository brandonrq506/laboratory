import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

import { COLOR_NAME } from "@/features/colors/types/colors";

describe("Badge", () => {
  it("should render with the correct color", () => {
    const color = COLOR_NAME.ROSE;
    render(<Badge color={color}>Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge).toHaveClass("bg-rose-300 text-rose-950 border-rose-600");
  });

  it("should render with children", () => {
    render(<Badge color={COLOR_NAME.BLUE}>Child Badge</Badge>);

    const badge = screen.getByText("Child Badge");
    expect(badge).toBeInTheDocument();
  });
});
