import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("should render with the correct color", () => {
    const color = "rose";
    render(<Badge color={color}>Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge.getAttribute("class")).toContain(
      "bg-rose-300 text-rose-950 border-rose-600",
    );
  });

  it("should render with children", () => {
    render(<Badge color="blue">Child Badge</Badge>);

    const badge = screen.getByText("Child Badge");
    expect(badge).toBeInTheDocument();
  });
});
