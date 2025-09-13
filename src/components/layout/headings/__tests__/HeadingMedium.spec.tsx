import { render, screen } from "@/test/test-utils";
import { HeadingMedium } from "../HeadingMedium";

describe("HeadingMedium", () => {
  it("renders title with description when provided", () => {
    render(<HeadingMedium title="Test Title" description="Test description" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeadingMedium title="Test Title" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });
});
